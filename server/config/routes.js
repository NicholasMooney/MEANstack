var passport = require('passport');

module.exports = function (app) {
    //ROUTES
    //when somebody requests /partial/main, /main jade will be constructed.
    app.get('/partials/*', function (req, res) {

        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', function (req, res, next) {

        var auth = passport.authenticate('local', function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                res.send({
                    success: false
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                console.log("attempting logIn with " + user);
                res.send({
                    success: true,
                    user: user
                });
            });

        });
        auth(req, res, next);
    });

    //catch all route. If landing on an unusual page, go back and render index
    app.get('*', function (req, res) {

        res.render('index');
    });

};