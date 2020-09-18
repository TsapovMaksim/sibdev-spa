import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import { PrivateRoute } from './components';
import { Auth, Favorites, Home } from './pages';
import { fetchUser } from './redux/actions/auth';

const auth = localStorage.getItem('token');

function App() {
  const dispatch = useDispatch();
  if (!!auth) {
    dispatch(fetchUser(+auth));
  }
  return (
    <div className="App">
      <Switch>
        <PrivateRoute exact auth={!!auth} path="/" component={() => <Home />} />
        <PrivateRoute exact auth={!!auth} path="/favorites" component={() => <Favorites />} />
        <Route exact path="/auth" component={() => <Auth />} />
        <Route exact path="*" component={() => <div>404 NOT FOUND</div>} />
      </Switch>
    </div>
  );
}

export default App;
