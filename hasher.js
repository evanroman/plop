//Makes hashes of passwords
crypto = require('crypto');
var settings = require('./settings');
var passwordhashingalgorithm= settings.hashalgorithm;
//hasher
// base64 before input to this function
var passwordHasher = function(password) {
    //set encoding of input
    //var pw_base64_buffer = new Buffer(password).toString('base64');
    // change to 'md5' if you want an MD5 hash
    var hasher = crypto.createHash(passwordhashingalgorithm);
    // change to 'binary' if you want a binary hash.
    //hasher.setEncoding('binary');
    // the text that you want to hash
    hasher.write(password);
    var hashed_password = hasher.digest('hex');
    return hashed_password;
}
exports.passwordHasher = passwordHasher;

