import { Router } from "express";
import DeliveryAddressController from "../controller/address.js";
import {authentication} from "../authentication/authenticator.js"
const rootRouter = new Router();

const deliveryAddressController = new DeliveryAddressController();


rootRouter.post(
  "/v1/delivery_address",
  authentication(),

  deliveryAddressController.deliveryAddress
);

rootRouter.get(
  "/v1/delivery_address",
  authentication(),

  deliveryAddressController.onDeliveryAddressDetails,
);

// rootRouter.post(
//   "/v1/update_delivery_address/:id",
//   authentication(),

//   deliveryAddressController.updateDeliveryAddress
// );

rootRouter.delete(
  "/v1/delete_delivery_address/:id",
  authentication(),
  deliveryAddressController.deleteDeliveryAddress
);


//#endregion
export default rootRouter;