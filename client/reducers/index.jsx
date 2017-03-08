import { createStore, combineReducers } from 'redux';
import { REQUEST_NOTES, REQUEST_NOTE } from '../actions';

// Notes reducer
// jshint -W138
function notes( state = { notes: [] }, action ) {
	switch ( action.type ) {
		case REQUEST_NOTES:
			return Object.assign( {}, state, {
				notes: action.notes
			} );
		default:
			return state;
	}
}

function note( state = { note: '', id: null }, action ) {
	switch ( action.type ) {
		case REQUEST_NOTE:
			return Object.assign( {}, state, {
				note: action.note,
				id: action.id
			} );
		default:
			return state;
	}
}

const rootReducer = combineReducers( {
	notes,
	note
} );

export default rootReducer;
