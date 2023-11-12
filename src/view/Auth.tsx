import React from 'react';
import Logged from './Logged';
import Home from './Home/Home';

export const Auth = () => {
  const [user, setUser] = React.useState(localStorage.getItem('token'));
  return <>{!user ? <Logged /> : <Home setUser={setUser} />}</>;
};
