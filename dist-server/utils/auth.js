"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signin = exports.signup = exports.verifyToken = exports.newToken = void 0;

var _config = _interopRequireDefault(require("../config"));

var _user = _interopRequireDefault(require("../resources/user/user.model"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var newToken = function newToken(user) {
  return _jsonwebtoken.default.sign({
    id: user.id
  }, _config.default.secrets.jwt, {
    expiresIn: _config.default.secrets.jwtExp
  });
};

exports.newToken = newToken;

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken.default.verify(token, _config.default.secrets.jwt, function (err, payload) {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

exports.verifyToken = verifyToken;

var signup = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var user, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!req.body.email || !req.body.password)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: 'need email and password'
            }));

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return _user.default.create(_objectSpread({}, req.body, {
              image: req.file.path
            }));

          case 5:
            user = _context.sent;
            token = newToken(user);
            return _context.abrupt("return", res.status(201).json({
              user: user,
              token: token
            }));

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);
            return _context.abrupt("return", res.send(_context.t0).status(500).end());

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 10]]);
  }));

  return function signup(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signup = signup;

var signin = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var invalid, user, match, token;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!req.body.email || !req.body.password)) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send({
              message: 'need email and password'
            }));

          case 2:
            invalid = {
              message: 'Invalid email and passoword combination'
            };
            _context2.prev = 3;
            _context2.next = 6;
            return _user.default.findOne({
              email: req.body.email
            }).exec();

          case 6:
            user = _context2.sent;

            if (user) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(invalid));

          case 9:
            _context2.next = 11;
            return user.checkPassword(req.body.password);

          case 11:
            match = _context2.sent;

            if (match) {
              _context2.next = 14;
              break;
            }

            return _context2.abrupt("return", res.status(401).send(invalid));

          case 14:
            token = newToken(user);
            return _context2.abrupt("return", res.status(201).send({
              user: user,
              token: token
            }));

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2["catch"](3);
            console.error(_context2.t0);
            res.status(500).end();

          case 22:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 18]]);
  }));

  return function signin(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.signin = signin;

var protect = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
    var bearer, token, payload, user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            bearer = req.headers.authorization;

            if (!(!bearer || !bearer.startsWith('Bearer '))) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", res.status(401).end("unathenticated user"));

          case 3:
            token = bearer.split('Bearer ')[1].trim();
            _context3.prev = 4;
            _context3.next = 7;
            return verifyToken(token);

          case 7:
            payload = _context3.sent;
            _context3.next = 13;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](4);
            return _context3.abrupt("return", res.status(401).end());

          case 13:
            _context3.next = 15;
            return _user.default.findById(payload.id).select('-password').lean().exec();

          case 15:
            user = _context3.sent;

            if (user) {
              _context3.next = 18;
              break;
            }

            return _context3.abrupt("return", res.status(401).end());

          case 18:
            req.user = user;
            next();

          case 20:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[4, 10]]);
  }));

  return function protect(_x5, _x6, _x7) {
    return _ref3.apply(this, arguments);
  };
}();

exports.protect = protect;