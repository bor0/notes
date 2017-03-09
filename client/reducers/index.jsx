import { createStore, combineReducers } from 'redux';
import { REQUEST_NOTES, REQUEST_NOTE, REQUEST_DELETE_NOTE, REQUEST_CREATE_NOTE, REQUEST_UPDATE_NOTE } from '../actions';

// list of notes reducer
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

// read reducer
function note( state = { note: '', id: null }, action ) {
	switch ( action.type ) {
		case REQUEST_UPDATE_NOTE:
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
