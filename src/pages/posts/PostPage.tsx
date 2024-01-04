import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { PostsClient } from "../../clients/posts";
import { PostDTO } from "../../dtos/post";
import './PostPage.css';

export interface NotFoundPostProps {
  id: string;
}

export function NotFoundPost(props: NotFoundPostProps) {
  return (
    <main>
      <h2>404 Post Not Found</h2>
      <p>Can't find with id {props.id}</p>
    </main>
  )
}

export default function PostPage() {
  const { id } = useParams();
  if (id === undefined) throw new Error(`PostPage depends on 'id' path param!`);

  const posts = new PostsClient();
  const { data, error } = useQuery(
    ['find-post', id] as const,
    config => posts.find(config.queryKey[1]),
  );

  return (
    <>
      <Header />
      {!error && data ? <PostBody post={data} /> : <NotFoundPost id={id} />}
    </>
  );
}

export interface PostBodyProps {
  post: PostDTO;
}

export function PostBody(props: PostBodyProps) {
  const {
    post,
  } = props;

  return (
    <main className="post-page">
      <h2>{post.title}</h2>
      <p>{post.content}</p>
    </main>
  );
}