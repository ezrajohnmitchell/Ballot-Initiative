import { create } from 'zustand';
import { type Crop } from "react-image-crop"

export interface ImageState {
  image: File,
  crop?: Crop,
}

export interface PetitionStore {
  petitionFiles: ImageState[];
  ocrStatus: "idle" | "processing" | "done" | "error";
  setPetitionFiles: (files: ImageState[]) => void;
  setOCRStatus: (status: PetitionStore["ocrStatus"]) => void;
}

export const usePetitionStore = create<PetitionStore>((set) => ({
  petitionFiles: [],
  setPetitionFiles: (files) => set({ petitionFiles: files }),
  ocrStatus: "idle",
  setOCRStatus: (status) => set({ ocrStatus: status })
}));