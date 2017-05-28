import React, { Component } from 'react';

import Header from '../../components/header/header.component';

import * as firebase from 'firebase';

export default class MenuMonth extends Component {
  constructor (props) {
    super();
    this.state = {
      days: []
    };

  }
  componentWillMount () {
    const rootRef = firebase.database().ref().child('dias');
    rootRef.on('value', (snapshot) => {
      this.setState({
        days: snapshot.val()
      });
    });
  }


  render () {
    let daysArray = [];
    let DayNumber = 0;

    var obj = this.state.days;
    for (var e in obj) {
      if (obj[e]) {
        daysArray.push(obj[e]);
      }
    }
    const menues = daysArray.map((e, i) => {
      DayNumber++;
      if (e.items.length === 1) {
        e.items.push({
          name: '',
          img: ''
        });
      }
      // console.log('../../containers/menu/itemPhotos/' + e.items[0].img);return;
      const dayMenu =
        <tr key={i}>
          <td>{DayNumber}</td>
          <td>{e.items[0].name}</td>
          <td><img alt="optionOne" src={e.items[0].img ? require('../../../assets/itemPhotos/' + e.items[0].img) : ''} width='100px' /></td>
          <td>{e.items[1].name}</td>
          <td><img alt="optionTwo" src={e.items[1].img ? require('../../../assets/itemPhotos/' + e.items[1].img) : ''} width='100px' /></td>
        </tr>;

      return dayMenu;
    }
    );
    return (
      <div>
        <Header />
        <div className='col-md-12'>
            <h3>Menues</h3>
            <table className='table table-striped'>
              <thead>
                <tr><th>Dia</th><th>Menu comun</th><th>Imagen</th><th>Menu Light</th><th>Imagen</th></tr>
              </thead>
              <tbody>
                {menues}
              </tbody>
            </table>
        </div>
      </div>
    );
  }
}
