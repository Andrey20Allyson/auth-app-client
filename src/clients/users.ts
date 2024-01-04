import { UserDTO } from "../dtos/user";
import { Client } from "./base";

export class UsersClient extends Client {
  async list() {
    const resp = await this.fetch('/users');

    return resp.json() as Promise<UserDTO[]>;
  }

  async find(id: number | string): Promise<UserDTO> {
    const resp = await this.fetch(`/users/${id}`);

    return resp.json();
  }
}