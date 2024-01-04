import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { PostsClient } from "../../clients/posts";
import { UsersClient } from "../../clients/users";
import { Header } from "../../components/Header";
import { PostDTO } from "../../dtos/post";
import './PostCard.css';
import './PostListPage.css';
import { postAgeMessage } from "../../utils/date";

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

export interface PostCardProps {
  post: PostDTO;
}

export function PostCard(props: PostCardProps) {
  const {
    post,
  } = props;

  const usersClient = new UsersClient();
  const { data: user } = useQuery(
    ['find-user', post.authorId] as const,
    config => usersClient.find(config.queryKey[1])
  );
  
  return (
    <Link to={`/posts/${post.id}`}>
      <span className="post-card">
        <div className="row title-container">
          <h3>{post.title}</h3>
          { user ? <small>Published by <em>{user.name}</em> {postAgeMessage.fromTodayDiff(post.publishedAt)}</small> : <small>...</small> }
        </div>
        <small>{`${post.content.slice(0, 64)}...`}</small>
      </span>
    </Link>
  )
}