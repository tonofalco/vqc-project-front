import { Button } from "@material-tailwind/react";
import { useModalFormStore } from "../../../stores";

export const EjemploBoton = () => {
  const { openModal } = useModalFormStore();

  const handleClick = () => {
    openModal(
      <div>
        <h2 className="text-lg font-semibold mb-2">¡Hola Luis!</h2>
        <p>Este contenido fue pasado dinámicamente al modal.</p>
      </div>
    );
  };

  return (
    <Button {...({} as any)} color="green" onClick={handleClick}>
      Abrir Modal Global
    </Button>
  );
};
