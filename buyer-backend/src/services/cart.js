import Cart from "../model/cart.js";
import CartItem from "../model/cartItem.js";
import User from "../model/usermodel.js";

class CartService {
  async addItem(data) {
    console.log("🚀 ~ CartService ~ addItem ~ data:", data);
    try {
      let cart;
      // Find or create user cart based on deviceId and userId
      if (
        data.deviceId &&
        data.userId &&
        data.deviceId !== "undefined" &&
        data.userId !== "null" &&
        data.userId !== "undefined" &&
        data.userId !== "guestUser"
      ) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: data.userId }, 
          { $set: { email:data.email } }, 
          { upsert: false }
      );
        console.log("🚀 ~ CartService ~ addItem ~ updatedUser:", updatedUser)
      
        
        cart = await Cart.findOne({ device_id: data.deviceId, userId: data.userId });
        console.log("🚀 ~ CartService ~ addItem ~ cart:", cart)
      }

      if (!cart && data.deviceId && data.deviceId !== "undefined") {
        cart = await Cart.findOne({ device_id: data.deviceId });
      }
      if (!cart && data.userId && data.userId !== "null" && data.userId !== "undefined" && data.userId !== "guestUser") {
        cart = await Cart.findOne({ userId: data.userId });
      }

      if (cart) {
        console.log("🚀 ~ CartService ~ addItem ~ cart._id:", cart._id)
        console.log("🚀 ~ CartService ~ addItem ~ data.id:", data.item_id)
        // Check if the item already exists in the cart
        const existingItem = await CartItem.findOne({ item_id: data.item_id }).lean();
        
        console.log("🚀 ~ CartService ~ addItem ~ existingItem:", existingItem)
        if (existingItem) {
            const updateData = await CartItem.findOneAndUpdate(
                { id: data.id, cart: cart._id },
                { $inc: { count: 1 } },
                { new: true }
            );
            console.log("Updated Item: ", updateData);
            return { status: "success", data: updateData };
        }
        

        // Add new item to the cart
        const cartItem = new CartItem({
          cart: cart._id,
          item_id: data.item_id,
          id: data.id,
          count: data.count,
          images: data.images,
          name: data.name,
          price:data.price,
          color:data.color,
          size:data.size
      
        });
          console.log("🚀 ~ CartService ~ addItem ~ size:data.size:69", data)
        console.log("🚀 ~ CartService ~ addItem ~ cartItem:", cartItem)

        return await cartItem.save();
      } else {
        // Create a new cart and add the item
        cart = {};
        if (data.deviceId && data.deviceId !== "undefined") {
          cart = { ...cart, device_id: data.deviceId };
        }
        if (data.userId && data.userId !== "null" && data.userId !== "undefined" && data.userId !== "guestUser") {
          cart = { ...cart, userId: data.userId };
        }

        const savedCart = await new Cart(cart).save();
        const cartItem = new CartItem({
          cart: savedCart._id,
          item_id: data.item_id,
          id: data.id,
          count: data.count,
          images: data.images,
          name: data.name,
          customisationState: data?.customisationState || null,
          customisations: data?.customisations || null,
          hasCustomisations: data?.hasCustomisations || false,
          color:data.color,
          size:data.size
        });
        console.log("🚀 ~ CartService ~ addItem ~ size:data.size:98", data)

        console.log("🚀 ~ CartService ~ addItem ~ cartItem:", cartItem)

        return await cartItem.save();
      }
    } catch (err) {
      throw err;
    }
  }

  async updateItem(data) {
    console.log("🚀 ~ CartService ~ updateItem ~ data:", data)
    try {
     
        const updateData = await CartItem.findOneAndUpdate(
          { item_id: data.itemId,
            cart:data.cart
           },
          { $set: { count: data?.count ,price:data?.price} },
          { new: true }
        );
            console.log("🚀 ~ CartService ~ updateItem ~ data.cart:", data.cart)
        console.log("🚀 ~ CartService ~ updateItem ~ updateData:", updateData)
        return updateData;
      
    } catch (err) {
      throw err;
    }
  }

  async removeItem(data) {
    try {
      return await CartItem.deleteOne({item_id: data.itemId });
    } catch (err) {
      throw err;
    }
  }

  async clearCart(data) {
    try {
      let cart, cart2, cart3;

      if (data.deviceId && data.deviceId !== "undefined") {
        cart2 = await Cart.findOne({ device_id: data.deviceId });
      }
      if (data.userId && data.userId !== "null" && data.userId !== "undefined" && data.userId !== "guestUser") {
        cart = await Cart.findOne({ userId: data.userId });
        const userDetails = await User.findOne({ userId: data.userId });
        if (userDetails?.device_id) {
          cart3 = await Cart.findOne({ device_id: userDetails.deviceId });
        }
      }

      const cartIds = [cart?._id, cart2?._id, cart3?._id].filter(Boolean);
      if (data?.itemIds?.length) {
        const deletedItems = await CartItem.deleteMany({ cart: { $in: cartIds }, item_id: { $in: data.itemIds } });
        const remainingItems = await CartItem.find({ cart: { $in: cartIds } });
        if (!remainingItems.length) {
          await Cart.deleteMany({ _id: { $in: cartIds } });
        }
        return deletedItems;
      } else {
        await CartItem.deleteMany({ cart: { $in: cartIds } });
        return await Cart.deleteMany({ _id: { $in: cartIds } });
      }
    } catch (err) {
      throw err;
    }
  }

  async getCartItem(data) {
    try {
      let cartIds = [];
  
      // Find cart by deviceId if it exists
      if (data.deviceId && data.deviceId !== "undefined") {
        const cartByDevice = await Cart.findOne({ device_id: data.deviceId }).lean();
        if (cartByDevice?._id) cartIds.push(cartByDevice._id);
      }
  
      // Find cart by userId if it exists
      if (data.userId && !["null", "undefined", "guestUser"].includes(data.userId)) {
        const cartByUser = await Cart.findOne({ userId: data.userId }).lean();
        if (cartByUser?._id) cartIds.push(cartByUser._id);
      }
  
      if (!cartIds.length) return []; // No carts found
  
      // Fetch cart items linked to the cart IDs
      const cartData = await CartItem.find({ cart: { $in: cartIds } }).lean();
      if (!cartData.length) return []; // No items in the cart
  
      // Map and filter to return processed cart data
      return cartData.map(item => ({
        ...item,
      })).filter(Boolean); // Ensure valid items are returned
    } catch (err) {
      throw new Error(`Failed to fetch cart items: ${err.message}`);
    }
  }
  
}

export default CartService;
