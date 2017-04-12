import React, { Component } from 'react';
import NoteList from '../components/note-list';
import NoteEditor from '../components/note-editor';
import { fetchNotes, fetchNote, createNote, deleteNote, updateNote, requestUpdateNote } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	handleNoteFetchClick( dispatch, id ) {
		dispatch( fetchNote( id ) );
	};

	handleNoteDeleteClick( dispatch, id ) {
		dispatch( deleteNote( id ) )
			.then( ( json ) => {
				if ( json.changes ) console.log( 'Note deleted!' );
			} )
			.then( () => dispatch( fetchNotes() ) );
		// TODO: Reset current note view
	};

	handleNoteCreateClick( dispatch ) {
		dispatch( createNote( 'Hello! This is an example note!' ) )
			.then( ( json ) => {
				if ( json.id ) console.log( 'Note created!' );
			} )
			.then( () => dispatch( fetchNotes() ) );
	};

	handleNoteUpdateClick( dispatch, id, note ) {
		if ( ! id ) return;

		dispatch( updateNote( { note, id } ) )
			.then( ( json ) => {
				if ( json.changes ) console.log( 'Note updated!' );
			} );
	}

	handleTextChange( dispatch, id, note ) {
		dispatch( requestUpdateNote( { note, id } ) );
	}

	render() {
		const { dispatch } = this.props;
		const { notes } = this.props;
		const { note, id } = this.props.note || {};

		return (
			<div>
				<div id="left">
					<NoteList
						notes={ notes }
						fetchHandler={ ( noteId ) => this.handleNoteFetchClick( dispatch, noteId ) }
						deleteHandler={ ( noteId ) => this.handleNoteDeleteClick( dispatch, noteId ) }
						createHandler={ () => this.handleNoteCreateClick( dispatch ) }
						reloadHandler={ () => this.componentDidMount() }
					/>
				</div>

				<div id="right">
					<NoteEditor
						id={ id }
						note={ note }
						updateHandler={ ( noteId, noteValue ) => this.handleNoteUpdateClick( dispatch, noteId, noteValue ) }
						textChangeHandler={ ( noteId, noteValue ) => this.handleTextChange( dispatch, noteId, noteValue ) }
					/>
				</div>
			</div>
		);
	}
};

// This gets called for every dispatch.
const mapStateToProps = ( state ) => {
	const notes = state.notes.notes || [];
	const { id, note } = state.note || {};

	return { notes, note: { id, note } };
};

export default connect( mapStateToProps )( App );
