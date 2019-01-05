const socketIO = require('socket.io');
let connectionCounter = 0;

function authen(socket, next) {
  console.log('authen');
  const tokenID = socket.handshake.query.token;
  if (tokenID === process.env.HEADER_AUTHEN) {
    //if authenticated
    return next();
  }
  console.log('authentication error');
  return next(new Error('authentication error'));
}

function onConnect(socket) {
  //if authen success
//{ socket.join('authen room');}

  console.log('new user connected :', socket.id);
  connectionCounter++;
  console.log('connectionCounter :', connectionCounter);

  socket.on('disconnect', () => {
    connectionCounter--;
    console.info(socket.id,' is disconected, remain',connectionCounter,' clients');
  });
}
let io;
const socketAPI = {
  initIo(server) {
    io = socketIO(server, {
      transport: ['websocket'],
    });
    // io.use(authen); //authen first --> connect
    io.on('connection', onConnect);
    console.log('socket is connected successfully!');
  },
  getIoInstance() {
    return io;
  },
  broadCastAll(message) {
    if (io) {
      io.emit('broadcastEvent', message);
      console.log('broadcastEvent successfully!');

    } else {
      console.log('socket io is null broadCastToAllClient');
    }
  },
  broadCastOne(message, socketId) {
    if (io) {
      io.to(socketId).emit('socketClientEvent', message);
      console.log('socketClientEvent successfully!');
    } else {
      console.log('socket io is null broadCastToAllClient');
    }
  },
  broadCastMany(message, socketIds) {
    if (io) {
      for (let index = 0; index < socketIds.length; index++) {
        const element = socketIds[index].trim();
        io.to(element).emit('socketClientEvent', message);
      }
      console.log('broadcastEvent successfully!');
    } else {
      console.log('socket io is null broadCastToAllClient');
    }
  },
  broadCastToAllClient(req, res) {
    try {
      const message = req.body.message;
      socketAPI.broadCastAll(message);
      res.send({
        status: 'success',
        data: 'sent'
      })
    } catch (error) {
      res.send({
        status: error.message
      })
    }

  },
  broadCastToClient(req, res) {
    try {
      const message = req.body.message;
      let socketIds = req.body.socketIds;
      if (!socketIds) {
        socketAPI.broadCastAll(message);  
      }
      else{
        socketIds = socketIds.split(',');
        console.log('socketIds: ', socketIds);
        socketAPI.broadCastMany(message, socketIds);
      }
      res.send({
        status: 'success',
        data: 'sent'
      })
    } catch (error) {
      res.send({
        status: error.message
      })
    }

  },
  broadCastToOneClient(req, res) {
    try {
      const message = req.body.message;
      const socketId = req.body.socketId;
      socketAPI.broadCastOne(message, socketId);
      res.send({
        status: 'success',
        data: 'sent'
      })
    } catch (error) {
      res.send({
        status: error.message
      })
    } 
  },
  broadCastToManyClient(req, res) {
    try {
      const message = req.body.message;
      let socketIds = req.body.socketIds;
      socketIds = socketIds.split(',');
      console.log('socketIds: ', socketIds);
      socketAPI.broadCastMany(message, socketIds);
      res.send({
        status: 'success',
        data: 'sent'
      })
    } catch (error) {
      res.send({
        status: error.message
      })
    } 
  }
};

module.exports = socketAPI;