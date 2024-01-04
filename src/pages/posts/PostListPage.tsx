import { useQuery } from "react-query";
import { PostsClient } from "../../clients/posts";
import { Header } from "../../components/Header";
import { PostCard } from "../../components/PostCard";
import './PostListPage.css';

export function PostListPage() {
  const postsClient = new PostsClient();

  const { data, status } = useQuery('posts', () => postsClient.list());

  return (
    <>
      <Header />
      <main className="post-list-page">
        <h2>Postagens</h2>
        <section>
          {data && status !== 'error' &&
            data.map(post => <PostCard post={post} />)}
          {status === 'error' && <h3>Houve Um Erro</h3>}
        </section>
      </main>
    </>
  );
}