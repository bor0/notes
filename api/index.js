var sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('notes.db');

db.serialize(function() {
	db.run('CREATE TABLE IF NOT EXISTS notes (note TEXT)');
});

module.exports = {
	getNotes: function( request, reply ) {
		db.all('SELECT rowid AS id FROM notes', function(err, rows) {
			reply(rows);
		});
	},
	getNote: function( request, reply ) {
		db.all('SELECT rowid AS id, note FROM notes WHERE rowid = ?', request.params.id, function(err, rows) {
			reply(rows);
		});
	},
	deleteNote: function( request, reply ) {
		db.run('DELETE FROM notes WHERE rowid = ?', request.params.id);
		reply();
	},
	addNote: function( request, reply ) {
		db.run('INSERT INTO notes VALUES (?)', request.payload.note, function() {
			reply({id: this.lastID});
		});
	},
	modifyNote: function( request, reply ) {
		db.run('UPDATE notes SET note = ? WHERE rowid = ?', [request.payload.note, request.params.id], function() {
			reply({changes: this.changes});
		});
	}
};
