import { create } from "zustand";

export interface AppStateStore {
  voterFileUploaded: boolean;
  signatureFileUploaded: boolean;
  hasRunMatching: boolean;
  tempFilesCleared: boolean;

  setVoterFileUploaded: (value: boolean) => void;
  setSignatureFileUploaded: (value: boolean) => void;
  setHasRunMatching: (value: boolean) => void;
  setTempFilesCleared: (value: boolean) => void;

  resetSteps: () => void;
}

export const useAppStateStore = create<AppStateStore>((set) => ({
  voterFileUploaded: false,
  signatureFileUploaded: false,
  hasRunMatching: false,
  tempFilesCleared: false,

  setVoterFileUploaded: (v) => set({ voterFileUploaded: v }),
  setSignatureFileUploaded: (v) => set({ signatureFileUploaded: v }),
  setHasRunMatching: (v) => set({ hasRunMatching: v }),
  setTempFilesCleared: (v) => set({ tempFilesCleared: v }),

  resetSteps: () =>
    set({
      voterFileUploaded: false,
      signatureFileUploaded: false,
      hasRunMatching: false,
      tempFilesCleared: false,
    }),
}));