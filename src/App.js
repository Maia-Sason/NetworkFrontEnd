import logo from './logo.svg';
import './App.css';

// Get redux in app
import {Provider} from 'react-redux'
import store from './store'

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Compose from "./components/Compose.js"
import PostBox from "./components/PostBox.js"
import Post from "./components/Post.js"
import NavBar from "./components/NavBar.js"
import Footer from "./components/Footer.js"

import Layout from "./hoc/Layout.js"
import Home from "./containers/Home.js"
import Login from "./containers/Login.js"
import Register from "./containers/Register.js"
import Notification from './components/Notification'
import NotificationBox from './components/NotificationBox'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import React, { useState } from 'react';
import { useEffect } from 'react';



function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        
          <Layout>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            
          </Layout>
          
        </Router>
        <Footer></Footer>
        {/* <button onClick={Login}></button> */}
      </div>
    </Provider>
  );
}

export default App;
