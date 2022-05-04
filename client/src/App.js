import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Chat from "./components/Chat/Chat";
import ChatCom from "./components/Chat/ChatCom";
import Footer from './views/Footer/Footer/Footer';
import Forum from "./components/Forums/Forum";
import Games from './components/Games/Games';
import GameNews from "./components/News/GameNews";
import Home from './views/Home/Home';
import Login from './components/Authentication/Login/Login';
import Navbar from './views/Navbar/Navbar';
import Profile from "./components/UserProfile/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import PrivacyPolicy from './views/Footer/PrivacyPolicy/PrivacyPolicy';
import Post from './components/Posts/Post';
import Registration from './components/Authentication/Registration/Registration';
import ShowGame from './components/Games/ShowGame';

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
            <Route exact path="/news">
              <GameNews />
              <Footer />
            </Route>
            <Route exact path="/privacy">
              <PrivacyPolicy /> 
              <Footer />
            </Route>
            <ProtectedRoute path="/post/new/:id">
              <Post />
            </ProtectedRoute>
            <ProtectedRoute exact path={"/profile"} component={Profile}/>
            {/* <ProtectedRoute exact path={"/outpage"} component={OutPage}/> */}
            <ProtectedRoute exact path={"/chat"}>
              <Chat />
              <Footer />
            </ProtectedRoute>
            <ProtectedRoute exact path={"/chatroom"}>
              <ChatCom />
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