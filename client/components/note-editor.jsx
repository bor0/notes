import React, { Component } from 'react';
import { fetchNote } from '../actions';
import { updateNote } from '../actions';
import { requestUpdateNote } from '../actions';
import { connect } from 'react-redux';

class NoteEditor extends Component {
	componentDidMount() {
		const { dispatch, id } = this.props;
		if ( id ) {
			dispatch( fetchNote( id ) ); // we can do this thanks to middleware
		}
	};

	handleSaveNoteClick() {
		const { note, id, dispatch } = this.props;

		if ( ! id ) return;

		dispatch( updateNote( { note, id } ) )
			.then( ( json ) => {
				if ( json.changes ) console.log( 'Note updated!' );
			} );
	}

	handleTextChange( e ) {
		const { dispatch, id } = this.props;
		dispatch( requestUpdateNote( { note: e.target.value, id } ) );
	}

	render() {
		const { note, id } = this.props || {};

		return (
			<div style={ { display: id ? '' : 'none' } }>
				<h3>{ id }</h3>
				<textarea value={ note } onChange={ ( e ) => this.handleTextChange( e ) } />
				<br />
				<a href="#" onClick={ () => this.handleSaveNoteClick() }><img src="images/save.png" /></a>
			</div>
		);
	};
}

const mapStateToProps = ( state ) => {
	const { id, note } = state.note || {};

	return { id, note };
};

export default connect( mapStateToProps )( NoteEditor );
