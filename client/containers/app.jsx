import React, { Component } from 'react';
import NotesList from './notes-list';
import Note from './note';

export default class App extends Component {
	render() {
		return (
			<div>
				<div id='left'>
					<NotesList />
				</div>

				<div id='right'>
					<Note />
				</div>
			</div>
		);
	};
}
