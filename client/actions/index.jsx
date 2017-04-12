export const REQUEST_NOTES = 'REQUEST_NOTES';
export const REQUEST_NOTE = 'REQUEST_NOTE';
export const REQUEST_UPDATE_NOTE = 'REQUEST_UPDATE_NOTE';

export const requestNotes = ( json ) => {
	return {
		type: REQUEST_NOTES,
		notes: json,
	};
};

export const requestNote = ( json ) => {
	return {
		type: REQUEST_NOTE,
		id: json.id,
		note: json.note,
	};
};

export const requestUpdateNote = ( json ) => {
	return {
		type: REQUEST_UPDATE_NOTE,
		id: json.id,
		note: json.note,
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
			.then( json => {
				json.id = id;
				return dispatch( requestNote( json ) );
			} );
	};
}

export function deleteNote( id ) {
	return () => {
		return fetch( '/api/note/' + id, { method: 'DELETE' } )
			.then( response => response.json() );
	};
}

export function createNote( note ) {
	return () => {
		const formData = new FormData();
		formData.append( 'note', note );

		return fetch( '/api/note/', { method: 'POST', body: formData } )
			.then( response => response.json() );
	};
}

export function updateNote( note ) {
	return dispatch => {
		dispatch( requestUpdateNote( note ) );

		const formData = new FormData();
		formData.append( 'note', note.note );

		return fetch( '/api/note/' + note.id, { method: 'PUT', body: formData } )
			.then( response => response.json() );
	};
}
