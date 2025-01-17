
import WishList from '../model/wishlist.js';
import WishlistItem from "../model/wishlistItem.js"

class WishListService {
  async addItem(data) {
    try {
      const { deviceId, userId, id } = data;

      let wishlist, wishlistId;

      // Check for existing wishlist
      if (deviceId) {
        wishlist = await WishList.findOne({ deviceId });
      }
      if (userId && userId !== "guestUser") {
        wishlist = await WishList.findOne({ userId });
      }

      // If wishlist exists, check for duplicate item
      if (wishlist?._id) {
        wishlistId = wishlist._id;

        const existingItem = await WishlistItem.findOne({
          "item.item_id": data.item_id,
          wishlist: wishlistId,
        });
        if (existingItem) {
          return { status: "error", message: "Item already exists in wishlist" };
        }
      }

      // If no wishlist exists, create one
      if (!wishlist) {
        wishlist = new WishList({
          deviceId:deviceId,
          userId: userId !== "guestUser" ? userId : undefined,
        });
        const result=await wishlist.save();
        wishlistId = wishlist._id;
      }

      // Add item to wishlist
      const wishlistItem = new WishlistItem({
        wishlist: wishlistId,
        item: data,
        added: true,
      });
      const savedItem = await wishlistItem.save();
      return { status: "success", data: savedItem };
    } catch (err) {
      console.error("Error adding item to wishlist:", err);
      throw new Error("Unable to add item to wishlist");
    }
  }

  async getWishlistItem(data) {
    try {
      const { deviceId, userId } = data;

      // Find wishlist(s)
      const wishlistIds = [];
      if (deviceId) {
        const wishlist = await WishList.findOne({ deviceId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }
      if (userId && userId !== "guestUser") {
        const wishlist = await WishList.findOne({ userId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }

      if (!wishlistIds.length) {
        return { status: "error", message: "No wishlist found" };
      }

      // Get wishlist items
      const wishlistItems = await WishlistItem.find({
        wishlist: { $in: wishlistIds },
      });
      return { status: "success", data: wishlistItems };
    } catch (err) {
      console.error("Error fetching wishlist items:", err);
      throw new Error("Unable to fetch wishlist items");
    }
  }

  async clearWishlist(data) {
    try {
      const { deviceId, userId } = data;
      const wishlistIds = [];

      // Get wishlist IDs
      if (deviceId) {
        const wishlist = await WishList.findOne({ deviceId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }
      if (userId && userId !== "guestUser") {
        const wishlist = await WishList.findOne({ userId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }

      if (!wishlistIds.length) {
        return { status: "error", message: "No wishlist found to clear" };
      }

      // Clear wishlist items and wishlist
      await WishlistItem.deleteMany({ wishlist: { $in: wishlistIds } });
      await WishList.deleteMany({ _id: { $in: wishlistIds } });

      return { status: "success", message: "Wishlist cleared successfully" };
    } catch (err) {
      console.error("Error clearing wishlist:", err);
      throw new Error("Unable to clear wishlist");
    }
  }

  async removeWishlistItem(data) {
    try {
      const { deviceId, userId, itemId } = data;
      const wishlistIds = [];

      // Get wishlist IDs
      if (deviceId) {
        const wishlist = await WishList.findOne({ deviceId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }
      if (userId && userId !== "guestUser") {
        const wishlist = await WishList.findOne({ userId });
        if (wishlist?._id) wishlistIds.push(wishlist._id);
      }

      if (!wishlistIds.length) {
        return { status: "error", message: "No wishlist found" };
      }
      // Remove item from wishlist
      const result = await WishlistItem.deleteOne({
        wishlist: { $in: wishlistIds },
        "item.item_id": itemId,
      });

      if (result.deletedCount === 0) {
        return { status: "error", message: "Item not found in wishlist" };
      }
      return { status: "success", message: "Item removed from wishlist" };
    } catch (err) {
      console.error("Error removing wishlist item:", err);
      throw new Error("Unable to remove item from wishlist");
    }
  }

  async updateWishlistItem(data) {
    try {
      const { itemId, ...updatedData } = data;
      const wishlistItem = await WishlistItem.findOne({ _id: itemId });

      if (!wishlistItem) {
        return { status: "error", message: "Wishlist item not found" };
      }

      wishlistItem.item = updatedData;
      const updatedItem = await wishlistItem.save();
      return { status: "success", data: updatedItem };
    } catch (err) {
      console.error("Error updating wishlist item:", err);
      throw new Error("Unable to update wishlist item");
    }
  }

  async removeWishlistItemById(data) {
    try {
      const { wishlistId } = data;
      const result = await WishlistItem.deleteOne({ _id: wishlistId });

      if (result.deletedCount === 0) {
        return { status: "error", message: "Wishlist item not found" };
      }
      return { status: "success", message: "Wishlist item removed successfully" };
    } catch (err) {
      console.error("Error removing wishlist item by ID:", err);
      throw new Error("Unable to remove wishlist item by ID");
    }
  }
}



export default WishListService;
