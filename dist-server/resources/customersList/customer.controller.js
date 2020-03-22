"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _customer = _interopRequireDefault(require("./customer.model"));

var _crud = require("../../utils/crud");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _crud.crudControllers)(_customer.default);

exports.default = _default;