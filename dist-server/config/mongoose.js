"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_mongoose.default.connect('mongodb://localhost/officeDB').then(function () {
  return console.log('connected to mongodb ...');
}).catch(function (err) {
  return console.error('could not connect to mongodb ' + err);
});