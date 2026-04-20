import { useState, useCallback } from "react";

interface ModalState<T = unknown> {
  open: boolean;
  data?: T; // opcional: datos dinámicos (por ejemplo, el usuario seleccionado)
}

export const useModal = <T = unknown>() => {
  const [modal, setModal] = useState<ModalState<T>>({ open: false });

  const handleOpen = useCallback((data?: T) => {
    setModal({ open: true, data });
  }, []);

  const handleClose = useCallback(() => {
    setModal({ open: false });
  }, []);

  const handleConfirm = useCallback((callback?: (data?: T) => void) => {
    if (callback) callback(modal.data);
    setModal({ open: false });
  }, [modal.data]);

  return {
    open: modal.open,
    data: modal.data,
    handleOpen,
    handleClose,
    handleConfirm,
  };
};
