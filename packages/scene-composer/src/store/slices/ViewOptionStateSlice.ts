import { GetState, SetState, StoreApi } from 'zustand';

import { RootState } from '../Store';

export interface IViewOptionStateSlice {
  motionIndicatorVisible: boolean;
  highlightedNodeRefs?: string[];

  toggleMotionIndicatorVisibility: () => void;
  setHighlightedNodeRefs: (nodeRefs?: string[]) => void;
}

export const createViewOptionStateSlice = (
  set: SetState<RootState>,
  get: GetState<RootState>,
  api: StoreApi<RootState>,
): IViewOptionStateSlice => ({
  motionIndicatorVisible: true,
  highlightedNodeRefs: undefined,

  toggleMotionIndicatorVisibility: () => {
    set((draft) => {
      draft.noHistoryStates.motionIndicatorVisible = !draft.noHistoryStates.motionIndicatorVisible;
      draft.lastOperation = 'toggleMotionIndicatorVisibility';
    });
  },

  setHighlightedNodeRefs: (nodeRefs) => {
    set((draft) => {
      draft.noHistoryStates.highlightedNodeRefs = nodeRefs;
      // TODO: update this
      draft.lastOperation = 'toggleMotionIndicatorVisibility';
    });
  },
});
