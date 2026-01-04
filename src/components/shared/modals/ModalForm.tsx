import { Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useModalFormStore } from "src/stores";


export const ModalForm = () => {
  const { isOpen, head, content, footer, closeModal } = useModalFormStore();

  return (
    <Dialog {...({} as any)} open={isOpen}
      className="
      mx-auto my-auto
      w-[95%]
      sm:w-[80%]
      md:w-[70%]
      lg:w-[60%]
      max-h-[100vh]
      overflow-y-auto
      rounded-2xl
      bg-white
      flex flex-col
      animate-fadeIn
  ">
      <DialogHeader {...({} as any)} className="flex justify-between items-start border-b border-gray-200">
        {head || <h1 className="text-gray-600">No hay contenido disponible.</h1>}
        {/* <button {...({} as any)} className="close-button" onClick={closeModal}>
          ✕
        </button> */}
      </DialogHeader>

      <DialogBody {...({} as any)} divider className="p-4">
        {content || <p className="text-gray-600">No hay contenido disponible.</p>}
      </DialogBody>

      <DialogFooter {...({} as any)} className="flex justify-end border-t border-gray-200">
        {footer || <button {...({} as any)} color="blue" onClick={closeModal}>Cerrar</button>}
      </DialogFooter>
    </Dialog>
  );
};
