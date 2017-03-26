import React, {Component} from 'react';
import { connect } from 'react-redux';
import {selectMenuItem, ModalState} from '../../actions'; // functions called actions
import {bindActionCreators} from 'redux';
import * as firebase from 'firebase';

class ItemList extends Component {
  constructor () {
    super();
    this.state = {
      dayArray: []
    };
  }
  componentWillMount () {
    firebase.database().ref().child('dias').child('2').child('items').on('value', (day) => {
      let array = [];
      day.val().forEach(function (e) {
        array.push(e);
      });
      this.setState({
        dayArray: array
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
          className={colSize + ' img-container'}
          onClick={() => { this.props.selectMenuItem(item); this.props.ModalState(true); }}
          >
          <p>{item.name}</p>
          <img className='imgMenu' alt='' src={item.img ? require(item.img) : ''} width='100%' />
        </a>
      );
    });
  }
  render () {
    return (
      <div>
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
