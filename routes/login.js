var settings = require('../settings');
var hasher = require('../hasher');
exports.loginPost = function(request, response){
    var login_name = request.body.loginname.toLowerCase();
    var password = request.body.password;
    var hashed = hasher.passwordHasher(password);
    var index = -1;
    for(var i = 0, len = settings.users.length; i < len; i++) {
        console.log(i+' '+settings.users[i].passwordhash)
        if (settings.users[i].username === login_name) {
            index = i;
            break;
        }
    
    }
    if(index > -1){
        if(hashed === settings.users[index].passwordhash){
            request.session.user = login_name;
            response.redirect('/');
        }else{
            response.render('login', {title: 'login', tagline: settings.tagline, error: 'wrong password information'});
        }
    }else{
        response.render('login', {title: 'login', tagline: settings.tagline, error: 'wrong  login information'});
    }
    
}
exports.loginGet = function(request, response){
    response.render('login', {title: 'login', tagline: settings.tagline});
}
exports.logout = function(request, response){
    request.session.destroy();
    response.redirect('/');
}
