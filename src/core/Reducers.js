import {combineReducers} from 'redux';
import SelectionsReducer from './reducers/Selection.reducer';
import ActiveSelectionReducer from './reducers/ActiveSelection.reducer';
import ModalReducer from './reducers/Modal.reducer';

const rootReducer = combineReducers({
  selections: SelectionsReducer,
  activeSelection: ActiveSelectionReducer,
  modal: ModalReducer
});

export default rootReducer;
