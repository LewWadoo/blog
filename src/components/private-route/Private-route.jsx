import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoute({ component, path, exact = false, redirect = '/sign-in', condition }) {
  return condition ? (
    <Route path={path} exact={exact} component={component} />
  ) : (
    <Redirect to={redirect} />
  );
}

export default PrivateRoute;
