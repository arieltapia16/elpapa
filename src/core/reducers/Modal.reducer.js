export default function (state = null, action) {
  switch (action.type) {
    case 'STATE_SELECTED':
      return (action.payload);
    default : null; // eslint-disable-line
  }
  return state;
}
