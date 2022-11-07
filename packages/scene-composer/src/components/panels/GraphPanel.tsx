import { debounce } from 'lodash';
import * as THREE from 'three';
import React, { useCallback, useContext, useState, useMemo, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Button, ButtonProps, Checkbox, FormField, Input, SpaceBetween, TextContent } from '@awsui/components-react';

import useLifecycleLogging from '../../logger/react-logger/hooks/useLifecycleLogging';
import { COMPOSER_FEATURES, KnownComponentType, TwinMakerEntity } from '../../interfaces';
import { RecursivePartial } from '../../utils/typeUtils';
import { ISceneNodeInternal, useEditorState, useSceneDocument, useStore } from '../../store';
import { sceneComposerIdContext } from '../../common/sceneComposerIdContext';
import { useSnapObjectToFloor } from '../../three/transformUtils';
import { toNumber } from '../../utils/stringUtils';
import { isLinearPlaneMotionIndicator } from '../../utils/sceneComponentUtils';
import LogProvider from '../../logger/react-logger/log-provider';
import { findComponentByType, isEnvironmentNode } from '../../utils/nodeUtils';
import { getGlobalSettings } from '../../common/GlobalSettings';

import { ComponentEditor } from './ComponentEditor';
import { ExpandableInfoSection, Matrix3XInputGrid, Triplet } from './CommonPanelComponents';

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  if (value === null || value === undefined) return false;
  const testDummy: TValue = value;
  return true;
}

// export const GraphPanel: React.FC = () => {
//   const log = useLifecycleLogging('GraphPanel');
//   const sceneComposerId = useContext(sceneComposerIdContext);
//   const { selectedSceneNodeRef } = useEditorState(sceneComposerId);
//   const { getSceneNodeByRef, updateSceneNodeInternal } = useSceneDocument(sceneComposerId);
//   const selectedSceneNode = getSceneNodeByRef(selectedSceneNodeRef);
//   const knowledgeGraphInterface = useStore(sceneComposerId)((state) => state.knowledgeGraphInterface)!;
//   const setHighlightedNodeRefs = useStore(sceneComposerId)((state) => state.noHistoryStates.setHighlightedNodeRefs);
//   const selectedEntity = useStore(sceneComposerId)((state) => state.selectedEntity);
//   const setSelectedEntity = useStore(sceneComposerId)((state) => state.setSelectedEntity);
//   const [searchValue, setSearchValue] = useState('');

//   const highlightEntities = useCallback((entities: TwinMakerEntity[]) => {
//     const nodeRefs = entities
//       .map((entity) => {
//         const componentIndex = entity.components.findIndex((c) => c.componentTypeId === 'bms.revit.metadata');
//         if (componentIndex !== -1) {
//           const propertyIndex = entity.components[componentIndex].properties.findIndex(
//             (p) => p.propertyName === 'elementId',
//           );
//           if (propertyIndex !== -1) {
//             return entity.components[componentIndex].properties[propertyIndex].propertyValue as string;
//           }
//         }

//         return null;
//       })
//       .filter(notEmpty);
//     setHighlightedNodeRefs(nodeRefs);
//   }, []);

//   const findEntity = useCallback(() => {
//     (async () => {
//       const entities = await knowledgeGraphInterface.findEntitiesByName(searchValue);
//       console.log('found entities', entities);
//       if (entities.length > 0) {
//         setSelectedEntity(entities[0]);
//       }
//       highlightEntities(entities);
//     })();
//   }, [searchValue]);

//   const findRelatedEntities = useCallback(() => {
//     (async () => {
//       if (selectedEntity) {
//         // for (const e of entities) {
//         const related = await knowledgeGraphInterface.findRelatedEntities(selectedEntity, 10);
//         related.push(selectedEntity);
//         // }
//         console.log('found related entities', related);
//         highlightEntities(related);
//         // find related nodeRefs
//       }
//     })();
//   }, [searchValue]);

//   const exploreRelatedEntities = useCallback(() => {
//     (async () => {
//       if (selectedEntity) {
//         const related = await knowledgeGraphInterface.exploreEntitiesByEntityId(selectedEntity, 2);
//         highlightEntities(related);
//       }
//     })();
//   }, [selectedEntity]);

//   useEffect(() => {
//     if (selectedEntity?.entityName) {
//       setSearchValue(selectedEntity.entityName);
//     }
//   }, [selectedEntity]);

//   return (
//     <LogProvider namespace={'SceneNodeInspectorPanel'}>
//       <div style={{ overflow: 'auto' }}>
//         <ExpandableInfoSection title={'Query'} defaultExpanded>
//           <FormField label={'Find Object'}>
//             <SpaceBetween size={'xxs'}>
//               <Input value={searchValue} onChange={(e) => setSearchValue(e.detail.value)} />
//               <Button onClick={findEntity}>Find</Button>
//               <Button onClick={findRelatedEntities}>Find Related</Button>
//               <Button onClick={exploreRelatedEntities}>
//                 {`Explore: ${selectedEntity?.entityName ? selectedEntity.entityName : ''}`}
//               </Button>
//             </SpaceBetween>
//           </FormField>
//         </ExpandableInfoSection>
//       </div>
//     </LogProvider>
//   );
// };

export const GraphPanel: React.FC = () => {
  return <></>;
};
