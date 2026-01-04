import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from "@material-tailwind/react";
import { useModalFormStore } from "../../../stores";


export const ModalForm = () => {
  const { isOpen, content, closeModal } = useModalFormStore();

  return (
    <Dialog {...({} as any)} open={isOpen} handler={closeModal} size="md"
      className="
        mx-auto my-24
        max-h-[100vh] 
        w-[100%] sm:w-[600px]
        overflow-y-auto 
        rounded-2xl 
        bg-white
        flex flex-col
        animate-fadeIn
      ">
      <DialogHeader {...({} as any)} className="flex justify-between items-center border-b border-gray-200">
        <span>Modal</span>
        <Button {...({} as any)} variant="text" color="red" onClick={closeModal}>
          ✕
        </Button>
      </DialogHeader>

      <DialogBody {...({} as any)} divider className="p-4">
        {content || <p className="text-gray-600">pNo hay contenido disponible.</p>}
      </DialogBody>

      <DialogFooter {...({} as any)} className="flex justify-end border-t border-gray-200">
        <Button {...({} as any)} color="blue" onClick={closeModal}>
          Cerrar
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
