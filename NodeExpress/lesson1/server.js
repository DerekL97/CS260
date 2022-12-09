const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// const express = require('express');
// const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// app.post('/', (req, res) => {
//   res.send('Here is the response to your POST, man!\n');
// });
  
// app.put('/', (req, res) => {
// res.send('I am updated.\n');
// });
  
// app.delete('/', (req, res) => {
//   res.send('All my memories have been deleted. Are you happy now?\n');
// });

// app.get('/secret', (req, res) => {
//   res.send('Psst. You are being watched.\n');
// });

// app.get('/api/user/1', (req, res) => {
//   res.send({
//     name: "Amy Caprietti",
//     avatar: "/avatars/supergirl.jpg",
//     role: "admin"
//   });
// });

// app.listen(3000, () => console.log('Server listening on port 3000!'));