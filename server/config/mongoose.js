var mongoose = require('mongoose');

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
        userName: String
    });

    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function (err, collection) {
        if (collection.length === 0) {
            User.create({
                firstName: 'Nicholas',
                lastName: 'Mooney',
                userName: 'nicholas.a.mooney@gmail.com'
            });
        }
    });

};