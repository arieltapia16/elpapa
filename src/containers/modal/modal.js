import React from 'react';
import {connect} from 'react-redux';
import {ModalState} from '../../actions'; // functions called actions
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';
import moment from 'moment';

class Modal extends React.Component {
  constructor (props) {
    super();
    this.daySelection = this.daySelection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const userData = JSON.parse(localStorage.user); // eslint-disable-line
    this.state = {
      delivery: false,
      user: userData.userName,
      selected: false,
      click: 0
    };
  }
  handleInputChange (event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  daySelection () {
    const today = moment().format('l');
    const user = this.state.user;
    const selection = this.props.item.name;
    const menu = this.props.item.menu;
    const delivery = this.state.delivery;
    const obj = firebase.database().ref().child('daySelection').child('dinners');
    var exist = false;
    let existArray = [];
    if (this.state.click === 0) {
      obj.orderByChild('user').equalTo(user).on('value', function (snapshot) {
        snapshot.forEach(function (data) {
          if (data.key) {
            exist = data.key;
            existArray.push(exist);
            console.log('exist', exist);
          }
        });
      });
      // console.log(existArray);
      if (exist) {
        existArray.map(function (e) {
          obj.child(e).remove().then(
            function () {
              console.log('borrado');
            }
          );
        });
      }
      obj.push({
        user,
        selection,
        delivery,
        menu,
        date: today
      });

      this.setState({
        selected: true
      });

      this.setState({click: this.state.click + 1});
    } else {
      this.props.ModalState(false);
      this.setState({selected: false});
      this.setState({click: 0});
    }
  }

  render () {
    if (!this.props.item) {
      return <div />;
    }
    return (
      <div className={this.props.modal ? 'display-modal modal' : 'modal'}>
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <button type='button' className='close' onClick={() => { this.props.ModalState(false); }}><span>&times;</span></button>
              <h4 className='modal-title'>Tu selección es:</h4>
            </div>
            <div className='modal-body'>
              {!this.state.selected
                ? <div>
                  <p>{this.props.item.name}</p>
                  <div className='checkbox'>
                    <label>
                      <input
                        name='delivery'
                        type='checkbox'
                        checked={this.state.isGoing}
                        onChange={this.handleInputChange}
                      /> Para llevar
                    </label>
                  </div>
                </div>
                : <div>Seleccionaste {this.props.item.name}</div>
              }
            </div>
            <div className='modal-footer'>
              {!this.state.selected
                ? <button
                  type='button'
                  className='btn btn-default'
                  onClick={() => { this.props.ModalState(false); }}
                  >Cancelar
                  </button> : ''
              }
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.daySelection}
                >OK</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    item: state.activeSelection,
    modal: state.modal
  };
}
function mapDispatchToProps (dispatch) {
  // Whenever selectMenuItem is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({ModalState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
