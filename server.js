const express = require('express');
const db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
const uuid =require('./uuid/uuid')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});



app.get("/api/notes", (req, res) => {
  res.json(db)
});

app.post("/api/notes", (req, res) => {

  fs.writeFileSync('db/db.json', JSON.stringify(db))

  res.json("new note")
})


// app.delete("/api/notes/:id", (req, res)=> {

// }
// )

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

// pulled from activity 17
// module.exports = () =>
//   Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);