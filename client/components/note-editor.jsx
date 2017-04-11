import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class NoteEditor extends Component {
	render() {
		const { note, id, textChangeHandler, updateHandler } = this.props || {};

		return (
			<div style={ { display: id ? '' : 'none' } }>
				<h3>{ id }</h3>
				<textarea value={ note } onChange={ ( e ) => textChangeHandler( id, e.target.value ) } />
				<br />
				<a href="#" onClick={ () => updateHandler() }><img src="images/save.png" /></a>
			</div>
		);
	};
}

NoteEditor.propTypes = {
	textChangeHandler: PropTypes.func.isRequired,
	updateHandler: PropTypes.func.isRequired,
};

export default NoteEditor;
