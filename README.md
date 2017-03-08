Notes
-----
This application allows you to enter your own notes and save them for future use or modification. It uses React+Redux for the front-end and Hapi+SQLite for the back-end.

I've written it to train my React skills.

It is heavily based on Allen's [Sorting-Hat](https://github.com/allendav/sorting-hat), and [WooCommerce Services](https://github.com/Automattic/woocommerce-services/).

To build the front-end, run `npm run build`.

Afterwards, run `npm start` to start the server.

API calls:
- Insert a note: `curl -d 'note=Hello Notes!' -X POST "http://localhost:8000/api/notes"`
- Modify a note: `curl -d 'note=Hello Notes!' -X PUT "http://localhost:8000/api/note/1"`
- List all notes: `curl "http://localhost:8000/api/notes"`
- Retrieve a single note: `curl "http://localhost:8000/api/note/1"`
- Delete a single note: `curl -X DELETE "http://localhost:8000/api/note/1"`

Boro Sitnikovski

March, 2017
