import {Router} from 'express';

import CartController from '../controller/cart.js';
const rootRouter = new Router();

const cartController = new CartController();

rootRouter.post(
    '/v1/cart/:userId/:deviceId',
    cartController.addItem,
);

rootRouter.get(
    '/v1/cart/:userId/:deviceId',
    cartController.getCartItem
);

rootRouter.delete(
    '/v1/all/cart/:userId/:deviceId',
    cartController.clearCart,
);

rootRouter.delete(
    '/v1/cart/:userId/:itemId',
    cartController.removeItem,
);

rootRouter.put(
    '/v1/cart/:userId/:itemId',
    cartController.updateItem,
);

//#endregion
export default rootRouter;
