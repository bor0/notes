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
			.then( ( json ) => {
				if ( json.changes ) console.log( 'Note deleted!' );
			} )
			.then( () => dispatch( fetchNotes() ) );
		// TODO: Reset current note view
	}

	render() {
		const { id } = this.props;

		return (
			<div className="box">
				<a href="#" onClick={ () => this.handleFetchClick() }>Note #{ id }</a>
				<a href="#" onClick={ () => this.handleDeleteClick() }><img src="images/delete.png" /></a>
			</div>
		);
	}
}

// We only want to have dispatch, so we don't need mapStateToProps.
export default connect()( NoteListItem );
