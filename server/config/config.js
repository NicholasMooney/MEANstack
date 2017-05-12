var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {

    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/MEANstackdb',
        port: process.env.PORT || 3030
    },

    production: {
        rootPath: rootPath,
        db: 'mongodb://mooneyn:Oliver2007!@cluster0-shard-00-00-prqc7.mongodb.net:27017,cluster0-shard-00-01-prqc7.mongodb.net:27017,cluster0-shard-00-02-prqc7.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin',
        port: process.env.PORT || 80
    }
};