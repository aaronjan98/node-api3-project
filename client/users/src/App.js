import React from 'react';
import { Route, Switch } from "react-router-dom";
import './styles/App.css';

import UsersList from './components/UsersList';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <h1>Users:</h1>
      <Switch>
        <Route exact path="/users">
          <UsersList />
        </Route>
        <Route exact path="/users/:id/posts">
          <User />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
