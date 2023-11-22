const { connect, connection } = require('mongoose');

connect(`mongodb+srv://root:root@cluster0.p2dafcx.mongodb.net/`);

module.exports = connection;
