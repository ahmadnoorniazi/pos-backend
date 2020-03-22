
import cors from "cors";
import express from "express";
import "./config/mongoose";
import dotenv from "dotenv";
import "core-js/stable";
import "regenerator-runtime/runtime";
import userRoute from "./resources/user/user.router";
import customerRoute from './resources/customersList/customer.router'
import productRoute from './resources/product/product.router'
import Billing from './resources/billing/billing.router';
import ReceivedStock from './resources/ReceivedStock/received_stock.router';
import AvailableStock from './resources/availableStock/availableStock.router';

import { signin, protect } from "./utils/auth";

console.log('fileeeeee runnninggggggggggggggggg')
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

/** Public Routes */
app.use("/signin", signin);

app.use("/user", userRoute);

app.use("/customer", customerRoute);

app.use("/product", productRoute);

app.use("/billing", Billing);
app.use("/received_stock", ReceivedStock);
app.use("/available_stock", AvailableStock);

// app.use("/user", protect); // acts as middleware function

// app.use("/user", userRoute);
// app.use("/time", timingRoute);

const port = process.env.PORT || 3002;

app.listen(port, () => console.log(`Listening on port ${port}...`));
