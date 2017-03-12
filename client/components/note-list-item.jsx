import React, { Component } from 'react';
import { fetchNote } from '../actions';
import { fetchNotes } from '../actions';
import { deleteNote } from '../actions';
import { connect } from 'react-redux';

class NoteListItem extends Component {
	handleFetchClick() {
		const { dispatch, id } = this.props;

		dispatch( fetchNote( id ) );
	}

	handleDeleteClick() {
		const { dispatch, id } = this.props;

		dispatch( deleteNote( id ) )
			.then( ( json ) => { if ( json.changes ) alert('Note deleted!') } )
			.then( () => dispatch( fetchNotes() ) );
		// TODO: Reset current note view
	}

	render() {
		const { id } = this.props;

		return (
			<div className='box'>
				<a href='#' onClick={ () => this.handleFetchClick() }>Note #{ id }</a>
				<a href='#' onClick={ () => this.handleDeleteClick() }><img src='images/delete.png' /></a>
			</div>
		);

	}
}

export default connect()( NoteListItem );
