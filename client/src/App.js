import './App.css';
import React from 'react';
import Home from './components/HomePage/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Registration from './components/Forms/Registration';
import Login from './components/Forms/Login';
import Games from './components/Games/Games';
import ShowGame from './components/Games/ShowGame';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Profile from "./components/UserProfile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import Chat from "./components/Chat/Chat";
import Forum from "./components/Forums/Forum";
import PrivacyPolicy from './components/Footer/PrivacyPolicy';
import Post from './components/Posts/Post';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
              <Footer />
            </Route>
            <Route exact path="/register">
              <Registration />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/games">
              <Games />
              <Footer />
            </Route>
            <Route exact path="/games/:id">
              <ShowGame />
              <Footer />
            </Route>
            <Route exact path="/privacy">
              <PrivacyPolicy />
              <Footer />
            </Route>
            <Route path="/post/new/:id">
              <Post />
            </Route>
            <ProtectedRoute exact path={"/profile"} component={Profile}/>
            {/* <ProtectedRoute exact path={"/outpage"} component={OutPage}/> */}
            <ProtectedRoute exact path={"/chat"}>
              <Chat />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute exact path="/forum/:id">
              <Forum />
              <Footer />
            </ProtectedRoute>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;