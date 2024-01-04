import { AiFillLike } from 'react-icons/ai';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { UsersClient } from '../clients/users';
import { PostDTO } from '../dtos/post';
import { postAgeMessage } from '../utils/date';
import './PostCard.css';
import { CustomSkeleton } from './CustomSkeleton';

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

  const rating = 10;

  return (
    <Link to={`/posts/${post.id}`}>
      <span className="post-card">
        <div className="row title-container">
          <h3>{post.title}</h3>
          <div className="info">
            <small className='publised-by'>
              Published by <em>
                {user ? (
                  user.name
                ) : (
                  <CustomSkeleton width='4rem' />
                )}
              </em> {postAgeMessage.fromTodayDiff(post.publishedAt)}
            </small>
            <span>
              {rating}
              <AiFillLike />
            </span>
          </div>
        </div>
        <small>{`${post.content.slice(0, 64)}...`}</small>
      </span>
    </Link>
  )
}

export function LoadingPostCard() {
  return (
    <span className="post-card __loading">
      <div className="row title-container">
        <h3 style={{ flex: 1.2 }}>
          <CustomSkeleton />
        </h3>
        <div className="info">
          <small className='publised-by'>
            Published by
            <CustomSkeleton width='4rem' />
            {postAgeMessage(1)}
          </small>
          <span>
            <CustomSkeleton width='1rem' />
            <AiFillLike />
          </span>
        </div>
      </div>
      <small><CustomSkeleton /></small>
    </span>
  )
}