//Accountų paskyros
var records = [
    { id: 1, username: 'edvinas@webservices.com', password: 'kesminas', displayName: 'Edvinas', emails: [ { value: 'edvinas@webservices.com' } ], signedIn: 0, role: 'Student' }
  , { id: 2, username: 'test', password: 'test', displayName: 'test', emails: [ { value: 'test' } ], signedIn: 0, role: 'test' }
];

//Pirmoji f-ja iešanti pagal ID
exports.findById = function(id, callback) {
  process.nextTick(function() {
    var idx = id - 1;
    if (records[idx]) {
      callback(null, records[idx]);
    } else {
      callback(new Error('User ' + id + ' does not exist'));
    }
  });
}

//Antroji f-ja ieškanti pagal username
exports.findByUsername = function(username, callback) {
  process.nextTick(function() {
    for (var i = 0, len = records.length; i < len; i++) {
      var record = records[i];
      if (record.username === username) {
        return callback(null, record);
      }
    }
    return callback(null, null);
  });
}
