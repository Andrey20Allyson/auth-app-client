import { SignInData } from "../dtos/sign-in";
import { SignUpData } from "../dtos/sign-up";
import { UserDTO } from "../dtos/user";
import { Client } from "./base";

export const JWT_TOKEN_STORAGE_KEY = 'jwt-token';

export interface IAuthClient {
  signIn(data: SignInData): Promise<string>;
  signUp(data: SignUpData): Promise<string>;
  info(): Promise<UserDTO>;
  logout(): void;
}

export class AuthClient extends Client implements IAuthClient {
  async signIn(data: SignInData) {
    const resp = await this.fetch('/auth/sign-in', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    const token = await resp.text();

    this.saveToken(token);

    return token;
  }

  saveToken(token: string) {
    sessionStorage.setItem(JWT_TOKEN_STORAGE_KEY, token);
  }

  async signUp(data: SignUpData) {
    const resp = await this.post('/auth/sign-up', {
      body: JSON.stringify(data),
    });

    const token = await resp.text();

    this.saveToken(token);

    return token;
  }

  async info(): Promise<UserDTO> {
    const resp = await this.get('/auth');

    return resp.json()
  }

  logout() {
    sessionStorage.removeItem(JWT_TOKEN_STORAGE_KEY);
  }
}