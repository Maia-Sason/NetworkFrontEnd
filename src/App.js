import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Get redux in app
import {Provider} from 'react-redux'
import store from './store'

import {BrowserRouter as Router, Route} from 'react-router-dom';

import Footer from "./components/Footer.js"

import Layout from "./hoc/Layout.js"
import Home from "./containers/Home.js"
import Login from "./containers/Login.js"
import Register from "./containers/Register.js"
import Profile from "./containers/Profile.js"
import Follow from "./containers/Follow.js"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

import React, { useState, useEffect } from 'react';

function App() {
  

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
        
          <Layout>
            <Route exact path='/' component={Home}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/profile/:id' component={Profile}/>
            <Route exact path='/follow' component={Follow}/>
          </Layout>
          
        </Router>
        <Footer></Footer>
        {/* <button onClick={Login}></button> */}
      </div>
    </Provider>
  );
}

export default App;
