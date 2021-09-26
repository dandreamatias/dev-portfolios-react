import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/login/Login';

const ProtectedRoute = (props) => {
  const userIsLogged = localStorage.getItem('__token');

  return <Route {...props}>{userIsLogged ? props.children : <Login />}</Route>;
};

export default ProtectedRoute;
