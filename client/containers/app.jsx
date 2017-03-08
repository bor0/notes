import React, { Component } from 'react';
import { fetchNotes } from '../actions';
import { connect } from 'react-redux';

class App extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	render() {
		const { notes, isFetching } = this.props;

		return (
			<div>
				{ notes.map( (note) => "Hi " + note.id ) }
			</div>
		);
	};
}

function mapStateToProps( state ) {
	const { isFetching, notes } = state.notes || { isFetching: true, notes: [] };

	return {
		isFetching: isFetching,
		notes: notes
	};
};

export default connect( mapStateToProps )( App );
