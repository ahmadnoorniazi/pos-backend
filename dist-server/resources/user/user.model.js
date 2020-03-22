"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var jwt = require("jsonwebtoken");

var userSchema = new _mongoose.default.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  token: {
    type: String
  }
});

userSchema.methods.checkPassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(user, password) {
    var same;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _bcryptjs.default.compare(password, user.password);

          case 3:
            same = _context.sent;
            return _context.abrupt("return", same);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", _context.t0.message);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}(); //hooks


userSchema.pre("save", function (next) {
  var user = this;

  if (user.isModified("password")) {
    _bcryptjs.default.hash(user.password, 8, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  }
}); //Instance method

userSchema.methods.generateAuthToken = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
  var user, token;
  return regeneratorRuntime.wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = this;
          token = jwt.sign({
            _id: user._id.toString()
          }, "mobileLIVE");
          user.token = token;
          _context2.next = 5;
          return user.save();

        case 5:
          return _context2.abrupt("return", token);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, this);
}));

var User = _mongoose.default.model("user", userSchema);

var _default = User;
exports.default = _default;