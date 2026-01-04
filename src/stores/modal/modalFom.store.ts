import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalFormStore {
  isOpen: boolean;
  content: React.ReactNode | null;
  setIsOpen: (status: boolean) => void;
  openModal: (content?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalFormStore = create<ModalFormStore>()(
  devtools((set) => ({
    isOpen: false,
    content: null,

    setIsOpen: (status: boolean) => set({ isOpen: status }),
    openModal: (content) => set({ isOpen: true, content }),
    closeModal: () => set({ isOpen: false, content: null }),
  }))
);
