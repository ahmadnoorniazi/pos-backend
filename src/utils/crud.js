import dateFormat from "dateformat";

import mongoose from "mongoose";
import moment from "moment";

/**Get All Users */
const getAll = model => async (req, res) => {
  try {
      const users = await model
        .find({})
        .exec();
      res.status(200).json(users);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

/** Create New User*/
export const create = model => async (req, res) => {
  try {
      const user = await model.create(req.body);
      res.status(201).json({ message: "User added into account", data: user });
      res
        .status(201)
        .json({ message: "Manager added into account", data: user })
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};
/** Edit User */
const update = model => async (req, res) => {
  try {
      const { id } = req.params;
      const updatedUser = await model
        .findByIdAndUpdate(id, req.body, { new: true })
        .exec();
      await updatedUser.save();
      res
        .status(201)
        .json({ message: "User info updated into account", data: updatedUser });
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

/** Delete User  */
const remove = model => async (req, res) => {
  try {
      const { id } = req.params;
      const removedUser = await model.findByIdAndRemove(id);
      const updatedList = await model.find({ role: "developer" }).exec();
      res
        .status(201)
        .json({ message: "User info removed from account", data: updatedList });
  } catch (e) {
    res.status(400).send({
      message: e.message
    });
  }
};

async function updateAllProduct(availableStockModel,list){
  if (Array.isArray(list) && list.length > 0){
  for (var i =0; i < list.length; i++){
    const {quantity, _id} = list[i]
    const getStock = await availableStockModel.findOne({product_id: _id}).exec()
    if (getStock && Object.keys(getStock).length > 0 && getStock.product_name){
      const { quantity_received, remaining_quantity, _id, product_name, product_id} = getStock
      const updateRemainingQuantity = Number(remaining_quantity) >= 0 ?  Number(remaining_quantity) - Number(quantity) : 0
      const updateStock = {product_name,product_id ,quantity_received,remaining_quantity:updateRemainingQuantity >=0 ?updateRemainingQuantity:0 , isLow: updateRemainingQuantity > 20 ? false : true  }
      const updatedUser = await availableStockModel
        .findByIdAndUpdate({_id: _id},updateStock , { new: true })
        .exec();
    }
  }
}
}

export const createBill = (model, availableStockModel) => async (req, res) => {
  try {
    let total_actual_price = 0
    if (req.body && Array.isArray(req.body.items) && req.body.items.length > 0){
      total_actual_price = req.body.items.reduce((acc, dec) => acc + Number(dec.actual_price),0)
    }
    const updateBill = {...req.body, total_actual_price, ...(!req.body.discount && {discount: 0})}
    const bill = await model.create(updateBill);
    await updateAllProduct(availableStockModel,req.body.items)
      res.status(201).json({ message: "Bill added into account", data: bill });
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

export const filterBillByDate = model => async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
   
      const users = await model
        .find({ time: {$gte: `${startDate}`, $lte:`${endDate}`}})
        .exec();
        console.log('usersssssssss', users)
      res.status(200).json(users);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

const filter = model => async (req, res) => {
  try {
    const { search } = req.params;

      const users = await model
        .find({ name: { $regex: search , "$options": "i"} })
        .exec();
      res.status(200).json(users);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

const getSalesData = model => async (req, res) => {
  try {
    let total_sale = 0
    let total_actual = 0
    let total_discount = 0
    let total_profit = 0
      const bills = await model
        .find({})
        .exec();
        console.log('billllss', bills)
    total_sale = bills.reduce((acc, dec) => {
      if (dec["total_sale_price"]){
        acc += Number(dec["total_sale_price"])
        total_discount += Number(dec["discount"])
        return acc
      }
      return acc
    },0)
    total_actual = bills.reduce((acc, dec) => {
      if (dec["total_actual_price"]){
        acc += Number(dec["total_actual_price"])
        return acc
      }
      return acc
    },0)
    total_profit = total_sale - total_actual - total_discount
      res.status(200).json({total_sale, total_actual, total_profit, total_discount});
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

export const createStock = (model, availableStockModel) => async (req, res) => {
  try {
    const {product_name, product_id, product_quantity} = req.body
    const user = await model.create(req.body);
    const getStock = await availableStockModel.findOne({product_id: product_id}).exec()

    if (getStock && Object.keys(getStock).length > 0 && getStock.product_name){
      const { quantity_received, remaining_quantity, _id, product_name, product_id} = getStock
      const updateQuantity = Number(quantity_received) + Number(product_quantity)
      const updateRemainingQuantity = Number(remaining_quantity) +  Number(product_quantity)
      const updateStock = {product_name,product_id ,quantity_received: updateQuantity, remaining_quantity:updateRemainingQuantity, isLow: updateRemainingQuantity > 20 ? false : true  }
      const updatedUser = await availableStockModel
        .findByIdAndUpdate({_id: _id},updateStock , { new: true })
        .exec();
    } else {
      const createAvailableStock = await availableStockModel.create({product_name,product_id,quantity_received: product_quantity, remaining_quantity: product_quantity, isLow: false })
    }
    const createReceivedStock = await model.create(user)

    res.status(201).json({ message: "User added into account", data: user });

} catch (e) {
  res.status(400).send({
    error: e.message
  });
}
};

async function getWeekData(model){
  let data = []
  var m = moment();
  m.lang('es'); // week start on monday
  for (var i = 0; i<7; i++){
    const  start = m.startOf('week').add(`${i}`,'days').startOf('day').toDate()
    const endOfStart = m.startOf('week').add(`${i}`,'days').endOf('day').toDate()
   const result =  await model.find({ time: {$gte: `${start}`, $lte:`${endOfStart}`}})
   const getTotalSale = result.reduce((acc, dec) => acc+ dec["total_sale_price"] ,0)
    data = [...data, {day:i, sale:getTotalSale}]
  }
 return data
}

export const filterWeekly = model => async (req, res) => {
  try {
    const result = await getWeekData(model)
      res.status(200).json(result);
  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

export const filterMonthly = model => async (req, res) => {
  try {
    const users = await model
.aggregate([
   { /* group by week */ 
"$group": {
  "_id": {$month: "$time"},
  "count": { "$sum": "$total_sale_price" },
}
}
] )
.exec();
res.status(200).json(users);

  } catch (e) {
    res.status(400).send({
      error: e.message
    });
  }
};

export const crudControllers = (model, second) => ({
  getAll: getAll(model),
  create: create(model),
  update: update(model),
  remove: remove(model),
  filter: filter(model),
  createBill: createBill(model,second),
  filterBillByDate: filterBillByDate(model),
  getSalesData: getSalesData(model),
  createStock: createStock(model, second),
  filterWeekly: filterWeekly(model),
  filterMonthly: filterMonthly(model)
});