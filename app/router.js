const express = require('express');
const router = express.Router();
const socket_api = require('../Utils/socket.api');

router.post('/broadcast/all', socket_api.broadCastToAllClient);
router.post('/broadcast', socket_api.broadCastToOneClient);
router.post('/broadcast/many', socket_api.broadCastToManyClient);
module.exports = router;