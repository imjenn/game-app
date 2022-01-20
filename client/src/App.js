// import styles from './App.css'
import './index.css';
import React from 'react';
import Home from './components/Home';
import './index.css';
import Navbar from './components/Navbar';
import Registration from './components/Registration';
import Login from './components/Login';
import Games from './components/Games';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute";


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
            <ProtectedRoute exact path={"/profile"} component={Profile}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;