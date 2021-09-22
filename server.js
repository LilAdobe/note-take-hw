const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./uuid/uuid')


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/api/notes", (req, res) => {
  fs.readFile('./db/db.json', 'utf8',
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedNote = JSON.parse(data);

        res.json(parsedNote)
      }
    }
  )
});


//act 20 server app.post
app.post("/api/notes", (req, res) => {
  const { title, text } = req.body;
  try {

    const note = {
      title,
      text,
      note_id: uuid(),
    };
    fs.readFile('./db/db.json', 'utf8',
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          const parsedNote = JSON.parse(data);
          console.log(parsedNote)
          parsedNote.push(note);

          fs.writeFileSync('./db/db.json', JSON.stringify(parsedNote))

          res.json("new note")
        }
      }
    )
  } catch (err) {
    console.log(err)
  }
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



// app.delete("/api/notes/:id", (req, res)=> {

// }
// )


// pulled from activity 17
// module.exports = () =>
//   Math.floor((1 + Math.random()) * 0x10000)
//     .toString(16)
//     .substring(1);