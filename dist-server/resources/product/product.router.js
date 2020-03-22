"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _product = _interopRequireDefault(require("./product.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route("/create").post(_product.default.create);
router.route("/all").get(_product.default.getAll);
router.route("/filter/:search").get(_product.default.filter);
router.route("/update/:id").put(_product.default.update);
router.route("/remove/:id").delete(_product.default.remove);
var _default = router;
exports.default = _default;