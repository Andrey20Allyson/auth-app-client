import { API_HOSTNAME } from "../variables";
import { JWT_TOKEN_STORAGE_KEY } from "./auth";

export type RequestInitWithoutMethod = Omit<RequestInit, 'method'>;
export type PostRequestInit = Omit<RequestInitWithoutMethod, 'body'>;

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export class Client {
  baseHeaders: Headers = new Headers();

  constructor(
    readonly baseUrl: string = API_HOSTNAME,
  ) {
    this.baseHeaders.set('Content-Type', 'application/json');
  }

  async fetch(path: string, options: RequestInit = {}) {
    const url = new URL(path, this.baseUrl);

    const headers = new Headers(options?.headers);
    for (const [name, value] of this.baseHeaders) {
      headers.set(name, value);
    }

    const token = sessionStorage.getItem(JWT_TOKEN_STORAGE_KEY);
    if (token !== null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    await sleep(2000);

    return fetch(url, {
      ...options,
      headers,
    });
  }

  get(url: string, options?: RequestInitWithoutMethod) {
    return this.fetch(url, { ...options, method: 'GET' });
  }
  
  post(url: string, data: object, options?: PostRequestInit) {
    const body = JSON.stringify(data);

    return this.fetch(url, { ...options, body, method: 'POST' });
  }

  put(url: string, options?: RequestInitWithoutMethod) {
    return this.fetch(url, { ...options, method: 'PUT' });
  }

  delete(url: string, options?: RequestInitWithoutMethod) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}