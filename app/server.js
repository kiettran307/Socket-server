require('dotenv').config({path: '.env'});
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./router');
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use('/', router);

const port = process.env.PORT_API || 3000;
const socket_api = require('../Utils/socket.api');
socket_api.initIo(server);
//Socket-IO -- client
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
  });

server.listen(port, () => {
    console.log('Server is running at ',port );
  });