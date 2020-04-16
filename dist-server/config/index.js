"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = require("lodash");

var env = process.env.NODE_ENV || 'development';
var baseConfig = {
  env: env,
  isDev: env === 'development',
  isTest: env === 'testing',
  port: 3000,
  secrets: {
    jwt: "abc",
    jwtExp: '100d'
  }
};
var envConfig = {};

var _default = (0, _lodash.merge)(baseConfig, envConfig);

exports.default = _default;