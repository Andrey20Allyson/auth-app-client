import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { PostsClient } from "../../clients/posts";
import { CustomSkeleton } from "../../components/CustomSkeleton";
import { Header } from "../../components/Header";
import { PostDTO } from "../../dtos/post";
import './PostPage.css';

export default function PostPage() {
  return (
    <>
      <Header />
      <PostPageBody />
    </>
  );
}

export function PostPageBody() {
  const { id } = useParams();
  if (id === undefined) throw new Error(`PostPage depends on 'id' path param!`);

  const posts = new PostsClient();
  const { data: post, error, status } = useQuery(
    ['find-post', id] as const,
    config => posts.find(config.queryKey[1]),
  );

  if (status === 'loading') {
    return <LoadingPostBody />
  }

  if (error || post === undefined) {
    return <NotFoundPost id={id} />;
  }

  return <PostBody post={post} />
}

export function LoadingPostBody() {
  return (
    <main className="post-page">
      <h2>
        <CustomSkeleton width='60%' />
      </h2>
      <p>
        <CustomSkeleton count={4} />
        <CustomSkeleton width='40%' />
      </p>
      <p>
        <CustomSkeleton count={2} />
        <CustomSkeleton width='30%' />
      </p>
      <p>
        <CustomSkeleton count={3} />
        <CustomSkeleton width='90%' />
      </p>
    </main>
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

export interface NotFoundPostProps {
  id: string;
}

export function NotFoundPost(props: NotFoundPostProps) {
  return (
    <main className="post-page error">
      <h2>404 - Postagem não encontrada</h2>
      <p>Não foi possível achar a postagem com id '{props.id}'</p>
    </main>
  )
}