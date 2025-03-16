export interface UserModel {
  id: string;
  firstName: string;
  lastName: string;
  role?: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
