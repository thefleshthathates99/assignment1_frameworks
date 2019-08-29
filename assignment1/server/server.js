const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const sockets = require('./socket.js');
const server = require('./listen.js');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/routes'));

app.use(cors());


sockets.connect(io,PORT);


server.listen(http,PORT);

app.get('/', (req,res)=> {
  res.send('Welcome to Node API')
})

app.post('/postData', bodyParser.json(), (req, res) => {

    res.json(req.body)
})

app.post('/saveData', require('./routes/saveData'));

app.post('/saveGroup', require('./routes/saveGroup'));
