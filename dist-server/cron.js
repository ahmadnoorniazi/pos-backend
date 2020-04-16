"use strict";

var CronJob = require('cron').CronJob;

var Cron = require('./backup.js'); // AutoBackUp every week (at 00:00 on Sunday)


new CronJob('0 0 *  * 0', function () {
  Cron.dbAutoBackUp();
}, null, true, 'America/New_York');