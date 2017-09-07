const { makeExecutableSchema } = require( 'graphql-tools' );
const resolvers = require( './resolvers' );

// Define your types here.
const typeDefs = `
  type Note {
    id: ID!
    description: String!
  }

  type Query {
    allNotes: [Note!]!
  }

  type Mutation {
    createNote(description: String!): Note!
    deleteNote(id: ID!): Boolean!
    updateNote(id: ID!, description: String!): Note
  }
`;

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema( { typeDefs, resolvers } );
