"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _availableStock = _interopRequireDefault(require("./availableStock.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route("/create").post(_availableStock.default.create);
router.route("/all").get(_availableStock.default.getAll); // router.route("/filter/:search").get(controller.filter);

router.route("/remove/:id").delete(_availableStock.default.remove);
var _default = router;
exports.default = _default;