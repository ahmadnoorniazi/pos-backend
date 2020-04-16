"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crudControllers = exports.filterMonthly = exports.filterWeekly = exports.createStock = exports.filterBillByDate = exports.createBill = exports.create = void 0;

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
                  message: 'User added into account',
                  data: user
                });
                res.status(201).json({
                  message: 'Manager added into account',
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
                  message: 'User info updated into account',
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
                  role: 'developer'
                }).exec();

              case 7:
                updatedList = _context4.sent;
                res.status(201).json({
                  message: 'User info removed from account',
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

function updateAllProduct(_x9, _x10) {
  return _updateAllProduct.apply(this, arguments);
}

function _updateAllProduct() {
  _updateAllProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(availableStockModel, list) {
    var i, _list$i, quantity, _id, getStock, quantity_received, remaining_quantity, _id2, product_name, product_id, updateRemainingQuantity, updateStock, updatedUser;

    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            if (!(Array.isArray(list) && list.length > 0)) {
              _context13.next = 17;
              break;
            }

            i = 0;

          case 2:
            if (!(i < list.length)) {
              _context13.next = 17;
              break;
            }

            _list$i = list[i], quantity = _list$i.quantity, _id = _list$i._id;
            _context13.next = 6;
            return availableStockModel.findOne({
              product_id: _id
            }).exec();

          case 6:
            getStock = _context13.sent;

            if (!(getStock && Object.keys(getStock).length > 0 && getStock.product_name)) {
              _context13.next = 14;
              break;
            }

            quantity_received = getStock.quantity_received, remaining_quantity = getStock.remaining_quantity, _id2 = getStock._id, product_name = getStock.product_name, product_id = getStock.product_id;
            updateRemainingQuantity = Number(remaining_quantity) >= 0 ? Number(remaining_quantity) - Number(quantity) : 0;
            updateStock = {
              product_name: product_name,
              product_id: product_id,
              quantity_received: quantity_received,
              remaining_quantity: updateRemainingQuantity >= 0 ? updateRemainingQuantity : 0,
              isLow: updateRemainingQuantity > 20 ? false : true
            };
            _context13.next = 13;
            return availableStockModel.findByIdAndUpdate({
              _id: _id2
            }, updateStock, {
              new: true
            }).exec();

          case 13:
            updatedUser = _context13.sent;

          case 14:
            i++;
            _context13.next = 2;
            break;

          case 17:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13);
  }));
  return _updateAllProduct.apply(this, arguments);
}

var createBill = function createBill(model, availableStockModel) {
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
                }, !req.body.discount && {
                  discount: 0
                });
                _context5.next = 6;
                return model.create(updateBill);

              case 6:
                bill = _context5.sent;
                _context5.next = 9;
                return updateAllProduct(availableStockModel, req.body.items);

              case 9:
                res.status(201).json({
                  message: 'Bill added into account',
                  data: bill
                });
                _context5.next = 15;
                break;

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                res.status(400).send({
                  error: _context5.t0.message
                });

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      return function (_x11, _x12) {
        return _ref5.apply(this, arguments);
      };
    }()
  );
};

exports.createBill = createBill;

