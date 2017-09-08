var sqlite3 = require( 'sqlite3' ).verbose();

var db = new sqlite3.Database( 'notes.db' );

db.serialize( () => {
	db.run( 'CREATE TABLE IF NOT EXISTS notes (description TEXT)' );
} );

var getNotes = ( data ) => {
	return new Promise( ( resolve, reject ) => {
		let where = data.id ? ' WHERE id = ' + data.id : '';

		db.all( 'SELECT rowid AS id, * FROM notes' + where, ( err, rows ) => {
			if ( err ) {
				reject( err );
			} else {
				resolve( rows );
			}
		} );
	} );
};

var createNote = ( data ) => {
	return new Promise( ( resolve, reject ) => {
		var dataKeys = Object.keys( data ).join( "','" );
		var dataValues = Object.values( data ).join( "','" );

		dataKeys = "'" + dataKeys + "'";
		dataValues = "'" + dataValues + "'";

		db.run( 'INSERT INTO notes (' + dataKeys + ') VALUES (' + dataValues + ')', function( err ) {
			if ( err ) {
				reject( err );
			} else {
				data.id = this.lastID;
				resolve( data );
			}
		} );
	} );
}

var deleteNote = ( data ) => {
	return new Promise( ( resolve, reject ) => {
		db.run( 'DELETE FROM notes WHERE rowid = ?', data.id, function( err ) {
			if ( err ) {
				reject( err );
			} else {
				resolve( !! this.changes );
			}
		} );
	} );
}

var updateNote = ( data ) => {
	return new Promise( ( resolve, reject ) => {
		var setKeys = Object.keys( data )
		.filter( ( key ) => key !== 'id' )
		.map( ( key ) => {
			return key + ' = ' + "'" + data[ key ] + "'";
		} );

		db.run( 'UPDATE notes SET ' + setKeys.join( ',' ) + ' WHERE rowid = ?', data.id, function( err ) {
			if ( err ) {
				reject( err );
			} else {
				resolve( data );
			}
		} );
	} );
}

module.exports = {
	Query: {
		allNotes: async ( _, data ) => await getNotes( data ),
	},
	Mutation: {
		createNote: async ( _, data ) => await createNote( data ),
		deleteNote: async ( _, data ) => await deleteNote( data ),
		updateNote: async ( _, data ) => await updateNote( data ),
	},
};
