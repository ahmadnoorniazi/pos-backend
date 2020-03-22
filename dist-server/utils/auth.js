"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.protect = exports.signin = exports.verifyToken = exports.newToken = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _user = _interopRequireDefault(require("../resources/user/user.model"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var newToken = function newToken(user) {
  return _jsonwebtoken.default.sign({
    id: user.id,
    role: user.role
  }, process.env.jwt, {
    expiresIn: process.env.jwtExp
  });
};

exports.newToken = newToken;

var verifyToken = function verifyToken(token) {
  return new Promise(function (resolve, reject) {
    _jsonwebtoken.default.verify(token, process.env.jwt, function (err, payload) {
      if (err) return reject(err);
      resolve(payload);
    });
  });
};

exports.verifyToken = verifyToken;

var signin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var invalid, user, match, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!req.body.email || !req.body.password)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", res.status(400).send({
              message: "need email and password"
            }));

          case 2:
            invalid = {
              message: "Invalid email and passoword combination"
            };
            _context.prev = 3;
            _context.next = 6;
            return _user.default.findOne({
              email: req.body.email
            }).exec();

          case 6:
            user = _context.sent;

            if (user) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", res.status(401).send(invalid));

          case 9:
            _context.next = 11;
            return user.checkPassword(user, req.body.password);

          case 11:
            match = _context.sent;

            if (match) {
              _context.next = 14;
              break;
            }

            return _context.abrupt("return", res.status(401).send(invalid));

          case 14:
            token = newToken(user);
            return _context.abrupt("return", res.status(201).send({
              token: token,
              role: user.role,
              email: user.email
            }));

          case 18:
            _context.prev = 18;
            _context.t0 = _context["catch"](3);
            console.error(_context.t0);
            console.log('eeeeeee', _context.t0);
            res.send({
              error: _context.t0
            }).end();

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 18]]);
  }));

  return function signin(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.signin = signin;

var protect = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
    var bearer, token, payload, user;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            bearer = req.headers.authorization;

            if (!(!bearer || !bearer.startsWith("Bearer "))) {
              _context2.next = 3;
              break;
            }

            return _context2.abrupt("return", res.status(401).end());

          case 3:
            token = bearer.split("Bearer ")[1].trim();
            _context2.prev = 4;
            _context2.next = 7;
            return verifyToken(token);

          case 7:
            payload = _context2.sent;
            _context2.next = 13;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2["catch"](4);
            return _context2.abrupt("return", res.status(401).end());

          case 13:
            _context2.next = 15;
            return _user.default.findById(payload.id).select("-password").lean().exec();

          case 15:
            user = _context2.sent;

            if (user) {
              _context2.next = 18;
              break;
            }

            return _context2.abrupt("return", res.status(401).end());

          case 18:
            req.user = user;
            next();

          case 20:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 10]]);
  }));

  return function protect(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

exports.protect = protect;