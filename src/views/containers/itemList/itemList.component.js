import React, {Component} from 'react';
import { connect } from 'react-redux';
import {ModalState} from '../../../core/actions/Modal.action';
import {selectMenuItem} from '../../../core/actions/Selection.action';
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';
import menuOrder from './firebase-connection';

class ItemList extends Component {
  constructor () {
    super();
    this.state = {
      dayMenu: '',
      dayArray: []
    };
  }
  componentWillMount () {
    menuOrder();

    firebase.database().ref().child('lastDay').child('menu').on('value', (snapshot) => {
      const dayMenu = snapshot.val();
      firebase.database().ref().child('dias').child(dayMenu).child('items').on('value', (day) => {
        let array = [];
        day.val().forEach(function (e) {
          array.push(e);
        });
        this.setState({
          dayArray: array
        });
      });
    });
  }
  renderList () {
    let colSize = 'col-md-12';
    if (this.state.dayArray.length > 1) {
      colSize = 'col-md-6';
    }
    return this.state.dayArray.map((item, i) => {
      return (
        <a
          key={i}
          className={colSize + ' img-container text-center'}
          onClick={() => { this.props.selectMenuItem(item); this.props.ModalState(true); }}
          >
          <p>{item.name}</p>
          <img className='imgMenu' alt='' src={item.img ? require('../../../assets/itemPhotos/' + item.img) : ''} width='90%' />
        </a>
      );
    });
  }
  render () {
    return (
      <div className='menuSelection'>
        {this.renderList()}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    selections: state.selections
  };
}
// Anything returned from this function will end up as props
// on the BookList container
function mapDispatchToProps (dispatch) {
  // Whenever selectMenuItem is called, the result should be passed
  // to all of our reducers
  return bindActionCreators({selectMenuItem, ModalState}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);
