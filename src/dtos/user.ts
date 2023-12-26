export type Role = 'user' | 'admin';

export interface UserDTO {
  name: string;
  age: number;
  login: string;
  birthDate: string;
}