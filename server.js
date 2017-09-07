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

app.listen( PORT, () => {
	console.log( `Server started at ${PORT}.` )
} );
