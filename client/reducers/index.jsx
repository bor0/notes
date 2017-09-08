import { combineReducers } from 'redux';
import { REQUEST_NOTES, REQUEST_NOTE, REQUEST_UPDATE_NOTE } from '../actions';

// We define these reducers (note, notes) to be later used by mapStateToProps for the NoteEditor and the NoteList.

// List of notes reducer
const notes = ( state = { notes: [] }, action ) => {
	switch ( action.type ) {
		case REQUEST_NOTES:
			return Object.assign( {}, state, {
				notes: action.notes,
			} );
		default:
			return state;
	}
};

// Read reducer
const note = ( state = { description: '', id: null }, action ) => {
	switch ( action.type ) {
		case REQUEST_UPDATE_NOTE:
		case REQUEST_NOTE:
			return Object.assign( {}, state, {
				description: action.description,
				id: action.id,
			} );
		default:
			return state;
	}
};

const rootReducer = combineReducers( {
	notes,
	note,
} );

export default rootReducer;
