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
router.route("/all").get(_billing.default.getAll);
router.route("/filter/:startDate/:endDate").get(_billing.default.filterBillByDate);
router.route("/update/:id").put(_billing.default.update);
router.route("/remove/:id").delete(_billing.default.remove);
router.route("/getAllSale").get(_billing.default.getSalesData);
router.route("/getWeeklySale").get(_billing.default.filterWeekly);
router.route("/getMonthly").get(_billing.default.filterMonthly);
router.route("/getUnpaidBills").get(_billing.default.getUnpaidBills);
router.route("/testingFilter").get(_billing.default.testingFilter);
var _default = router;
exports.default = _default;