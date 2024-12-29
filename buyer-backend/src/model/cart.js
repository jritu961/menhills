import mongoose from 'mongoose';

// Cart Schema
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',  // Assuming you have a User model
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',  // Assuming you have a Product model
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        image: {
          type: String,  // URL to the product image
        },
      },
    ],
    totalPrice: {
      type: Number,
      default: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

// Cart Model
const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
