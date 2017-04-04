import React from 'react';
import SpecialItem from './special-item';
import Modal from '../modal/modal';
import ItemList from './item-list';

export default class Menu extends React.Component {
  render () {
    return (
      <div>
        { /*  <SpecialItem />*/ }
        <ItemList />
        <Modal />
      </div>
    );
  }
}
