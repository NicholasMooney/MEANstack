var mongoose = require('mongoose');
var crypto = require('crypto');
module.exports = function (config, env) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'db connection error...'));
    db.once('open', function callback() {
        console.log(env + ' db opened');

    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        userName: String,
        salt: String,
        hashed_pwd: String,
        roles: [String]
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch){
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    };

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            var salt, hash;
            salt = createSalt();
            hash = hashPwd(salt, 'password');
            User.create({
                firstName: 'Nicholas',
                lastName: 'Mooney',
                userName: 'admin',
                salt: salt,
                hashed_pwd: hash,
                roles: ['admin']
                //need to add default salt and hashed_pwd stuff
            });
            User.create({
                firstName: 'Nicholas',
                lastName: 'Mooney',
                userName: 'user2',
                salt: salt,
                hashed_pwd: hash,
                roles: []
                //need to add default salt and hashed_pwd stuff
            });
            User.create({
                firstName: 'Nicholas',
                lastName: 'Mooney',
                userName: 'user3',
                salt: salt,
                hashed_pwd: hash 
                //need to add default salt and hashed_pwd stuff
            });
        }
    });
 
};

function createSalt(){
    return crypto.randomBytes(128).toString('base64');
}

function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    hmac.setEncoding('hex');
    hmac.write(pwd);
    hmac.end();
    return hmac.read();
}