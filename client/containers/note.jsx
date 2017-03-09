import React, { Component } from 'react';
import { fetchNote } from '../actions';
import { updateNote } from '../actions';
import { requestUpdateNote } from '../actions';
import { connect } from 'react-redux';

class Note extends Component {
	componentDidMount() {
		const { dispatch, id } = this.props;
		if ( id ) {
			dispatch( fetchNote( id ) ); // we can do this thanks to middleware
		}
	};

	handleSaveNoteClick( note ) {
		const { id, dispatch } = this.props;

		if ( ! id ) return;

		dispatch( updateNote( note ) )
			.then( ( json ) => { if ( json.changes ) alert('Note updated!') } );
	}

	handleTextChange( e ) {
		const { dispatch, id } = this.props
		dispatch( requestUpdateNote( { note: e.target.value, id: id } ) );
	}

	render() {
		const note = this.props || {};

		return (
			<div>
				<textarea value={ note.note } onChange={ (e) => this.handleTextChange(e) } />
				<a href='#' onClick={ (e) => this.handleSaveNoteClick( note ) }><img src='images/save.png' /></a>
			</div>
		);
	};
}

function mapStateToProps( state ) {
	const { id, note } = state.note || [];

	return {
		id: id,
		note: note
	};
};

export default connect( mapStateToProps )( Note );
