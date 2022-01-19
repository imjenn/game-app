// import styles from './App.css'
import './index.css';
import React from 'react';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Login from './components/Login';
import Games from './components/Games';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/register">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/games">
            <Games />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
