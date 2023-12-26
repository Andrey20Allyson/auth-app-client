import { UserDTO } from "../dtos/user";
import './UserCard.css';

export interface UserCardProps extends UserDTO { }

export function UserCard(props: UserCardProps) {
  const {
    name,
    age,
  } = props;

  return (
    <li className="user-card">
      <p><strong>Name</strong>: {name}</p>
      <p><strong>Age</strong>: {age}</p>
    </li>
  );
}