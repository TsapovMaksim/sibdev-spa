import React, { ReactElement } from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
  component: React.ComponentType<any>;
  auth: boolean;
  exact?: boolean;
  path: string;
}

function PrivateRoute({ component: Component, auth, ...rest }: Props): ReactElement {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth === false ? <Redirect push to={'/auth'} /> : <Component {...props} />
      }
    />
  );
}

export default PrivateRoute;
