import { CreateUserForm, UpdateUserForm } from "src/components";
import { useModalStore, useModalTemplateStore, useUsersStore } from "../stores";


export const useUser = () => {

  const loading = useUsersStore((state) => state.loading);
  const setActiveUser = useUsersStore((state) => state.setActiveUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const { openModal } = useModalTemplateStore();
  const { confirmModal, successModal } = useModalStore();


  // manejar la apertura del modal para crear un nuevo usuario
  const handleCreateUserModal = () => {
    setActiveUser(null);
    openModal(<CreateUserForm />);
  };

  // manejar la apertura del modal para actualizar un usuario existente
  const handleUpdateUserModal = (user: any) => {
    setActiveUser(user);
    openModal(<UpdateUserForm />);

  };

  //manejar la eliminación de un usuario con confirmación
  const handleDelete = (id: string, name: string) => {

    confirmModal(
      "¿Estás seguro?",
      `¿Deseas eliminar al usuario "${name}"?`,
      async () => {
        const success = await deleteUser(id);

        if (success) {
          successModal("Usuario eliminado correctamente");
        }
      }
    );
  };

  return {

    //estados
    loading,

    //funciones
    handleCreateUserModal,
    handleUpdateUserModal,
    handleDelete
  };
};
