"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _user = _interopRequireDefault(require("./user.controller"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = (0, _express.Router)();
router.route('/create').post(_user.default.create);
router.route('/all').get(_user.default.getAll);
router.route('/update/:id').put(_user.default.update);
router.route('/remove/:id').delete(_user.default.remove);
var _default = router;
exports.default = _default;