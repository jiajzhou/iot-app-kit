import { GetState, SetState, StoreApi } from 'zustand';

import { IDataInput, IDataBindingTemplate, KnowledgeGraphInterface, TwinMakerEntity } from '../../interfaces';
import { RootState } from '../Store';

export interface IDataStoreSlice {
  dataInput?: IDataInput;
  dataBindingTemplate?: IDataBindingTemplate;
  knowledgeGraphInterface?: KnowledgeGraphInterface;
  selectedEntity?: TwinMakerEntity;

  setDataInput: (dataInput?: IDataInput) => void;
  setKnowledgeGraphInterface: (knowledgeGraphInterface?: KnowledgeGraphInterface) => void;
  setDataBindingTemplate: (dataBindingTemplate: IDataBindingTemplate) => void;
  setSelectedEntity: (entity: TwinMakerEntity) => void;
}

export const createDataStoreSlice = (
  set: SetState<RootState>,
  get: GetState<RootState>,
  api: StoreApi<RootState>,
): IDataStoreSlice => ({
  dataInput: undefined,
  knowledgeGraphInterface: undefined,

  setDataInput: (dataInput) => {
    set((draft) => {
      draft.dataInput = dataInput;
      draft.lastOperation = 'setDataInput';
    });
  },

  setKnowledgeGraphInterface: (knowledgeGraphInterface) => {
    set((draft) => {
      draft.knowledgeGraphInterface = knowledgeGraphInterface;
      draft.lastOperation = 'setKnowledgeGraphInterface';
    });
  },

  setDataBindingTemplate: (dataBindingTemplate) => {
    set((draft) => {
      draft.dataBindingTemplate = dataBindingTemplate;
      draft.lastOperation = 'setDataBindingTemplate';
    });
  },

  setSelectedEntity: (entity) => {
    set((draft) => {
      draft.selectedEntity = entity;
      draft.lastOperation = 'setSelectedEntity';
    });
  },
});
