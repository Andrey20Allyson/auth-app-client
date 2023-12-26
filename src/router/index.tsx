import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export function AppRouter() {
  return (
    <Routes>
      <Route path='/' Component={Home} />
      <Route path='/sign-in' Component={SignIn} />
      <Route path='/sign-up' Component={SignUp} />
    </Routes>
  );
}