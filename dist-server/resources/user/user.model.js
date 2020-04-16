"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require("jsonwebtoken");

var userSchema = new _mongoose.default.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
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
  shopname: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});
userSchema.pre('save', function (next) {
  var _this = this;

  if (!this.isModified('password')) {
    return next();
  }

  _bcryptjs.default.hash(this.password, 8, function (err, hash) {
    if (err) {
      return next(err);
    }

    _this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password) {
  var passwordHash = this.password;
  return new Promise(function (resolve, reject) {
    _bcryptjs.default.compare(password, passwordHash, function (err, same) {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

var User = _mongoose.default.model("user", userSchema);

var _default = User;
exports.default = _default;