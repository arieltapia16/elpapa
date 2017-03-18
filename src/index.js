import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './App';
import Login from './components/login/Login';
import './index.css';
import {Provider} from 'react-redux';// very important to connect all the aplication
import {createStore} from 'redux'; // create a store to store the reducers (REDUX)
import rootReducer from './reducers'; // The reducer root
import * as firebase from 'firebase';

var config = {
  apiKey: 'AIzaSyDmhyj7ZqeCxnFbr974CSvkiheTSfzfZmc',
  authDomain: 'el-papa-forever.firebaseapp.com',
  databaseURL: 'https://el-papa-forever.firebaseio.com',
  storageBucket: 'el-papa-forever.appspot.com',
  messagingSenderId: '5314079546'
};

firebase.initializeApp(config);
const store = createStore(rootReducer);

let userData = {logged: false};

if (localStorage.user) {
  userData = JSON.parse(localStorage.user); // eslint-disable-line
}
if (localStorage.admin) {
  adminData = JSON.parse(localStorage.admin); // eslint-disable-line
}

// <Provider> is use to wrap all the components and connect
ReactDOM.render(
  <Provider store={store} >
    <Router history={browserHistory}>
      <Route path='/' component={Login} />
      { userData.logged ? <Route path='dashboard' component={App} /> : browserHistory.push('/') }
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);
