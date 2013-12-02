var User = require('../models/user'),
    settings = require('../config/settings');

exports.newUser = function(req, res){
    var user = req.session.user;
    var model = {
        pageTitle: "Create User",
        settings: settings,
        keys: [],
        currentUser: user,
        editUser: {
            name: "",
            email: ""
        },
        navbar: { username: user.name, headers: []}
    };
    res.render('user',model );
};

exports.getUserByEmail = function(req,res) {
    var user = req.session.user;
    var model = {
        settings: settings,
        keys: [],
        navbar: { username: user.name, headers: []},
        currentUser: user
    };
    User.findOne({ email: req.params.email }, function(err, editUser) {
        if (editUser) {
            model.pageTitle = editUser.name;
            model.editUser = editUser
            res.render('user',model );
        }
        else {
            //user not found
        }
    });
};

exports.putUser = function(req, res){
    var name = req.param('name');
    var email = req.param('email');
    var password = req.param('password');
    User.new(name,email,password, function(err, user) {
        if (err) {
            console.log(err);
            res.render('user', model);
        }
        else {
            var newModel = { title: model.title, projectName: settings.projectName, headers: settings.headers, user: user}
            res.render('user',newModel );

        }
    });
};
