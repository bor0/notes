import React, { Component } from 'react';
import { fetchNotes } from '../actions';
import { connect } from 'react-redux';

class NotesList extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	render() {
		const notes = this.props.notes || [];

		return (
			<div>
				{ notes.map( (note) => "Hi " + note.id ) }
			</div>
		);
	};
}

function mapStateToProps( state ) {
	const { notes } = state.notes || [];

	return {
		notes: notes
	};
};

export default connect( mapStateToProps )( NotesList );