var filterBillByDate = function filterBillByDate(model) {
  return (/*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var _req$params, startDate, endDate, users;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _req$params = req.params, startDate = _req$params.startDate, endDate = _req$params.endDate;
                _context6.next = 4;
                return model.find({
                  time: {
                    $gte: "".concat(startDate),
                    $lte: "".concat(endDate)
                  }
                }).exec();

              case 4:
                users = _context6.sent;
                console.log('usersssssssss', users);
                res.status(200).json(users);
                _context6.next = 12;
                break;

              case 9:
                _context6.prev = 9;
                _context6.t0 = _context6["catch"](0);
                res.status(400).send({
                  error: _context6.t0.message
                });

              case 12:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 9]]);
      }));

      return function (_x13, _x14) {
        return _ref6.apply(this, arguments);
      };
    }()
  );
};

exports.filterBillByDate = filterBillByDate;

var filter = function filter(model) {
  return (/*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var search, users;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                search = req.params.search;
                _context7.next = 4;
                return model.find({
                  name: {
                    $regex: search,
                    $options: 'i'
                  }
                }).exec();

              case 4:
                users = _context7.sent;
                res.status(200).json(users);
                _context7.next = 11;
                break;

              case 8:
                _context7.prev = 8;
                _context7.t0 = _context7["catch"](0);
                res.status(400).send({
                  error: _context7.t0.message
                });

              case 11:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 8]]);
      }));

      return function (_x15, _x16) {
        return _ref7.apply(this, arguments);
      };
    }()
  );
};

var getSalesData = function getSalesData(model) {
  return (/*#__PURE__*/function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res) {
        var bills;
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return model.aggregate([{
                  $group: {
                    _id: null,
                    total_sale: {
                      "$sum": "$total_sale_price"
                    },
                    total_profit: {
                      "$sum": {
                        "$subtract": ["$total_sale_price", {
                          $add: ["$discount", "$total_actual_price"]
                        }]
                      }
                    },
                    total_discount: {
                      "$sum": "$discount"
                    },
                    total_actual: {
                      "$sum": "$total_actual_price"
                    }
                  }
                }]);

              case 3:
                bills = _context8.sent;
                res.status(200).json(_objectSpread({}, bills["0"]));
                _context8.next = 10;
                break;

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                res.status(400).send({
                  error: _context8.t0.message
                });

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 7]]);
      }));

      return function (_x17, _x18) {
        return _ref8.apply(this, arguments);
      };
    }()
  );
};

var getUnpaidBills = function getUnpaidBills(model) {
  return (/*#__PURE__*/function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res) {
        var bills;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return model.find({
                  paid: false
                });

              case 3:
                bills = _context9.sent;
                res.status(200).json(bills);
                _context9.next = 10;
                break;

              case 7:
                _context9.prev = 7;
                _context9.t0 = _context9["catch"](0);
                res.status(400).send({
                  error: _context9.t0.message
                });

              case 10:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 7]]);
      }));

      return function (_x19, _x20) {
        return _ref9.apply(this, arguments);
      };
    }()
  );
};

var createStock = function createStock(model, availableStockModel) {
  return (/*#__PURE__*/function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res) {
        var _req$body, product_name, product_id, product_quantity, user, getStock, quantity_received, remaining_quantity, _id, _product_name, _product_id, updateQuantity, updateRemainingQuantity, updateStock, updatedUser, createAvailableStock, createReceivedStock;

        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                _req$body = req.body, product_name = _req$body.product_name, product_id = _req$body.product_id, product_quantity = _req$body.product_quantity;
                _context10.next = 4;
                return model.create(req.body);

              case 4:
                user = _context10.sent;
                _context10.next = 7;
                return availableStockModel.findOne({
                  product_id: product_id
                }).exec();

              case 7:
                getStock = _context10.sent;

                if (!(getStock && Object.keys(getStock).length > 0 && getStock.product_name)) {
                  _context10.next = 18;
                  break;
                }

                quantity_received = getStock.quantity_received, remaining_quantity = getStock.remaining_quantity, _id = getStock._id, _product_name = getStock.product_name, _product_id = getStock.product_id;
                updateQuantity = Number(quantity_received) + Number(product_quantity);
                updateRemainingQuantity = Number(remaining_quantity) + Number(product_quantity);
                updateStock = {
                  product_name: _product_name,
                  product_id: _product_id,
                  quantity_received: updateQuantity,
                  remaining_quantity: updateRemainingQuantity,
                  isLow: updateRemainingQuantity > 20 ? false : true
                };
                _context10.next = 15;
                return availableStockModel.findByIdAndUpdate({
                  _id: _id
                }, updateStock, {
                  new: true
                }).exec();

              case 15:
                updatedUser = _context10.sent;
                _context10.next = 21;
                break;

              case 18:
                _context10.next = 20;
                return availableStockModel.create({
                  product_name: product_name,
                  product_id: product_id,
                  quantity_received: product_quantity,
                  remaining_quantity: product_quantity,
                  isLow: false
                });

              case 20:
                createAvailableStock = _context10.sent;

              case 21:
                _context10.next = 23;
                return model.create(user);

              case 23:
                createReceivedStock = _context10.sent;
                res.status(201).json({
                  message: 'User added into account',
                  data: user
                });
                _context10.next = 30;
                break;

              case 27:
                _context10.prev = 27;
                _context10.t0 = _context10["catch"](0);
                res.status(400).send({
                  error: _context10.t0.message
                });

              case 30:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 27]]);
      }));

      return function (_x21, _x22) {
        return _ref10.apply(this, arguments);
      };
    }()
  );
};

