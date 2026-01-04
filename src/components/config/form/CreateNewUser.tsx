import { useModalFormStore } from "src/stores";
import { TooltipCustom } from "src/components";
import { IoPersonAddOutline } from "react-icons/io5";


export const CreateNewUser = () => {

  const { openModal, closeModal } = useModalFormStore();
  const labelStyle = "block text-gray-700 text-sm font-bold mb-1";

  const handleClick = () => {
    openModal(
      // 🔹 HEADER
      <div>
        <h1>Registro De Nuevo Usuario</h1>
      </div>,

      // 🔹 CONTENT
      <form action="">

        <div className="mb-3">
          <label className={labelStyle} htmlFor="username">
            Nombre De Usuario
          </label>
          <input
            type="text"
            id="username"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <div>
            <label className={labelStyle} htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="role">
              Rol
            </label>
            <input
              type="text"
              id="role"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="password">
              Contraseña
            </label>
            <input
              type="text"
              id="password"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className={labelStyle} htmlFor="passwordRenew">
              Confirmar Contraseña
            </label>
            <input
              type="text"
              id="passwordRenew"
              className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </form>,

      // 🔹 FOOTER
      <div className="flex gap-x-4">
        <button className="secondary-button" onClick={closeModal}>Cancelar</button>
        <button className="primary-button">Registrar</button>

      </div>
    );
  };

  return (
    <TooltipCustom content="Registrar nuevo usuario" placement="top">
      <button onClick={handleClick} className="primary-button"><IoPersonAddOutline /></button>
    </TooltipCustom>
  );
}
