export const REQUEST_NOTES = 'REQUEST_NOTES';
export const REQUEST_NOTE = 'REQUEST_NOTE';
export const REQUEST_DELETE_NOTE = 'REQUEST_DELETE_NOTE';
export const REQUEST_CREATE_NOTE = 'REQUEST_CREATE_NOTE';

export const requestNotes = ( json ) => {
	return {
		type: REQUEST_NOTES,
		notes: json
	};
};

export const requestNote = ( json ) => {
	return {
		type: REQUEST_NOTE,
		note: json.note
	};
};

export const requestDeleteNote = ( json ) => {
	return {
		type: REQUEST_DELETE_NOTE,
		note: json.note
	};
};

export const requestCreateNote = ( json ) => {
	return {
		type: REQUEST_CREATE_NOTE,
		note: json.note
	};
};

export function fetchNotes() {
	return dispatch => {
		dispatch( requestNotes() );
		return fetch( '/api/note/' )
			.then( response => response.json() )
			.then( json => dispatch( requestNotes( json ) ) );
		};
}

export function fetchNote( id ) {
	return dispatch => {
		dispatch( requestNote( id ) );
		return fetch( '/api/note/' + id )
			.then( response => response.json() )
			.then( json => dispatch( requestNote( json ) ) );
		};
}

export function deleteNote( id ) {
	return dispatch => {
		dispatch( requestDeleteNote( id ) );
		return fetch( '/api/note/' + id, { method: 'DELETE' } )
			.then( response => response.json() )
			.then( json => dispatch( requestDeleteNote( json ) ) );
		};
}

export function createNote( text ) {
	return dispatch => {
		dispatch( requestCreateNote( text ) );

		const formData = new FormData();
		formData.append('note', text);

		return fetch( '/api/note/', { method: 'POST', body: formData } )
			.then( response => response.json() )
			.then( json => dispatch( requestCreateNote( json ) ) );
		};
}
