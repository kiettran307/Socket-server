const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, '..', '.env')});

const Crypto = {
    decode(objectEncoded) {
        try {
            console.log('decode');
            const decodeRS = jwt.verify(objectEncoded, process.env.SECRET);
            console.log('decode success: ', decodeRS);
            return decodeRS;
        } catch (error) {
            console.log('decode error: ', error);
            return error;
        }
    },
    encode(object) {
        try {
            console.log('encode');
            const encodeRS = jwt.sign(object, process.env.SECRET, {
                algorithm: 'HS256'
            });
            console.log('encode success: ', encodeRS);
            return encodeRS;
        } catch (error) {
            console.log('encode error: ', error);
            return null;
        }
    }
};

// const object = {username: 'abc def', password: '123456'};
// Crypto.encode(object);

Crypto.decode('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyBkZWYiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTU0NjU3MTE5N30.iaqd7Os6zrC06_q5GQPrnfWs3vODfxlMQowP7fiKQsI');
module.exports = Crypto;