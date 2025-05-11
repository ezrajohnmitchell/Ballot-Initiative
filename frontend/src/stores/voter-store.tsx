import { create } from 'zustand';

interface VoterStore {
  voterFile: File | null;
  setVoterFile: (file: File | null) => void;
}

export const useVoterStore = create<VoterStore>((set) => ({
  voterFile: null,
  setVoterFile: (file) => set({ voterFile: file }),
}));
