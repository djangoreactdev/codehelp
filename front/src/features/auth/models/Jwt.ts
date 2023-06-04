export type Jwt = string | null;

export type JwtBack =
  | { refreshToken: string; accessToken: string }
  | string
  | null;
