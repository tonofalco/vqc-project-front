export interface User {
  uid: number;
  email?: string;
  name?: string;
  isActive?: boolean;
  role: string;
}