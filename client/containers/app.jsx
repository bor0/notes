import React from 'react';
import NoteList from '../components/note-list';
import NoteEditor from '../components/note-editor';

const App = () => {
	return (
		<div>
			<div id="left">
				<NoteList />
			</div>

			<div id="right">
				<NoteEditor />
			</div>
		</div>
	);
};

export default App;
