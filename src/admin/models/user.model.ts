export interface UserModel {
  id?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  role?: string;
  password?: string;
  confirmPassword?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
