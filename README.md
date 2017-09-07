Notes
-----
This application allows you to enter your own notes and save them for future use or modification. It uses React+Redux for the front-end and Express+SQLite for the back-end using GraphQL architecture.

I've written it to train my React and GraphQL skills. Tutorials: https://egghead.io/courses/getting-started-with-redux, https://www.howtographql.com/graphql-js/1-getting-started/.

Before running the server for the first time, run `npm install`.

To build the front-end, run `npm run build`.

Afterwards, run `npm start` to start the server.

API calls at http://localhost:8000/graphiql:
- Create a note:
```
mutation {
  createNote(description: "Hello!") {
    id
  }
}
- Delete a note:
```
mutation {
  deleteNote(id: 1)
}
```
- Update a note:
```
mutation {
  updateNote(id: 5, description: "Heya!") {
    id, description
  }
}
```
- Query notes:
```
{
  allNotes {
    id, description
  }
}
```

Short demo:
![Notes demo](https://raw.githubusercontent.com/bor0/notes/master/notes-demo.gif)

Boro Sitnikovski
