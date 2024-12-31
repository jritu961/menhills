import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema(
  {
    item_id: { 
      type: String, 
      required: [true, "Item ID is required"] 
    },
    id: { 
      type: String, 
    },
    size: { 
      type: String, 
    },
    color: { 
      type: String, 
    },
    price:{
      type:Number
    },
    count: { 
      type: Number, 
      required: [true, "Count is required"], 
      min: [1, "Count must be at least 1"] 
    },
    images: { 
      type: String, 
      required: [true, "Image URL is required"], 
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/i.test(v); // Validate URL format
        },
        message: "Invalid image URL format",
      },
    },
    name: { 
      type: String, 
      required: [true, "Item name is required"], 
      trim: true 
    },
    customisationState: { 
      type: mongoose.Schema.Types.Mixed, 
      default: null // Mixed type for custom data
    },
    customisations: { 
      type: mongoose.Schema.Types.Mixed, 
      default: null 
    },
    hasCustomisations: { 
      type: Boolean, 
      default: false 
    },
    cart: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Cart", 
      required: true // Ensures this item belongs to a cart
    },
  },
  { 
    _id: true, 
    timestamps: true // Automatically adds `createdAt` and `updatedAt`
  }
);

const CartItem = mongoose.model("CartItem", CartItemSchema, "cartItems");

export default CartItem;
