import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import {Provider} from 'react-redux';// very important to connect all the aplication

import App from './App';
import Login from './views/containers/login/login.component';
import Menu from './views/containers/menuMonth/menuMonth.component';
import Store from './core/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

//  Firebase initialization
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDmhyj7ZqeCxnFbr974CSvkiheTSfzfZmc',
  authDomain: 'el-papa-forever.firebaseapp.com',
  databaseURL: 'https://el-papa-forever.firebaseio.com',
  storageBucket: 'el-papa-forever.appspot.com',
  messagingSenderId: '5314079546'
};

firebase.initializeApp(config);
//****************

let userData = {logged: false};

if (sessionStorage.user) {
  userData = JSON.parse(sessionStorage.user); // eslint-disable-line
}
if (sessionStorage.admin) {
  adminData = JSON.parse(sessionStorage.admin); // eslint-disable-line
}

// <Provider> is use to wrap all the components and connect
ReactDOM.render(
  <Provider store={Store} >
    <Router history={browserHistory}>
      <Route path='/' component={Login} />
      { userData.logged ? <Route path='/dashboard' component={App} /> : browserHistory.push('/') }
      { userData.logged ? <Route path='/menu' component={Menu} /> : browserHistory.push('/') }
    </Router>
  </Provider>,
  document.getElementById('root')
);
