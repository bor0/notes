import React, { Component } from 'react';
import NotesList from './notes-list';
import Note from './note';

const App = () => {
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

export default App;
