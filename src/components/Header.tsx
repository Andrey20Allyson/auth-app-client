import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { AuthClient } from "../clients/auth";
import './Header.css';

export function Header() {
  const authClient = new AuthClient();

  const { data, status } = useQuery('self-user', () => authClient.info());

  let name = '';

  if (status === 'success') {
    name = data.name
  }

  function logout() {
    authClient.logout();

    location.reload();
  }

  return (
    <header className="app-header">
      <h1>Olá {name}</h1>
      <nav>
        <button onClick={logout}>Sair</button>
        <Link to='/sign-in'>
          <button>
            Entrar
          </button>
        </Link>
        <Link to='/sign-up'>
          <button>
            Registrar
          </button>
        </Link>
      </nav>
    </header>
  );
}