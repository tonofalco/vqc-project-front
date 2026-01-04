import { LoginResponse } from "../services/auth.service";
import { useUsersStore } from "../stores";

export const useUser = () => {
  
  const setActiveUser = useUsersStore((state) => state.setActiveUser);

  const handleSelectUser = (user: LoginResponse) => {
    setActiveUser(user);
    console.log("Usuario activo:", user);
  };

  return { handleSelectUser };
};
