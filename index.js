var express = require('express');
var http = require('http');
var path = require('path');
var swig = require('swig');
var home = require('./routes/home');
var addentry = require('./routes/addentry');
var login= require('./routes/login');
var settings = require('./settings');
//var RedisStore = require('connect-redis')(express);
var app = express();

app.configure(function(){
    app.set('port',  settings.port);
    app.set('ipaddress',  settings.ipaddress);
    app.engine('html', swig.renderFile);
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views');
    app.use(express.favicon(__dirname + '/public/images/favicon.png')); 
    app.use(express.logger('tiny'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.session({
        secret: settings.sessionSecret
    }));

    app.use(express.csrf());
    app.use(function (req, res, next) {
        res.locals.user = req.session.user
        next();
    })
    app.use(function (req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        res.locals.csrftoken = req.csrfToken();
        next();
    })
    app.use(app.router);
});

app.use(express.errorHandler());

//Articles:
app.get('/', home.index);
app.get('/home', home.home);
app.get('/addentry', addentry.addEntryGet);
app.post('/addentry', addentry.addEntryPost);
app.get('/login', login.loginGet);
app.post('/login', login.loginPost);
app.get('/logout', login.logout);
/*
app.get('/article', home.article);
app.get('/register', newuser.register);
app.get('/login', newuser.login);
app.get('/logout', newuser.logout);
app.get('/emailverify', newuser.emailVerify);
app.get('/passwordreset', newuser.passwordReset);
app.post('/register', newuser.addUser);
app.post('/login', newuser.newLogin);
//PROFILE
app.get('/user/:username', profile.profilePage);
app.get('/profile/description', profile.editDescription);
app.post('/profile/description', profile.newDescription);
//ADMIN
app.get('/admin', admin.adminPage);
app.get('/*', indexpage.fourOFour);*/
http.createServer(app).listen(app.get('port'), app.get('ipaddress'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
