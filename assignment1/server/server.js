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
const MongoClient = require('mongodb').MongoClient;  // require MongoClient functionality
var  ObjectID = require('mongodb').ObjectID;


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/routes'));

app.use(cors());


sockets.connect(io,PORT);


server.listen(http,PORT);

const url = 'mongodb://localhost:27017';
MongoClient.connect(url, {poolSize:15,useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
    //Callback function code. When we have a connection start the rest of the app.
    if (err) {return console.log(err)}
        const dbName = 'assignment';
        const db = client.db(dbName);
        require('./routes/getGroups.js')(db,app);
        require('./routes/getUsers.js')(db,app);
        require('./routes/addData.js')(db,app);
        require('./routes/addUser.js')(db,app);
        require('./routes/addGroup.js')(db,app);
        require('./routes/editUser.js')(db,app);
        require('./routes/deleteUser.js')(db,app);
        require('./routes/deleteGroup.js')(db,app);
        require('./routes/addUsertoChannel.js')(db,app);
        require('./routes/updateGroups.js')(db,app);
        // require('./routes/api-update.js')(db,app,ObjectID);
        // require('./routes/api-deleteitem.js')(db,app,ObjectID);

});
