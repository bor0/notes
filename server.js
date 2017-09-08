const express = require( 'express' );

// This package automatically parses JSON requests.
const bodyParser = require( 'body-parser' );

// This package will handle GraphQL server requests and responses
// for you, based on your schema.
const { graphqlExpress, graphiqlExpress } = require( 'apollo-server-express' );

const schema = require( './schema' );

const PORT = 8000

var app = express();

app.use( '/graphql', bodyParser.json(), graphqlExpress( { schema } ) );
app.use( '/graphiql', graphiqlExpress( { endpointURL: '/graphql', } ) );

app.use( express.static( 'assets' ) )

app.set( 'views', __dirname + '/views' );
app.set( 'view engine', 'jsx' );
app.engine( 'jsx', require( 'express-react-views' ).createEngine());

app.get( '/', ( req, res ) => {
	res.render( 'default' );
} );

app.listen( PORT, () => {
	console.log( `Server started at ${PORT}.` )
} );
