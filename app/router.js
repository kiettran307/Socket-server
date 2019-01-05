const express = require('express');
const router = express.Router();
const socket_api = require('../Utils/socket.api');

router.post('/broadcast', socket_api.broadCastToClient);
module.exports = router;