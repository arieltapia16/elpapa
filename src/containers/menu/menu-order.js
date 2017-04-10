import * as firebase from 'firebase';
import moment from 'moment';

export default function () {
  const object = firebase.database().ref();
  object.child('lastDay').on('value', function (snapshot) {
    const notWeekend = moment().format('dddd');
    if (notWeekend !== 'Saturday' && notWeekend !== 'Sunday') { // prevent add days on weekend
      const obj = snapshot.val();
      if (moment(obj.day).isBefore(moment().format('l'))) {
        if (obj.day !== "20") {
          var menu = +obj.menu + 1;
        } else{
          menu = 1;
        }

        object.child('lastDay').update({
          day: moment().format('l'),
          menu
        });
        object.child('daySelection').update({
          dinners: ''
        });
      }
    }
  });
}
