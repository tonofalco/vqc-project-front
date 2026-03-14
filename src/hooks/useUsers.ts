import { useUsersStore } from "../stores";

export const useUser = () => {

  const loading = useUsersStore((state) => state.loading);
  const setActiveUser = useUsersStore((state) => state.setActiveUser);
  const deleteUser = useUsersStore((state) => state.deleteUser);

  const handleSelectUser = (user: any) => {
    // 1. Lo marcamos como activo en el store de usuarios
    setActiveUser(user);
    console.log('user', user)

  };

  const handleDelete = async (id: string, name: string) => {
    const confirmed = window.confirm(`¿Estás seguro de que deseas eliminar al usuario "${name}"?`);

    if (confirmed) {
      const success = await deleteUser(id);
      if (success) {
        // Opcional: Aquí podrías usar un toast.success("Eliminado correctamente")
        console.log("Usuario eliminado");
      }
    }
  };

  return {

    //estados
    loading,

    //funciones
    handleSelectUser,
    handleDelete
  };
};
