
import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';  
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Banner from './components/layout/Banner';
import MessageState from './context/message/MessageState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import Alerts from './components/layout/Alerts';
import setAuthToken from './utils/setAuthoken';
import { Routes } from './components/layout/Routes';
import ImagesState from './context/images/ImagesState';
import WorkSiteState from './context/worksite/WorkSiteState';
import CommentsState from './context/comments/CommentsState';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {
    
  return (
    <AuthState>
        <WorkSiteState>
        <CommentsState>
    <MessageState>
      <ImagesState>
      <AlertState>
    <Router>
      <div className="App">
        <div className="box d-flex flex-column">
        <Navbar/>
        <Banner/>

        <div className="container flex-grow-1 py-4">
          <Alerts/>
          <Routes/>
        </div>
        <Footer />
        </div>
        </div>
    </Router>
    </AlertState>
    </ImagesState>
    </MessageState>
    </CommentsState>
    </WorkSiteState>
    </AuthState>
  );
}

export default App;
