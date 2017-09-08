export const REQUEST_NOTES = 'REQUEST_NOTES';
export const REQUEST_NOTE = 'REQUEST_NOTE';
export const REQUEST_UPDATE_NOTE = 'REQUEST_UPDATE_NOTE';

import ApolloClient, { createNetworkInterface } from 'apollo-client';
import gql from 'graphql-tag';

const client = new ApolloClient( {
	networkInterface: createNetworkInterface( {
		uri: 'http://localhost:8000/graphql',
	} ),
	connectToDevTools: true,
} );

export const requestNotes = ( notes ) => {
	return {
		type: REQUEST_NOTES,
		notes,
	};
};

export const requestNote = ( note ) => {
	return {
		type: REQUEST_NOTE,
		id: note.id,
		description: note.description,
	};
};

export const requestUpdateNote = ( note ) => {
	return {
		type: REQUEST_UPDATE_NOTE,
		id: note.id,
		description: note.description,
	};
};

export function fetchNotes() {
	return dispatch => {
		const query = gql`
		{
		  allNotes {
		    id
		  }
		}
		`;

		dispatch( requestNotes() );
		// TODO: Figure out why caching doesn't work
		return client.query( { query, cachePolicy: 'no-cache' } )
			.then( data => dispatch( requestNotes( data.data.allNotes.map( item => ( {
				id: parseInt( item.id ),
			} ) ) ) ) );
	};
}

export function fetchNote( id ) {
	return dispatch => {
		const query = gql`
		{
		  allNotes( id: ${id} ) {
		    id, description
		  }
		}
		`;

		dispatch( requestNote( id ) );
		return client.query( { query } )
			.then( data => dispatch( requestNote( data.data.allNotes.map( item => ( {
				id: parseInt( item.id ),
				description: item.description,
			} ) )[ 0 ] ) ) );
	};
}

export function deleteNote( id ) {
	return () => {
		const mutation = gql`
		mutation {
		  deleteNote( id: "${id}" )
		}
		`;

		return client.mutate( { mutation } )
			.then( data => ( {
				changes: data.data.deleteNote,
			} ) );
	};
}

export function createNote( description ) {
	return () => {
		const mutation = gql`
		mutation {
		  createNote( description: "${description}" ) {
		    id, description
		  }
		}
		`;

		return client.mutate( { mutation } )
			.then( data => ( {
				id: parseInt( data.data.createNote.id ),
				description: data.data.createNote.description,
			} ) );
	};
}

export function updateNote( note ) {
	return dispatch => {
		const mutation = gql`
		mutation {
		  updateNote( id: ${note.id}, description: "${note.description}" ) {
		    id, description
		  }
		}
		`;

		dispatch( requestUpdateNote( note ) );
		return client.mutate( { mutation } )
			.then( data => ( {
				changes: data.data.updateNote.id ? true : false,
			} ) );
	};
}
