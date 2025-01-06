
import WishList from '../model/wishlist.js';
import WishlistItem from "../model/wishlistItem.js"

class WishListService {
  async addItem(data) {
    try {
      let wishlist, wishlist_ids = [], device_wishlist, login_wishlist;
      if (data.wishlist_key && data.wishlist_key != "undefined") {
        wishlist = await WishList.findOne({ wishlist_key: data.wishlist_key });
        if (wishlist?._id) {
          wishlist_ids.push(wishlist?._id)
          device_wishlist = wishlist?._id
        }

      } 
      if (data.userId && (data.userId != "null" && data.userId != "undefined" && data.userId != "guestUser")) {
        wishlist = await WishList.findOne({ userId: data.userId });
        if (wishlist?._id) {
          wishlist_ids.push(wishlist?._id)
          login_wishlist = wishlist?._id
        }
      }

      if (wishlist_ids.length) {
        const existingItem = await WishlistItem.findOne({ "item.id": data.id, "wishlist": (device_wishlist ? device_wishlist : login_wishlist) });
        if (existingItem) {
          return { status: "error", message: "Item already exists in wishlist" };
        } else {
          let wishlistItem = new WishlistItem();
          wishlistItem.wishlist = device_wishlist ? device_wishlist : login_wishlist;
          wishlistItem.item = data;
          wishlistItem.added = true
          const saveData = await wishlistItem.save();
          return saveData
        }

      } else {
        let wishlist = {};
        if (data.wishlist_key && (!data.userId || data.userId == "undefined" || data.userId == "guestUser")) {
          wishlist = { ...wishlist,
            wishlist_key: data.wishlist_key,
          }

        }
        if (data.userId && (data.userId != "null" && data.userId != "undefined" && data.userId != "guestUser")) {
          wishlist = { ...wishlist,
            userId: data.userId,
          }
        }

        const saved_wishlist = await new WishList({
          wishlist_key: data.wishlist_key,
        }).save();
        
        let wishlistItem = new WishlistItem();
        wishlistItem.wishlist = saved_wishlist._id;
        wishlistItem.item = data;
        wishlistItem.added = true

        let wishlistdata = await wishlistItem.save();
        return wishlistdata

      }
    } catch (err) {
      throw err;
    }
  }

  async getWishlistItem(data) {
    try {
      let wishlist, wishlist2;
      if (data.wishlist_key) {
        wishlist = await WishList.findOne({ wishlist_key: data.wishlist_key });
      } 
      if (data.userId && (data.userId != "null" && data.userId != "undefined" && data.userId != "guestUser")) {
        wishlist2 = await WishList.findOne({ userId: data.userId });
      }
      let wishlistIds = []
      if (wishlist?._id) wishlistIds.push(wishlist?._id)
      if (wishlist2?._id) wishlistIds.push(wishlist2?._id)
      let wishlistData = await WishlistItem.find({ wishlist: { $in: wishlistIds } });

      return wishlistData;
    } catch (err) {
      throw err;
    }
  }

  async wishlistCart(req, res, next) {
    try {
      return res.send(await cartService.clearCart({ ...req.params }));
    }
    catch (err) {
      next(err);
    }
  }
  
  async clearWishlist(data) {
    try {
      let wishlist = {}, wishlist2 = {};
      if (data.wishlist_key) {
        wishlist = await WishList.findOne({ wishlist_key: data.wishlist_key });
      } 
      if (data.userId && (data.userId != "null" && data.userId != "undefined" && data.userId != "guestUser")) {
        wishlist2 = await WishList.findOne({ userId: data.userId });
      }
      let wishlistIds = []
      if (wishlist?._id) wishlistIds.push(wishlist?._id)
      if (wishlist2?._id) wishlistIds.push(wishlist2?._id)
      await WishlistItem.deleteMany({ wishlist: { $in: wishlistIds } });
      return await WishList.deleteOne({ _id: { $in: wishlistIds } });
    } catch (err) {
      throw err;
    }
  }

  async removeWishlistItem(data) {
    try {
      let wishlist, wishlist2;
      if (data.wishlist_key) {
        wishlist = await WishList.findOne({ wishlist_key: data.wishlist_key });
      } 
      if (data.userId && (data.userId != "null" && data.userId != "undefined" && data.userId != "guestUser")) {
        wishlist2 = await WishList.findOne({ userId: data.userId });
      }
      let wishlistIds = []
      if (wishlist?._id) wishlistIds.push(wishlist?._id)
      if (wishlist2?._id) wishlistIds.push(wishlist2?._id)

      return await WishlistItem.deleteOne({ wishlist: { $in: wishlistIds }, "item.product.id": data.itemId });
    } catch (err) {
      throw err;
    }
  }

  async removeWishlistItemById(data) {
    try {
      return await WishlistItem.deleteOne({ _id: data.withlist_id });
    } catch (err) {
      throw err;
    }
  }

  async updateWishlistItem(data) {
    try {
      let wishlistItem = await WishlistItem.findOne({ _id: data.itemId });
      wishlistItem.item = data;
      return await wishlistItem.save();
    } catch (err) {
      throw err;
    }
  }

}


export default WishListService;