exports.createStock = createStock;

var filterWeekly = function filterWeekly(model) {
  return (/*#__PURE__*/function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(req, res) {
        var m, start, endOfStart, result;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                m = (0, _moment.default)();
                start = m.startOf('week').startOf('day').toDate();
                endOfStart = m.endOf('week').endOf('day').toDate();
                console.log('lolololol', endOfStart);
                _context11.next = 7;
                return model.aggregate([//match will get all sale_items of the week with respect to start and endDate
                {
                  $match: {
                    $or: [{
                      time: {
                        $gte: start,
                        $lt: endOfStart
                      }
                    }]
                  }
                }, //project will add day on the base of time like day 1 or day 2
                {
                  $project: {
                    day: {
                      $dayOfWeek: '$time'
                    },
                    total_sale_price: 1
                  }
                }, //grroup will group data on the base of day and will calculate the total sale
                {
                  $group: {
                    _id: '$day',
                    sale: {
                      $sum: '$total_sale_price'
                    }
                  }
                }]);

              case 7:
                result = _context11.sent;
                res.status(200).json(result);
                _context11.next = 14;
                break;

              case 11:
                _context11.prev = 11;
                _context11.t0 = _context11["catch"](0);
                res.status(400).send({
                  error: _context11.t0.message
                });

              case 14:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 11]]);
      }));

      return function (_x23, _x24) {
        return _ref11.apply(this, arguments);
      };
    }()
  );
};

exports.filterWeekly = filterWeekly;

var filterMonthly = function filterMonthly(model) {
  return (/*#__PURE__*/function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(req, res) {
        var users;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                _context12.next = 3;
                return model.aggregate([{
                  /* group by week */
                  $group: {
                    _id: {
                      $month: '$time'
                    },
                    count: {
                      $sum: '$total_sale_price'
                    }
                  }
                }]).exec();

              case 3:
                users = _context12.sent;
                res.status(200).json(users);
                _context12.next = 10;
                break;

              case 7:
                _context12.prev = 7;
                _context12.t0 = _context12["catch"](0);
                res.status(400).send({
                  error: _context12.t0.message
                });

              case 10:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 7]]);
      }));

      return function (_x25, _x26) {
        return _ref12.apply(this, arguments);
      };
    }()
  );
};

exports.filterMonthly = filterMonthly;

var crudControllers = function crudControllers(model, second) {
  return {
    getAll: getAll(model),
    create: create(model),
    update: update(model),
    remove: remove(model),
    filter: filter(model),
    createBill: createBill(model, second),
    filterBillByDate: filterBillByDate(model),
    getSalesData: getSalesData(model),
    createStock: createStock(model, second),
    filterWeekly: filterWeekly(model),
    filterMonthly: filterMonthly(model),
    getUnpaidBills: getUnpaidBills(model)
  };
};

exports.crudControllers = crudControllers;