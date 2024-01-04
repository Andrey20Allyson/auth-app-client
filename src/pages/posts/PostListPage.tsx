import { useQuery } from "react-query";
import { PostsClient } from "../../clients/posts";
import { Header } from "../../components/Header";
import { LoadingPostCard, PostCard } from "../../components/PostCard";
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
          {status === 'loading' ? (
            new Array(4)
              .fill(0)
              .map((_, idx) => <LoadingPostCard key={idx} />)
          ) : (
            data!.map((post, idx) => <PostCard key={idx} post={post} />)
          )}
        </section>
      </main>
    </>
  );
}