import { PostDTO } from "../dtos/post";
import { Client } from "./base";
import { queryString } from "./utils";

export interface CreatePostData {
  title: string;
  content: string;
}

export interface ListPostsOptions {
  authorId?: number;
}

export class PostsClient extends Client {
  async find(id: number | string): Promise<PostDTO> {
    const res = await this.get(`/posts/${id}`);

    if (res.ok === false) return Promise.reject(res.status);

    return res.json();
  }

  async list(options: ListPostsOptions = {}): Promise<PostDTO[]> {
    const res = await this.get(`/posts${queryString(options)}`);

    return res.json();
  }

  async create(data: CreatePostData): Promise<PostDTO> {
    const res = await this.post(`/posts`, data);

    return res.json();
  }
}