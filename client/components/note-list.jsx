import React, { Component } from 'react';
import NoteListItem from './note-list-item';
import { PropTypes } from 'prop-types';

class NoteList extends Component {
	render() {
		const { notes, fetchHandler, deleteHandler, createHandler, reloadHandler } = this.props;

		return (
			<div>
				<div className="box">
					<a href="#" onClick={ () => createHandler() }>Create Note</a>
				</div>

				<div className="borderless-box">
					<a href="#" onClick={ () => reloadHandler() }><img src="images/reload.png" /></a>
				</div>

				<div className="borderless-box">
					List of Notes:
				</div>
				{
					notes.map( note => <NoteListItem id={ note.id } key={ note.id } fetchHandler={ fetchHandler( note.id ) } deleteHandler={ () => deleteHandler( note.id ) } /> )
				}
			</div>
		);
	};
}

NoteList.propTypes = {
	notes: PropTypes.array.isRequired,
	fetchHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
	createHandler: PropTypes.func.isRequired,
	reloadHandler: PropTypes.func.isRequired,
};

export default NoteList;
