// store/modalStore.ts
import { create } from "zustand";
import Swal from "sweetalert2";

enum customClass {
  confirmButton = "bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600",
  deleteButton = "bg-red-400 text-white px-4 py-2 rounded hover:bg-blue-600",
  cancelButton = "bg-red-400 text-white px-4 py-2 rounded hover:bg-gray-600",
}

type ModalStore = {
  successModal: (title: string, text?: string) => void;
  errorModal: (title: string, text?: string) => void;
  confirmModal: (title: string, text: string, onConfirm: () => void) => void;
};

export const useModalStore = create<ModalStore>(() => ({
  successModal: (title, text) => {
    Swal.fire({
      icon: "success",
      title,
      text,
    });
  },

  errorModal: (title, text) => {
    Swal.fire({
      icon: "error",
      title,
      text,
      customClass: {
        confirmButton: customClass.confirmButton,
      },
    });

  },

  confirmModal: (title, text, onConfirm) => {
    Swal.fire({
      icon: "question",
      title,
      text,
      showCancelButton: true,
      customClass: {
        confirmButton: customClass.confirmButton,
        cancelButton: customClass.cancelButton,
      },
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  },
}));
