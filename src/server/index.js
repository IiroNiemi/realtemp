const path = require('path');
const express = require('express');
var admin = require("firebase-admin");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

var serviceAccount = require("../../arduino-yun-b0b8a-firebase-adminsdk-l5ar5-09703ebc7b.json");
 
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://arduino-yun-b0b8a.firebaseio.com"
})

var db = admin.database();
var ref = db.ref("measurement");

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res, next)=>
  res.sendFile(__dirname + './index.html'));

io.on('connection', socket =>
  ref.on("child_added", function(snapshot) {
    socket.emit('firebase-data', snapshot.val());
  })
);

server.listen(PORT)
