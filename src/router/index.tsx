import { Route, Routes } from 'react-router-dom';
import Home from '../pages/home/Home';
import SignIn from '../pages/auth/SignIn';
import SignUp from '../pages/auth/SignUp';
import { PostListPage } from '../pages/posts/PostListPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/sign-in' Component={SignIn} />
      <Route path='/sign-up' Component={SignUp} />
      <Route path='/posts' Component={PostListPage} />
      <Route path='/posts/:id' />
    </Routes>
  );
}