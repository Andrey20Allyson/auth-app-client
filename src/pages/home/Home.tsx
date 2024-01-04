import { Header } from "../../components/Header";
import { UserList } from "../../components/UserList";
import './Home.css';

export default function Home() {
  return (
    <>
      <Header />
      <main className="home-root">
        <UserList />
      </main>
    </>
  );
}