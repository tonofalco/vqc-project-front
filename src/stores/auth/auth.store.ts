import { StateCreator, create } from "zustand";
import type { UserId, AuthStatus, LoginRequest, LoginResponse } from "src/interfaces";
import { AuthService } from "src/services/auth/auth.service";
import { devtools, persist } from "zustand/middleware";

export interface AuthState {
  status: AuthStatus;
  token: string;
  user: UserId;

  loginUser: (loginRequest: LoginRequest) => Promise<LoginResponse>;
  checkAuthStatus: () => Promise<LoginResponse>;
  logoutUser: () => void;

}

const storeApi: StateCreator<AuthState> = (set) => ({
  status: 'pending',
  token: '',
  user: {} as UserId,

  // Función para iniciar sesión
  loginUser: async (loginRequest: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await AuthService.login(loginRequest);
      const { token, ...user } = response;
      set({ status: 'authorized', token, user });
      return response;
    } catch (error) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      throw error instanceof Error
        ? error
        : new Error('unauthenticated');
    }
  },

  checkAuthStatus: async (): Promise<LoginResponse> => {
    try {
      const response = await AuthService.checkStatus();
      const { token, ...user } = response;
      set({ status: 'authorized', token, user });
      return response;
    } catch (error) {
      set({ status: 'unauthenticated', token: undefined, user: undefined });
      console.error('Auth status check failed:', error);
      throw error;
    }
  },

  logoutUser: () => {
    set({ status: 'unauthenticated', token: undefined, user: undefined });
  }
});

export const useAuthStore = create<AuthState>()(devtools(
  persist(
    storeApi, { name: 'auth-storage' }
  )));