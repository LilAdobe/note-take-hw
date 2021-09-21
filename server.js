const express = require('express');
//const index = require('./routes/html');
const apiR = require('./routes/api');
const htmlR = require ('./routes/html')

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.use(apiR);
app.use(htmlR);





// app.get('/', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/index.html'))
// );

// app.get('/feedback', (req, res) =>
//   res.sendFile(path.join(__dirname, '/public/notes.html/feedback.html'))
// );

// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, 'public/pages/404.html'))
// ); NOT sure if needed

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
