import { GetState, SetState, StoreApi } from 'zustand';
import { MeshStyle } from '../../interfaces';

import { RootState } from '../Store';

export interface IViewOptionStateSlice {
  motionIndicatorVisible: boolean;
  elementDecorations?: Record<string, MeshStyle>;

  toggleMotionIndicatorVisibility: () => void;
  setElementDecorations: (elementDecorations?: Record<string, MeshStyle>) => void;
}

export const createViewOptionStateSlice = (
  set: SetState<RootState>,
  get: GetState<RootState>,
  api: StoreApi<RootState>,
): IViewOptionStateSlice => ({
  motionIndicatorVisible: true,
  elementDecorations: undefined,

  toggleMotionIndicatorVisibility: () => {
    set((draft) => {
      draft.noHistoryStates.motionIndicatorVisible = !draft.noHistoryStates.motionIndicatorVisible;
      draft.lastOperation = 'toggleMotionIndicatorVisibility';
    });
  },

  setElementDecorations: (elementDecorations) => {
    set((draft) => {
      draft.noHistoryStates.elementDecorations = elementDecorations;
      draft.lastOperation = 'setElementDecorations';
    });
  },
});
