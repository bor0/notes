import React, { Component } from 'react';
import { fetchNote } from '../actions';
import { connect } from 'react-redux';

class Note extends Component {
	componentDidMount() {
		const { dispatch, id } = this.props;
		if ( id ) {
			dispatch( fetchNote( id ) ); // we can do this thanks to middleware
		}
	};

	render() {
		const note = this.props || {};

		return (
			<textarea value={ note.note } />
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
