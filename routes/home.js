var moment = require('moment');
var settings = require('../settings');
var entriesdb = require('../pouchdb/entriesdb');
exports.index = function(request, response) {
    response.redirect('/home');
}
exports.home = function(request, response){
    if(request.query.p){
        var page = parseInt(request.query.p);
        var offset = (page - 1) * settings.postPerPage;
    }else{
        var page = 1;
        var offset = 0;
    }
    entriesdb.info(function(output){return 'hi'});
    response.render('home', {
        title : settings.title,
        tagline : settings.tagline,
        //posts: output.rows,
        page : page,
        next : page + 1
    })
}
