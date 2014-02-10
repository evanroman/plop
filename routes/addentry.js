var moment = require('moment');
var settings = require('../settings');
var entriesdb = require("../pouchdb/entriesdb");

exports.addEntryGet = function(request, response){
    response.render('addentry', {
        title : 'New Entry - ' + settings.title,
        tagline : settings.tagline
    });
}

exports.addEntryPost = function(request, response){
    var new_title = request.body.entrytitle;
    var new_content = request.body.entrycontent;
    var new_date = moment(new Date()).unix();
    if(request.session.user){
        var username = request.session.user;
        entriesdb.addEntry(username, new_date, new_title, new_content);
        response.redirect('/');
    }else{
        response.redirect('/login');
    }
}
