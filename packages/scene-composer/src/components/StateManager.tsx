import * as THREE from 'three';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import ab2str from 'arraybuffer-to-string';
import { combineProviders, DataStream, ProviderWithViewport, TimeSeriesData } from '@iot-app-kit/core';

import useLifecycleLogging from '../logger/react-logger/hooks/useLifecycleLogging';
import {
  AdditionalComponentData,
  KnownComponentType,
  KnownSceneProperty,
  SceneComposerInternalProps,
} from '../interfaces';
import {
  setDracoDecoder,
  setFeatureConfig,
  setGetSceneObjectFunction,
  setLocale,
  setMetricRecorder,
} from '../common/GlobalSettings';
import { useSceneComposerId } from '../common/sceneComposerIdContext';
import {
  IAnchorComponentInternal,
  ICameraComponentInternal,
  IModelRefComponentInternal,
  ISubModelRefComponentInternal,
  SceneComposerOperationTypeMap,
  useStore,
} from '../store';
import { createStandardUriModifier } from '../utils/uriModifiers';
import sceneDocumentSnapshotCreator from '../utils/sceneDocumentSnapshotCreator';
import { SceneLayout } from '../layouts/SceneLayout';
import { findComponentByType } from '../utils/nodeUtils';
import { applyDataBindingTemplate } from '../utils/dataBindingTemplateUtils';
import { combineTimeSeriesData, convertDataStreamsToDataInput } from '../utils/dataStreamUtils';
import useActiveCamera from '../hooks/useActiveCamera';
import { getCameraSettings } from '../utils/cameraUtils';

import IntlProvider from './IntlProvider';
import { LoadingProgress } from './three-fiber/LoadingProgress';

