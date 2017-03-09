import React, { Component } from 'react';
import { fetchNotes } from '../actions';
import { fetchNote } from '../actions';
import { connect } from 'react-redux';

class NotesList extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	handleClick( e ) {
		const { dispatch } = this.props;
		dispatch( fetchNote( e.currentTarget.dataset.id ) );
	}

	render() {
		const notes = this.props.notes || [];

		return (
			<div>
				<div className='box' key='create'><a href='#'>Create Note</a></div>
				<div className='borderless-box'>List of Notes:</div>
				{
					notes.map( note => (
						<div className='box' key={ note.id }><a href='#' data-id={ note.id } onClick={ (e) => this.handleClick( e ) }>Note #{ note.id }</a></div>
					) )
				}
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
