import * as THREE from 'three';
import React, { useContext, useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { invalidate, ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

import useLifecycleLogging from '../../../logger/react-logger/hooks/useLifecycleLogging';
import { Vector3, KnownComponentType } from '../../../interfaces';
import {
  IModelRefComponentInternal,
  ISceneNodeInternal,
  useEditorState,
  useStore,
  useViewOptionState,
} from '../../../store';
import { appendFunction } from '../../../utils/objectUtils';
import { sceneComposerIdContext } from '../../../common/sceneComposerIdContext';
import {
  acceleratedRaycasting,
  cloneMaterials,
  enableShadow,
  getComponentGroupName,
} from '../../../utils/objectThreeUtils';
import { getScaleFactor } from '../../../utils/mathUtils';
import { getIntersectionTransform } from '../../../utils/raycastUtils';
import {
  createNodeWithPositionAndNormal,
  findComponentByType,
  findNearestViableParentAncestorNodeRef,
} from '../../../utils/nodeUtils';

import { useGLTF } from './GLTFLoader';

function processObject(component: IModelRefComponentInternal, obj: THREE.Object3D, options: { maxAnisotropy: number }) {
  // cloneMaterials(obj);
  // acceleratedRaycasting(obj);
  // enableShadow(component, obj, options.maxAnisotropy);

  obj.userData.isOriginal = true; // This is important to the SubModelSelection tool, it's used to filter out geomtry we've added with our
}

interface GLTFModelProps {
  node: ISceneNodeInternal;
  component: IModelRefComponentInternal;
  hiddenWhileImmersive: boolean;
}

export const GLTFModelComponent: React.FC<GLTFModelProps> = ({
  node,
  component,
  hiddenWhileImmersive,
}: GLTFModelProps) => {
  const sceneComposerId = useContext(sceneComposerIdContext);
  const log = useLifecycleLogging('GLTFModelComponent');
  const { gl } = useThree();
  const maxAnisotropy = useMemo(() => gl.capabilities.getMaxAnisotropy(), []);
  const uriModifier = useStore(sceneComposerId)((state) => state.getEditorConfig().uriModifier);
  const appendSceneNode = useStore(sceneComposerId)((state) => state.appendSceneNode);
  const getObject3DBySceneNodeRef = useStore(sceneComposerId)((state) => state.getObject3DBySceneNodeRef);
  const getSceneNodeByRef = useStore(sceneComposerId)((state) => state.getSceneNodeByRef);
  const { elementDecorations } = useViewOptionState(sceneComposerId);

  const { setSelectedObject3D, selectedObject3D, setCameraTarget, mainCameraObject } = useEditorState(sceneComposerId);

  // for a modified version of the useMaterialEffectHook that does lots of objects
  // no children
  const originalMaterialMap = useRef<Record<string, THREE.Material>>({});

  const cloneOriginalMaterial = useCallback((obj: THREE.Object3D) => {
    if (obj instanceof THREE.Mesh) {
      if (!originalMaterialMap.current[obj.uuid]) {
        // save a copy of the original material
        originalMaterialMap.current[obj.uuid] = obj.material.clone();
      }

      // clone the original material. Note that because mesh can share materials, we must clone before update it.
      obj.material = originalMaterialMap.current[obj.uuid].clone();
    }
  }, []);

  const gltf = useGLTF(
    component.uri,
    uriModifier,
    (loader) => {
      loader.manager.onStart = appendFunction(loader.manager.onStart, () => {
        // Use setTimeout to avoid mutating the state during rendering process
        setTimeout(() => {
          useStore(sceneComposerId).getState().setLoadingModelState(true);
        }, 0);
      });
      loader.manager.onLoad = appendFunction(loader.manager.onLoad, () => {
        // Use setTimeout to avoid mutating the state during rendering process
        setTimeout(() => {
          useStore(sceneComposerId).getState().setLoadingModelState(false);
        }, 0);
      });
      loader.manager.onError = appendFunction(loader.manager.onError, () => {
        // Use setTimeout to avoid mutating the state during rendering process
        setTimeout(() => {
          useStore(sceneComposerId).getState().setLoadingModelState(false);
        }, 0);
      });
    },
    (progressEvent) => {
      let contentLength = NaN;
      if (progressEvent.lengthComputable) {
        contentLength = progressEvent.total;
      }
      // @ts-ignore - __onDownloadProgress is injected in the LoadingProgress component
      const onDownloadingProgress = THREE.DefaultLoadingManager.__onDownloadProgress;

      if (onDownloadingProgress) {
        const target = progressEvent.target as XMLHttpRequest;
        // target should never be falsy
        if (target) {
          onDownloadingProgress(target.responseURL, progressEvent.loaded, contentLength);
        } else {
          log?.error('Unexpected error. target is not a valid XMLHttpRequest');
        }
      }
    },
  ) as GLTF;

  const clonedModelScene = useMemo(() => {
    const result = SkeletonUtils.clone(gltf.scene);
    result.traverse((obj) => {
      processObject(component, obj, { maxAnisotropy });
    });

    invalidate();
    return result;
  }, [gltf, component]);

  useEffect(() => {
    // traverse objects and decorate elements
    clonedModelScene.traverse((obj) => {
      // update mesh
      if (obj instanceof THREE.Mesh) {
        if (elementDecorations && elementDecorations[obj.userData.elementId]) {
          // clone original material before decoration
          cloneOriginalMaterial(obj);

          const style = elementDecorations[obj.userData.elementId];
          if (style.transparent) {
            if (!obj.material.transparent) {
              obj.material.transparent = true;
              // need recompile shader
              obj.material.needsUpdate = true;
            }
            // material may already be transparent, multiply the opacity
            obj.material.opacity = obj.material.opacity * (style.opacity ?? 1.0);
          }

          if (style.color) {
            obj.material.color = new THREE.Color(style.color);
          }

          obj.userData.decorated = true;
        } else {
          // restore original material if the object was decorated before
          if (obj.userData.decorated) {
            cloneOriginalMaterial(obj);
            obj.userData.decorated = false;
          }
        }
      }
    });
  }, [elementDecorations, clonedModelScene]);

  let scale: Vector3 = [1, 1, 1];
  if (component.localScale) {
    scale = component.localScale;
  } else if (component.unitOfMeasure) {
    const factor = getScaleFactor(component.unitOfMeasure, 'meters');
    scale = [factor, factor, factor];
  }

  const onPointerDown = (e: ThreeEvent<MouseEvent>) => {
    if (e.button !== 0) {
      return;
    }

    if (e.intersections[0].object === selectedObject3D) {
      e.stopPropagation();
      // focus on the object
      const position = new THREE.Vector3();
      mainCameraObject?.getWorldPosition(position);
      const target = new THREE.Vector3();
      selectedObject3D.getWorldPosition(target);

      setCameraTarget(
        { position: [position.x, position.y, position.z], target: [target.x, target.y, target.z] },
        'transition',
      );

      return;
    }

    if (e.intersections[0]) {
      const obj = e.intersections[0].object;
      setSelectedObject3D(obj);

      e.stopPropagation();
    }
  };

  return (
    <group name={getComponentGroupName(node.ref, 'GLTF_MODEL')} scale={scale} dispose={null}>
      <primitive object={clonedModelScene} onPointerDown={onPointerDown} />
    </group>
  );
};

export const ErrorModelComponent: React.FC = () => {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'red'} />
    </mesh>
  );
};
