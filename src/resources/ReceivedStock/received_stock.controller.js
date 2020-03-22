import ReceivedStock from "./received_stock.mdel";
import { crudControllers } from "../../utils/crud";
import AvailabStocModel from '../availableStock/availableStock.mdel'
export default crudControllers(ReceivedStock,AvailabStocModel);
