import { useModalTemplateStore } from "src/stores";

export default function Modal() {
  const { isOpen, content } = useModalTemplateStore();

  if (!isOpen) return null;

  return (
    /* Agregamos animate-fadeIn para que el fondo oscuro aparezca suavemente */
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 animate-fadeIn">
      
      {/* Agregamos animate-scaleUp para que el modal crezca un poquito al aparecer */}
      <div className="bg-white rounded-2xl shadow-lg p-8 overflow-y-auto
        w-[95%]
        sm:w-[80%]
        md:w-[70%]
        lg:w-[60%]
        max-h-[100vh]
        animate-scaleUp
      ">
        {content}
      </div>
    </div>
  );
}