import Billing from "./billing.mdel";
import { crudControllers } from "../../utils/crud";
import AvailabStocModel from '../availableStock/availableStock.mdel'

export default crudControllers(Billing,AvailabStocModel);
