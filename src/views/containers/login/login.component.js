import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import logo from '../../../assets/img/logo.png';

import * as firebase from 'firebase';

class App extends Component {
  constructor (props) {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.state = {
      user: '',
      pass: '',
      invalidCredentials: false
    };
  }
  changeUser (event) {
    this.setState({
      invalidCredentials: false,
      user: event.target.value
    });
  }
  changePass (event) {
    this.setState({
      invalidCredentials: false,
      pass: event.target.value
    });
  }
  submitForm (e) {
    e.preventDefault();
    const rootRef = firebase.database().ref().child('users');
    rootRef.orderByChild(this.state.user).on('value', (snapshot) => {
      let obj = snapshot.val();
      for (var e in obj) {
        if (obj[e].user === this.state.user) {
          if (obj[e].pass === this.state.pass) {
            const user = {
              logged: 'true',
              userName: this.state.user,
              showName: obj[e].name
            };
            sessionStorage.setItem('user', JSON.stringify(user));
            browserHistory.push('/dashboard');
            window.location.reload();
          } else {
            this.setState({
              invalidCredentials: true
            });
          }
        }
      }
    });
  }
  render () {
    return (
      <div className='container-fluid login'>
        <div className='loginForm text-center'>
          <img src={logo} alt="logo"/>
          <form>
            <input type='text' className='form-control' value={this.state.user} onChange={this.changeUser} id='user' placeholder='Nombre de Usuario' />
            <input type='password' className='form-control' value={this.state.pass} onChange={this.changePass} id='pass' placeholder='Contraseña' />
            {this.state.invalidCredentials ? <p>Usuario o contraseña incorrectos</p> : ''}
            <button className='btn btn-block' onClick={this.submitForm}>Ingresar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
