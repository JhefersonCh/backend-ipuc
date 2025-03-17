export interface TokenPayloadModel {
  sub?: string;
  username?: string;
  id?: string;
}

export interface UserAuthModel {
  username: string;
  password: string;
  id: string;
}
