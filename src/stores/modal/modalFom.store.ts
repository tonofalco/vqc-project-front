import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ModalFormStore {
  isOpen: boolean;
  head: React.ReactNode | null;
  content: React.ReactNode | null;
  footer: React.ReactNode | null;
  setIsOpen: (status: boolean) => void;
  openModal: (head?: React.ReactNode, content?: React.ReactNode, footer?: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalFormStore = create<ModalFormStore>()(
  devtools((set) => ({
    isOpen: false,
    head: null,
    content: null,
    footer: null,

    setIsOpen: (status: boolean) => set({ isOpen: status }),
    openModal: (head, content, footer) => set({ isOpen: true, head, content, footer }),
    closeModal: () => set({ isOpen: false, content: null, head: null, footer: null }),
  }))
);
