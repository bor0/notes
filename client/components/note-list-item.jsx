import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class NoteListItem extends Component {
	render() {
		const { id, fetchHandler, deleteHandler } = this.props;

		return (
			<div className="box">
				<a href="#" onClick={ () => fetchHandler( id ) }>Note #{ id }</a>
				<a href="#" onClick={ () => deleteHandler( id ) }><img src="images/delete.png" /></a>
			</div>
		);
	}
}

NoteListItem.propTypes = {
	id: PropTypes.number.isRequired,
	fetchHandler: PropTypes.func.isRequired,
	deleteHandler: PropTypes.func.isRequired,
};

export default NoteListItem;
