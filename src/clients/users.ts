import { UserDTO } from "../dtos/user";
import { AUTH_API_HOSTNAME } from "../variables";
import { Client } from "./base";

export class UserClient extends Client {
  constructor() {
    super(AUTH_API_HOSTNAME);
  }

  async users() {
    const resp = await this.fetch('/users');

    return resp.json() as Promise<UserDTO[]>;
  }
}