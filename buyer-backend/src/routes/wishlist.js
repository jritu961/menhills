import {Router} from 'express';
;

import WishlistController from '../controller/wishlist.js';

const rootRouter = new Router();

const wishListController = new WishlistController();
// -- /:deviceId


rootRouter.post(
    '/v1/wishlist/:userId/:deviceId',wishListController.addItem
);

rootRouter.get(
    '/v1/wishlist/:userId/:deviceId',
    wishListController.getWishlistItem
);

rootRouter.delete(
    '/v1/all/wishlist/:userId/:deviceId',
    wishListController.clearWishlist,
);

rootRouter.delete(
    '/v1/item/wishlist/:userId/:deviceId/:itemId',
    wishListController.removeWishlistItem,
);

rootRouter.delete(
    '/v1/wishlist/:userId/:withlist_id',
    wishListController.removeWishlistItemById,
);

rootRouter.put(
    '/v1/wishlist/:userId/:itemId',
    wishListController.updateWishlistItem,
);


//#endregion
export default rootRouter;
