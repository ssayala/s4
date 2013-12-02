/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    path = require('path'),
    app = express(),
    mongoose = require('mongoose'),
    settings = require('./config/settings'),
    engine = require('ejs-locals')
    account = require('./routes/account'),
    userRoute = require('./routes/user'),
    downloadsRoute = require('./routes/downloads');

mongoose.connect(settings.mongodb);
var User = require('./models/user');
app.engine('ejs', engine);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.methodOverride());
app.use(express.bodyParser())
app.use(express.cookieParser());
app.use(express.cookieSession({key: settings.projectName, secret: settings.secret}));
app.use(app.router);
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.locals.textFor = function(model, property) {
    if (model) {
        return model[property];
    }
    return "";
};
function requiredAuthentication(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.session.error = 'Access denied!';
        res.redirect('/');
    }
}

app.post("/login", account.login);
app.get('/logout', account.logout);


app.get('/', function(req, res){

    if (req.session && req.session.user) {
        res.redirect('/downloads');
    }
    else {

        var model = {
            settings: settings,
            navbar: null
        };

        User.findOne({},function(err, user) {
            if (user) {
                res.render('index',model );

            }
            else {
                res.render('create-admin',model );
            }

        });
    }
});

app.get('/user', userRoute.newUser);
app.get('/user/:email', requiredAuthentication, userRoute.getUserByEmail);
app.post('/user', userRoute.putUser);
app.get('/download/:name', requiredAuthentication, downloadsRoute.getDownloadByName);
app.get('/downloads', requiredAuthentication, downloadsRoute.get);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
