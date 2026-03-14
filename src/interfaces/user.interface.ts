export interface CreateUserDTO {
  name: string;
  email: string;
  role: string;
  password: string;
}

export interface User {
  uid: number;
  name: string;
  email: string;
  role: string;
}

