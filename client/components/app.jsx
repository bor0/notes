import React, { Component } from 'react';
import NoteList from './note-list';
import NoteEditor from './note-editor';

const App = () => {
	return (
		<div>
			<div id='left'>
				<NoteList />
			</div>

			<div id='right'>
				<NoteEditor />
			</div>
		</div>
	);

};

export default App;
