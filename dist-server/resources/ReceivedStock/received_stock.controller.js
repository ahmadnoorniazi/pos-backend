"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _received_stock = _interopRequireDefault(require("./received_stock.mdel"));

var _crud = require("../../utils/crud");

var _availableStock = _interopRequireDefault(require("../availableStock/availableStock.mdel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _crud.crudControllers)(_received_stock.default, _availableStock.default);

exports.default = _default;