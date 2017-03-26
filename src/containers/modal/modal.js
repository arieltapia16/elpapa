import React from 'react';
import {connect} from 'react-redux';
import {ModalState} from '../../actions'; // functions called actions
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

class Modal extends React.Component {
  constructor (props) {
    super();
    this.daySelection = this.daySelection.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    const userData = JSON.parse(localStorage.user); // eslint-disable-line
    this.state = {
      delivery: false,
      user: userData.userName
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
    const user = this.state.user;
    const selection = this.props.item.name;
    const menu = this.props.item.menu;
    const delivery = this.state.delivery;
    const obj = firebase.database().ref().child('daySelection').child('dinners');
    var exist = false;
    obj.orderByChild('user').equalTo(user).on('value', function (snapshot) {
      // console.log(snapshot.val());
      snapshot.forEach(function (data) {
        if (data.key) {
          exist = data.key;
        }
      });
    });
    if (exist) {
      obj.child(exist).update({
        user,
        selection,
        delivery,
        menu,
        date: Date.now()
      });
    } else {
      obj.push({
        user,
        selection,
        delivery,
        menu,
        date: Date.now()
      });
    }

    this.props.ModalState(false);
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
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                onClick={() => { this.props.ModalState(false); }}
                >Cerrar</button>
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
