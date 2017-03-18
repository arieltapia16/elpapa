import React from 'react';
import {connect} from 'react-redux';
import {ModalState} from '../../actions'; // functions called actions
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

class Modal extends React.Component {
  constructor (props) {
    super();
    this.daySelection = this.daySelection.bind(this);
    const userData = JSON.parse(localStorage.user); // eslint-disable-line
    this.state = {
      user: userData.userName
    };
  }

  daySelection () {
    const obj = firebase.database().ref();
    obj.update({
      'daySelection': {
        user: this.state.user,
        selection: this.props.item.name
      }
    });
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
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-default'
                onClick={() => { this.props.ModalState(false); }}
                >Close</button>
              <button
                type='button'
                className='btn btn-primary'
                onClick={this.daySelection}
                >Save changes</button>
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
