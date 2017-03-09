import React, { Component } from 'react';
import { fetchNotes } from '../actions';
import { fetchNote } from '../actions';
import { deleteNote } from '../actions';
import { connect } from 'react-redux';

class NotesList extends Component {
	componentDidMount() {
		const { dispatch } = this.props;
		dispatch( fetchNotes() ); // we can do this thanks to middleware
	};

	handleFetchClick( e ) {
		const { dispatch } = this.props;
		dispatch( fetchNote( e.currentTarget.dataset.id ) );
	}

	handleDeleteClick( e ) {
		const { dispatch } = this.props;
		dispatch( deleteNote( e.currentTarget.dataset.id ) );
		dispatch( fetchNotes() );
		// TODO: Reset current note view
	}

	render() {
		const notes = this.props.notes || [];

		return (
			<div>
				<div className='box' key='create'><a href='#'>Create Note</a></div>
				<div className='borderless-box'>List of Notes:</div>
				{
					notes.map( note => (
						<div className='box' key={ note.id }>
							<a href='#' data-id={ note.id } onClick={ (e) => this.handleFetchClick( e ) }>Note #{ note.id }</a>
							<a href='#' data-id={ note.id } onClick={ (e) => this.handleDeleteClick( e ) }><img src='images/delete.png' /></a>
						</div>
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
