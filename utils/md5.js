var fs = require('fs');
var crypto = require('crypto');

function _get_file_md5(path) {
    return new Promise(function (resolve, reject) {
        var md5sum = crypto.createHash('md5');
        var stream = fs.createReadStream(path);
        stream.on('data', function(chunk) {
            md5sum.update(chunk);
        });
        stream.on('end', function() {
            var str = md5sum.digest('hex');
            resolve(str);
        });
    });
}

var get_file_md5 = async function get_file_md5(path) {
    var str =  await _get_file_md5(path);
    return str.toString();
}


function get_string_md5(str) {
     var md5 = crypto.createHash('md5');
     return md5.update(str).digest('hex');
}

exports.get_file_md5 = get_file_md5;
exports.get_string_md5 = get_string_md5;