import Cart from "../model/cart.js";

// Add item to cart (creating a new document or updating existing)
export const addItemToCart = async (req, res) => {
    const { userId, productId, name, price, quantity } = req.body;
    const image = req.file
    console.log("image7",image)
    try {
      // Find cart for the specific user
      let cart = await Cart.findOne({ userId });

      if (!cart) {
        // If no cart found for the user, create a new cart
        cart = new Cart({ userId, items: [] });
      }

      // Check if the item already exists in the cart
      const existingItem = cart.items.find(item => item.productId.toString() === productId);

      if (existingItem) {
        // Update the quantity of the existing item
        existingItem.quantity += quantity;
      } else {
        // Add a new item to the cart
        cart.items.push({ productId, name, price, quantity, image });
      }

      // Save the cart
      await cart.save();
      res.status(201).json({ message: 'Item added to cart', cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

// Get all items in the cart for a specific user
export const getCartItems = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json({ cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item quantity in cart
export const updateCartItem = async (req, res) => {
  const { userId, productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.productId.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;

    await cart.save();
    res.status(200).json({ message: 'Item quantity updated', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove item from cart
export const removeCartItem = async (req, res) => {
  const { userId, productId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const index = cart.items.findIndex(item => item.productId.toString() === productId);

    if (index === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cart.items.splice(index, 1); // Remove the item from the array
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Clear all items from the cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = []; // Empty the cart items array
    await cart.save();

    res.status(200).json({ message: 'Cart cleared', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
