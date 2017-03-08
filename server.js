require('babel-register')({
	presets: ['es2015', 'react'],
});

var Hapi = require('hapi');
var api = require('./api');

// Basic Hapi.js connection stuff
var server = new Hapi.Server();
server.connection({
	host: 'localhost',
	port: 8000
});

// Register the inert and vision Hapi plugins
// As of Hapi 9.x, these two plugins are no longer
// included in Hapi automatically
// https://github.com/hapijs/hapi/issues/2682
server.register([{
	register: require('inert')
}, {
	register: require('vision')
}], function(err) {

	if (err) return console.error(err);

	// Add the React-rendering view engine
	server.views({
		engines: {
			jsx: require('hapi-react-views')
		},
		relativeTo: __dirname,
		path: 'views'
	});

	// Add a route for retrieving all notes ids
	server.route({
		method: 'GET',
		path: '/api/notes',
		handler: function( request, reply ) {
			api.getNotes( request, reply );
		}
	});

	// Add a route for retrieving a single note
	server.route({
		method: 'GET',
		path: '/api/note/{id}',
		handler: function( request, reply ) {
			api.getNote( request, reply );
		}
	});

	// Add a route for deleting a single note
	server.route({
		method: 'DELETE',
		path: '/api/note/{id}',
		handler: function( request, reply ) {
			api.deleteNote( request, reply );
		}
	});

	// Add a route for modifying a single note
	server.route({
		method: 'PUT',
		path: '/api/note/{id}',
		handler: function( request, reply ) {
			api.modifyNote( request, reply );
		}
	});

	// Add a route for creating a note
	server.route({
		method: 'POST',
		path: '/api/notes',
		handler: function( request, reply ) {
			api.addNote( request, reply );
		}
	});

	// Add a route to serve static assets (CSS, JS, IMG)
	server.route({
		method: 'GET',
		path: '/{param*}',
		handler: {
			directory: {
				path: 'assets',
				index: ['index.html']
			}
		}
	});

	// Add main app route
	server.route({
		method: 'GET',
		path: '/',
		handler: {
			view: 'default'
		}
	});

	server.start(function() {
		console.log('Server started at: ' + server.info.uri);
	});
});
