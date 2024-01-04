import { ReactNode } from "react";
import { useQuery } from "react-query";
import { UsersClient } from "../clients/users";
import { UserCard } from "./UserCard";
import './UserList.css';

export function UserList() {
  const userClient = new UsersClient();
  const response = useQuery('users', () => userClient.list());

  let userList: ReactNode;

  if (response.status === 'success') {
    const users = response.data;

    userList = users.map((user, index) => <UserCard key={index} {...user} />);
  } else if (response.status === 'error') {
    console.log(response.error);

    userList = <UnaltorizedGETMessage />
  }

  return (
    <section className="user-list">
      <h2>Users</h2>
      <ul>
        {userList}
      </ul>
    </section>
  );
}

function UnaltorizedGETMessage() {
  return (
    <p>Unaltorized!</p>
  );
}