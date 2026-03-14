//Request - Authentication request sent to the backend
//Response - Authentication response received from the backend

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  ok: boolean;
  uid: number;
  name: string;
  email: string;
  role: string;
  token: string;
}