import { JWT_TOKEN_STORAGE_KEY } from "./auth";

export type RequestInitWithoutMethod = Omit<RequestInit, 'method'>;

export class Client {
  baseHeaders: Headers = new Headers();

  constructor(
    readonly baseUrl: string,
  ) {
    this.baseHeaders.set('Content-Type', 'application/json');
  }

  fetch(path: string, options: RequestInit = {}) {
    const url = new URL(path, this.baseUrl);

    const headers = new Headers(options?.headers);
    for (const [name, value] of this.baseHeaders) {
      headers.set(name, value);
    }

    const token = sessionStorage.getItem(JWT_TOKEN_STORAGE_KEY);
    if (token !== null) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return fetch(url, {
      ...options,
      headers,
    });
  }

  get(url: string, options?: RequestInit) {
    return this.fetch(url, { ...options, method: 'GET' });
  }
  
  post(url: string, options?: RequestInit) {
    return this.fetch(url, { ...options, method: 'POST' });
  }

  put(url: string, options?: RequestInit) {
    return this.fetch(url, { ...options, method: 'PUT' });
  }

  delete(url: string, options?: RequestInit) {
    return this.fetch(url, { ...options, method: 'DELETE' });
  }
}