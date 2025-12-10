export interface SignInDTO {
  email: string;
  password: string;
}

export interface AutenticaoUserResponse {
  userId: string;
  email: string;
}

export interface RequestUsuario {
  user: AutenticaoUserResponse;
}

export type IUserAuthenticationResponse = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};
