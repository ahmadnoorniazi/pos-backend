"use strict";

var _this = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var fs = require('fs');

var _ = require('lodash');

var exec = require('child_process').exec;

var path = require('path'); // Concatenate root directory path with our backup folder.


var backupDirPath = path.join(__dirname, 'database-backup');
var dbOptions = {
  user: 'root',
  pass: 'ahmad123',
  host: 'localhost',
  port: 27017,
  database: 'officeDB',
  autoBackup: true,
  removeOldBackup: true,
  keepLastDaysBackup: 2,
  autoBackupPath: backupDirPath
}; // return stringDate as a date object.

exports.stringToDate = function (dateString) {
  return new Date(dateString);
}; // Check if variable is empty or not.


exports.empty = function (mixedVar) {
  var undef, key, i, len;
  var emptyValues = [undef, null, false, 0, '', '0'];

  for (i = 0, len = emptyValues.length; i < len; i++) {
    if (mixedVar === emptyValues[i]) {
      return true;
    }
  }

  if (_typeof(mixedVar) === 'object') {
    for (key in mixedVar) {
      return false;
    }

    return true;
  }

  return false;
}; // Auto backup function


exports.dbAutoBackUp = function () {
  // check for auto backup is enabled or disabled
  if (dbOptions.autoBackup == true) {
    var date = new Date();
    var beforeDate, oldBackupDir, oldBackupPath; // Current date

    currentDate = _this.stringToDate(date);
    var newBackupDir = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate(); // New backup path for current backup process

    var newBackupPath = dbOptions.autoBackupPath + '-mongodump-' + newBackupDir; // check for remove old backup after keeping # of days given in configuration

    if (dbOptions.removeOldBackup == true) {
      beforeDate = _.clone(currentDate); // Substract number of days to keep backup and remove old backup

      beforeDate.setDate(beforeDate.getDate() - dbOptions.keepLastDaysBackup);
      oldBackupDir = beforeDate.getFullYear() + '-' + (beforeDate.getMonth() + 1) + '-' + beforeDate.getDate(); // old backup(after keeping # of days)

      oldBackupPath = dbOptions.autoBackupPath + 'mongodump-' + oldBackupDir;
    } // Command for mongodb dump process


    var cmd = 'mongodump --host ' + dbOptions.host + ' --port ' + dbOptions.port + ' --db ' + dbOptions.database + ' --username ' + dbOptions.user + ' --password ' + dbOptions.pass + ' --out ' + newBackupPath;
    exec(cmd, function (error, stdout, stderr) {
      if (_this.empty(error)) {
        // check for remove old backup after keeping # of days given in configuration.
        if (dbOptions.removeOldBackup == true) {
          if (fs.existsSync(oldBackupPath)) {
            exec('rm -rf ' + oldBackupPath, function (err) {});
          }
        }
      }
    });
  }
};