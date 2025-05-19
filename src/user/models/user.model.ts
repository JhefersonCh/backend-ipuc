export interface UserModel {
  id?: string;
  firstName: string;
  lastName: string;
  role?: string;
  email: string;
  username: string;
  avatarUrl?: string;
  password?: string;
  confirmPassword?: string;
}

export interface ChangePasswordModel {
  id?: string;
  password?: string;
  confirmPassword?: string;
}

export interface UserFiltersModel {
  where?: UserWhereModel;
  relations?: 'roles';
}

export interface UserWhereModel {
  id?: string;
  identification?: string;
  email?: string;
}
