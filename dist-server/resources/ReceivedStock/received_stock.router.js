"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _received_stock = _interopRequireDefault(require("./received_stock.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route("/create").post(_received_stock.default.createStock);
router.route("/all").get(_received_stock.default.getAll);
router.route("/update/:id").put(_received_stock.default.update);
router.route("/remove/:id").delete(_received_stock.default.remove);
router.route("/filter/:startDate/:endDate").get(_received_stock.default.filterBillByDate);
var _default = router;
exports.default = _default;