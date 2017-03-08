import { createStore, combineReducers } from 'redux';
import { REQUEST_NOTES, RECEIVE_NOTES } from '../actions';

// Notes reducer
// jshint -W138
function notes( state = { isFetching: false, notes: [] }, action ) {
	switch ( action.type ) {
		case REQUEST_NOTES:
			return Object.assign( {}, state, {
				isFetching: true
			} );
		case RECEIVE_NOTES:
			return Object.assign( {}, state, {
				isFetching: false,
				notes: action.notes
			} );
		default:
			return state;
	}
}

const rootReducer = combineReducers( {
	notes
} );

export default rootReducer;
