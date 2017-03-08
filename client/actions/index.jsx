export const REQUEST_NOTES = 'REQUEST_NOTES';
export const RECEIVE_NOTES = 'RECEIVE_NOTES';

export const requestNotes = () => {
	return {
		type: REQUEST_NOTES
	};
};

export const receiveNotes = ( json ) => {
	return {
		type: RECEIVE_NOTES,
		notes: json
	};
};

export function fetchNotes() {
	return dispatch => {
		dispatch( requestNotes() );
		return fetch( '/api/notes' )
			.then( response => response.json() )
			.then( json => dispatch( receiveNotes( json ) ) );
		};
}
