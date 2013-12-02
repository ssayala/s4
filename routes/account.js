
/*
 * GET home page.
 */
var User = require('../models/user');

function authenticate(email, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', email, pass);
    User.isValidUserPassword(email,pass,fn);
}

exports.index = function(req, res){

    var model = {
        title: 'S3 Share',
        projectName: 'S4',
        headers:[]
    };
    res.render('index',model );

};


exports.logout = function(req,res) {
    req.session = null;
    res.redirect('/');

};

exports.login = function (req, res) {
    authenticate(req.param('email'), req.param('password'), function (err, user) {
        if (user) {
            console.log(user);
            req.session.user = user;
            res.redirect('/downloads');
        } else {
            res.redirect('/');
        }
    });
}