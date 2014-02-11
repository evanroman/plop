var fs = require("fs");
var settings = require('./settings');
var file = "./entries.db";
var exists = fs.existsSync(file);

if(!exists) {
  console.log("Creating DB file.");
  fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3");
var db = new sqlite3.Database(file);
exports.newEntry = function(title, date, author, content){
db.serialize(function() {
  if(!exists) {
    db.run("CREATE TABLE Entries (title TEXT NOT NULL, date INT PRIMARY KEY NOT NULL, author TEXT NOT NULL, content TEXT NOT NULL)");
  }

  db.run("INSERT INTO Entries VALUES ('"+title+"', "+date+", '"+author+"', '"+content+"')");
});

db.close();
}
exports.getEntries = function(offset, callback){
    db.serialize(function() {
        if(!exists) {
            console.log("database does not exist");
        }else{
            db.all("SELECT * FROM Entries LIMIT "+settings.postsPerPage+" OFFSET "+offset, function(err, row){
                if(!err){
                    callback(row);
                }
            });
        }
    });
}
