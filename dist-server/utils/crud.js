"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.createBill = exports.create = void 0;

var _dateformat = _interopRequireDefault(require("dateformat"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**Get All Users */
var getAll = function getAll(model) {
  return (/*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var users;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return model.find({}).exec();

              case 3:
                users = _context.sent;
                res.status(200).json(users);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                res.status(400).send({
                  error: _context.t0.message
                });

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
    }()
  );
};
/** Create New User*/


var create = function create(model) {
  return (/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var user;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return model.create(req.body);

              case 3:
                user = _context2.sent;
                res.status(201).json({
                  message: "User added into account",
                  data: user
                });
                res.status(201).json({
                  message: "Manager added into account",
                  data: user
                });
                _context2.next = 11;
                break;

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](0);
                res.status(400).send({
                  error: _context2.t0.message
                });

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 8]]);
      }));

      return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
      };
    }()
  );
};
/** Edit User */


exports.create = create;

var update = function update(model) {
  return (/*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var id, updatedUser;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                id = req.params.id;
                _context3.next = 4;
                return model.findByIdAndUpdate(id, req.body, {
                  new: true
                }).exec();

              case 4:
                updatedUser = _context3.sent;
                _context3.next = 7;
                return updatedUser.save();

              case 7:
                res.status(201).json({
                  message: "User info updated into account",
                  data: updatedUser
                });
                _context3.next = 13;
                break;

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](0);
                res.status(400).send({
                  error: _context3.t0.message
                });

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 10]]);
      }));

      return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
      };
    }()
  );
};
/** Delete User  */


var remove = function remove(model) {
  return (/*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var id, removedUser, updatedList;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                id = req.params.id;
                _context4.next = 4;
                return model.findByIdAndRemove(id);

              case 4:
                removedUser = _context4.sent;
                _context4.next = 7;
                return model.find({
                  role: "developer"
                }).exec();

              case 7:
                updatedList = _context4.sent;
                res.status(201).json({
                  message: "User info removed from account",
                  data: updatedList
                });
                _context4.next = 14;
                break;

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                res.status(400).send({
                  message: _context4.t0.message
                });

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
      };
    }()
  );
};

var createBill = function createBill(model) {
  return (/*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var total_actual_price, updateBill, bill;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                total_actual_price = 0;

                if (req.body && Array.isArray(req.body.items) && req.body.items.length > 0) {
                  total_actual_price = req.body.items.reduce(function (acc, dec) {
                    return acc + Number(dec.actual_price);
                  }, 0);
                }

                updateBill = _objectSpread({}, req.body, {
                  total_actual_price: total_actual_price
                });
                _context5.next = 6;
                return model.create(updateBill);

              case 6:
                bill = _context5.sent;
                res.status(201).json({
                  message: "Bill added into account",
                  data: bill
                });
                _context5.next = 13;
                break;

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](0);
                res.status(400).send({
                  error: _context5.t0.message
                });

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 10]]);
      }));

      return function (_x9, _x10) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};

exports.createBill = createBill;

var filter = function filter(model) {
  return (/*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var search, users;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                search = req.params.search;
                _context6.next = 4;
                return model.find({
                  name: {
                    $regex: search,
                    "$options": "i"
                  }
                }).exec();

              case 4:
                users = _context6.sent;
                res.status(200).json(users);
                _context6.next = 11;
                break;

              case 8:
                _context6.prev = 8;
                _context6.t0 = _context6["catch"](0);
                res.status(400).send({
                  error: _context6.t0.message
                });

              case 11:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 8]]);
      }));

      return function (_x11, _x12) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
};

var crudControllers = function crudControllers(model) {
  return {
    getAll: getAll(model),
    create: create(model),
    update: update(model),
    remove: remove(model),
    filter: filter(model),
    createBill: createBill(model)
  };
};

exports.crudControllers = crudControllers;