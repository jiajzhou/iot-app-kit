import { GetState, SetState, StoreApi } from 'zustand';

import { IDataInput, IDataBindingTemplate, TwinMakerEntity } from '../../interfaces';
import { RootState } from '../Store';

export interface IDataStoreSlice {
  dataInput?: IDataInput;
  dataBindingTemplate?: IDataBindingTemplate;
  selectedEntity?: TwinMakerEntity;

  setDataInput: (dataInput?: IDataInput) => void;
  setDataBindingTemplate: (dataBindingTemplate: IDataBindingTemplate) => void;
  setSelectedEntity: (entity: TwinMakerEntity) => void;
}

export const createDataStoreSlice = (
  set: SetState<RootState>,
  get: GetState<RootState>,
  api: StoreApi<RootState>,
): IDataStoreSlice => ({
  dataInput: undefined,

  setDataInput: (dataInput) => {
    set((draft) => {
      draft.dataInput = dataInput;
      draft.lastOperation = 'setDataInput';
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
