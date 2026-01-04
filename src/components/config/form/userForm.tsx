import { useModalFormStore } from "src/stores";
import { TooltipCustom } from "src/components";
import { IoPersonAddOutline } from "react-icons/io5";

export const EjemploBoton = () => {
  const { openModal } = useModalFormStore();

  const handleClick = () => {
    openModal(
      // 🔹 HEADER
      <div>
        <h1 className="text-xl font-semibold">Hola</h1>
      </div>,

      // 🔹 CONTENT
      <div>
        <h2 className="text-lg font-semibold mb-2">¡Hola Luis!</h2>
        <p>Este contenido fue pasado dinámicamente al modal.</p>
        <p>lorem*100</p>
      </div>
    );
  };

  return (
    <TooltipCustom content="Registrar nuevo usuario" placement="top">
      <button onClick={handleClick} className="primary-button"><IoPersonAddOutline /></button>
    </TooltipCustom>
  );
};
