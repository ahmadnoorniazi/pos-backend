"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _customer = _interopRequireDefault(require("./customer.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route("/create").post(_customer.default.create);
router.route("/all").get(_customer.default.getAll);
router.route("/update/:id").put(_customer.default.update);
router.route("/remove/:id").delete(_customer.default.remove);
var _default = router;
exports.default = _default;