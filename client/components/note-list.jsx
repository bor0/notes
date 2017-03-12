import React, { Component } from 'react';
import NoteListItem from './note-list-item';
import { fetchNotes } from '../actions';
import { createNote } from '../actions';
import { connect } from 'react-redux';

class NoteList extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	handleCreateNoteClick( e ) {
		const { dispatch } = this.props;
		dispatch( createNote( 'Hello! This is an example note!' ) )
			.then( ( json ) => { if ( json.id ) alert( 'Note created!' ) } )
			.then( () => dispatch( fetchNotes() ) );
	}

	render() {
		const notes = this.props.notes || [];

		return (
			<div>
				<div className='box'>
					<a href='#' onClick={ ( e ) => this.handleCreateNoteClick( e ) }>Create Note</a>
				</div>
				<div className='borderless-box'>
					<a href='#' onClick={ ( e ) => this.componentDidMount() }><img src='images/reload.png' /></a>
				</div>
				<div className='borderless-box'>
					List of Notes:
				</div>
				{
					notes.map( note => <NoteListItem id={ note.id } key={ note.id } /> )
				}
			</div>
		);
	};
}

// This gets called for every dispatch.
const mapStateToProps = ( state ) => {
	const { notes } = state.notes || [];

	return { notes };
};

export default connect( mapStateToProps )( NoteList );
