"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _billing = _interopRequireDefault(require("./billing.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route("/create").post(_billing.default.createBill);
router.route("/all").get(_billing.default.getAll); // router.route("/filter/:search").get(controller.filter);
// router.route("/update/:id").put(controller.update);
// router.route("/remove/:id").delete(controller.remove);

var _default = router;
exports.default = _default;