const StateManager: React.FC<SceneComposerInternalProps> = ({
  sceneLoader,
  config,
  onSceneUpdated,
  onSceneLoaded,
  valueDataBindingProvider,
  showAssetBrowserCallback,
  onWidgetClick,
  onSelectionChanged,
  onGeoObjectClick,
  knowledgeGraphInterface,
  dataStreams,
  queries,
  viewport,
  dataBindingTemplate,
  activeCamera,
  selectedDataBinding,
}: SceneComposerInternalProps) => {
  useLifecycleLogging('StateManager');
  const sceneComposerId = useSceneComposerId();

  const {
    setEditorConfig,
    setDataInput,
    setDataBindingTemplate,
    setKnowledgeGraphInterface,
    loadScene,
    sceneLoaded,
    selectedSceneNodeRef,
    setSelectedSceneNodeRef,
    getSceneNodeByRef,
    getObject3DBySceneNodeRef,
    selectedObject3D,
    setSelectedEntity,
  } = useStore(sceneComposerId)((state) => state);
  const [sceneContentUri, setSceneContentUri] = useState<string>('');
  const [sceneContent, setSceneContent] = useState<string>('');
  const [loadSceneError, setLoadSceneError] = useState<Error | undefined>();
  const [queriedStreams, setQueriedStreams] = useState<DataStream[] | undefined>();
  const baseUrl = useStore(sceneComposerId)((state) => state.getSceneProperty(KnownSceneProperty.BaseUrl));
  const messages = useStore(sceneComposerId)((state) => state.getMessages());

  const dataProviderRef = useRef<ProviderWithViewport<TimeSeriesData[]> | undefined>(undefined);
  const prevSelection = useRef<string | undefined>(undefined);

  const { setActiveCameraSettings, setActiveCameraName } = useActiveCamera();

  const standardUriModifier = useMemo(
    () => createStandardUriModifier(sceneContentUri || '', baseUrl),
    [sceneContentUri, baseUrl],
  );

  // Set SceneComposerInternal configuration
  // Use layout effect to immediately re-render the SceneComposerInternal when editor config change.
  useLayoutEffect(() => {
    THREE.Cache.enabled = true;

    setEditorConfig({
      operationMode: config.mode,
      uriModifier: standardUriModifier,
      valueDataBindingProvider,
      showAssetBrowserCallback,
      onWidgetClick,
      onSelectionChanged,
      onGeoObjectClick,
    });
  }, [
    config.mode,
    standardUriModifier,
    valueDataBindingProvider,
    showAssetBrowserCallback,
    onWidgetClick,
    onSelectionChanged,
    onGeoObjectClick,
  ]);

  useEffect(() => {
    if (!selectedDataBinding) {
      setActiveCameraName(activeCamera);
    }
  }, [activeCamera, selectedDataBinding]);

  useEffect(() => {
    // This hook will somehow be triggered twice initially with selectedSceneNodeRef = undefined.
    // Compare prevSelection with selectedSceneNodeRef to make sure the event is sent only when value
    // is changed.
    if (prevSelection.current === selectedSceneNodeRef) return;

    prevSelection.current = selectedSceneNodeRef;

    if (onSelectionChanged) {
      const node = getSceneNodeByRef(selectedSceneNodeRef);
      const componentTypes = node?.components.map((component) => component.type) ?? [];

      const tagComponent = findComponentByType(node, KnownComponentType.Tag) as IAnchorComponentInternal;
      const modelRefComponent = findComponentByType(node, KnownComponentType.ModelRef) as IModelRefComponentInternal;
      const subModelRefComponent = findComponentByType(
        node,
        KnownComponentType.SubModelRef,
      ) as ISubModelRefComponentInternal;

      let additionalComponentData: AdditionalComponentData[] | undefined;
      if (tagComponent) {
        additionalComponentData = [
          {
            navLink: tagComponent.navLink,
            dataBindingContext: !tagComponent.valueDataBinding?.dataBindingContext
              ? undefined
              : applyDataBindingTemplate(tagComponent.valueDataBinding, dataBindingTemplate),
          },
        ];
      }

      onSelectionChanged({
        componentTypes,
        nodeRef: selectedSceneNodeRef,
        additionalComponentData,
      });
    }
  }, [selectedSceneNodeRef]);

  useEffect(() => {
    if (selectedObject3D?.userData.elementId) {
      const elementId = selectedObject3D?.userData.elementId;
      const doAsync = async () => {
        const entities = await knowledgeGraphInterface.findEntitiesByElementId(elementId);
        let entity: any;
        if (entities.length > 0) {
          console.log('selected entity: ', entities[0]);
          entity = entities[0];
          setSelectedEntity(entity);
        }
        onGeoObjectClick({ entityId: entity.entityId, elementId: elementId });
      };
      doAsync();
    }
  }, [selectedObject3D]);

  useEffect(() => {
    const node = getSceneNodeByRef(selectedSceneNodeRef);
    const cameraComponent = findComponentByType(node, KnownComponentType.Camera) as ICameraComponentInternal;
    if (cameraComponent) {
      const object3D = getObject3DBySceneNodeRef(selectedSceneNodeRef);

      setActiveCameraSettings(getCameraSettings(object3D, cameraComponent));
    }
  }, [selectedSceneNodeRef]);

  useEffect(() => {
    if (config.dracoDecoder) {
      setDracoDecoder(config.dracoDecoder);
    }
  }, [config.dracoDecoder]);

  useEffect(() => {
    if (config.featureConfig) {
      setFeatureConfig(config.featureConfig);
    }
  }, [config]);

  useEffect(() => {
    if (config.metricRecorder) {
      setMetricRecorder(config.metricRecorder);
    }
  }, [config.metricRecorder]);

  useEffect(() => {
    if (config.locale) {
      setLocale(config.locale);
    }
  }, [config.locale]);

  useEffect(() => {
    setGetSceneObjectFunction(sceneLoader.getSceneObject);
  }, [sceneLoader]);

  // get scene uri
  useEffect(() => {
    sceneLoader
      .getSceneUri()
      .then((uri) => {
        if (uri) {
          setSceneContentUri(uri);
        } else {
          throw new Error('Got empty scene url');
        }
      })
      .catch((error) => {
        setLoadSceneError(error || new Error('Failed to get scene uri'));
      });
  }, [sceneLoader]);

  useEffect(() => {
    if (sceneContentUri && sceneContentUri.length > 0) {
      const promise = sceneLoader.getSceneObject(sceneContentUri);
      if (!promise) {
        setLoadSceneError(new Error('Failed to fetch scene content'));
      } else {
        promise
          .then((arrayBuffer) => {
            return ab2str(arrayBuffer);
          })
          .then((sceneContent) => {
            setSceneContent(sceneContent);
          })
          .catch((error) => {
            setLoadSceneError(error || new Error('Failed to fetch scene content'));
          });
      }
    }
  }, [sceneContentUri]);

  // load scene content
  useLayoutEffect(() => {
    if (sceneContent?.length > 0) {
      loadScene(sceneContent, { disableMotionIndicator: false });
    }
  }, [sceneContent]);

  useEffect(() => {
    if (onSceneLoaded && sceneLoaded) {
      // Delay the event handler to let other components finish loading, otherwise the consumer side will
      // fail to update scene states
      setTimeout(() => {
        onSceneLoaded();
      }, 1);
    }
  }, [sceneLoaded, onSceneLoaded]);

  // Subscribe to store update
  useEffect(() => {
    if (onSceneUpdated) {
      return useStore(sceneComposerId).subscribe((state) => {
        if (state.lastOperation) {
          if (SceneComposerOperationTypeMap[state.lastOperation] === 'UPDATE_DOCUMENT') {
            onSceneUpdated(sceneDocumentSnapshotCreator.create(state));
          }
        }
      });
    }
  }, [onSceneUpdated]);

  // Update data input
  useEffect(() => {
    if ((queriedStreams || dataStreams) && viewport) {
      setDataInput(convertDataStreamsToDataInput([...(queriedStreams || []), ...(dataStreams || [])], viewport));
    }
  }, [queriedStreams, dataStreams]);

  useEffect(() => {
    if (dataProviderRef.current) {
      dataProviderRef.current.unsubscribe();
    }
    if (queries && viewport) {
      dataProviderRef.current = combineProviders(
        queries.map((query) =>
          query.build(sceneComposerId, {
            viewport: viewport,
            settings: {
              // only support default settings for now until when customization is needed
              fetchFromStartToEnd: true,
            },
          }),
        ),
      );
      dataProviderRef.current.subscribe({
        next: (results: TimeSeriesData[]) => {
          const streams = combineTimeSeriesData(results);
          setQueriedStreams(streams.dataStreams);
        },
      });
    }
  }, [queries, viewport]);

  useEffect(() => {
    if (dataBindingTemplate) {
      setDataBindingTemplate(dataBindingTemplate);
    }
  }, [dataBindingTemplate]);

  useEffect(() => {
    if (knowledgeGraphInterface) {
      setKnowledgeGraphInterface(knowledgeGraphInterface);
    }
  }, [knowledgeGraphInterface]);

  // Throw error to be captured by ErrorBoundary and render error view
  useEffect(() => {
    if (loadSceneError) {
      throw loadSceneError;
    }
  }, [loadSceneError]);

  const pointerMissedCallback = useCallback(
    (e: ThreeEvent<PointerEvent>) => {
      // deselect selected node on click
      if (e.type === 'click') {
        setSelectedSceneNodeRef(undefined);
      }
    },
    [setSelectedSceneNodeRef],
  );

  const isViewing = config.mode === 'Viewing';
  const showMessageModal = messages.length > 0;

  return (
    <SceneLayout
      isViewing={isViewing}
      showMessageModal={showMessageModal}
      LoadingView={
        <IntlProvider locale={config.locale}>
          <LoadingProgress />
        </IntlProvider>
      }
      onPointerMissed={pointerMissedCallback}
    />
  );
};

export default StateManager;
