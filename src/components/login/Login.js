import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {browserHistory} from 'react-router';
import * as firebase from 'firebase';

class App extends Component {
  constructor (props) {
    super();
    this.submitForm = this.submitForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.changePass = this.changePass.bind(this);
    this.state = {
      user: '',
      pass: ''
    };
  }
  changeUser (event) {
    this.setState({
      user: event.target.value
    });
  }
  changePass (event) {
    this.setState({
      pass: event.target.value
    });
  }
  submitForm () {
    const rootRef = firebase.database().ref().child('users');
    rootRef.orderByChild(this.state.user).on('value', (snapshot) => {
      let obj = snapshot.val();
      for (var e in obj) {
        if (obj[e].user === this.state.user) {
          if (obj[e].pass === this.state.pass) {
            const user = {
              logged: 'true',
              userName: this.state.user
            };
            localStorage.setItem('user', JSON.stringify(user));
            browserHistory.push('/dashboard');
          }
        }
      }
    });
  }
  render () {
    return (
      <div className='container-fluid login'>
        <div className='loginForm col-md-3 pull-right'>
          <form>
            <div className='form-group'>
              <label htmlFor='user'>Usuario</label>
              <input type='text' className='form-control' value={this.state.user} onChange={this.changeUser} id='user' placeholder='Nombre de Usuario' />
            </div>
            <div className='form-group'>
              <label htmlFor='pass'>Password</label>
              <input type='password' className='form-control' value={this.state.pass} onChange={this.changePass} id='pass' placeholder='Contraseña' />
            </div>
            <button type='button' className='btn btn-warning pull-right' onClick={this.submitForm}>Ingresar</button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
