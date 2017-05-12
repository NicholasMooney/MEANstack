module.exports = function (app) {
    //ROUTES
    //when somebody requests /partial/main, /main jade will be constructed.
    app.get('/partials/*', function (req, res) {

        res.render('../../public/app/' + req.params[0]);
    });

    //catch all route. If landing on an unusual page, go back and render index
    app.get('*', function (req, res) {

        res.render('index');
    });

};