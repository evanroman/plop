var moment = require('moment');
var settings = require('../settings');
var sqlite = require('../sqlite');
exports.index = function(request, response) {
    response.redirect('/home');
}
exports.home = function(request, response){
    if(typeof(request.query.p)==='number'){
        var page = parseInt(request.query.p);
        var offset = (page - 1) * settings.postPerPage;
    }else{
        var page = 1;
        var offset = 0;
    }
    sqlite.getEntries(offset, function(output){
        response.render('home', {
            title : settings.title,
            tagline : settings.tagline,
            posts: output,
            page : page,
            next : page + 1
        });
    });
}
