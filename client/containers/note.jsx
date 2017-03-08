import React, { Component } from 'react';
import { fetchNote } from '../actions';
import { connect } from 'react-redux';

class Note extends Component {
	componentDidMount() {
		const { dispatch, id } = this.props;
		dispatch( fetchNote( id ) ); // we can do this thanks to middleware
	};

	render() {
		const note = this.props || {};

		return (
			<div>
				<input type="hidden" name="note-id" value={ note.id } />
				<textarea value={ note.note } />
			</div>
		);
	};
}

function mapStateToProps( state ) {
	const { note } = state.note || [];

	return {
		note: note
	};
};

export default connect( mapStateToProps )( Note );
