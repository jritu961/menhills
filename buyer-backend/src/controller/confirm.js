import mongoose from 'mongoose';
import Order from '../model/order.js'; // Import the Order model

export async function confirmOrder(req, res) {
  const data = req.body; // Extract the data from the request body

  // Validate orderId
  if (!data.orderId) {
    return res.status(400).json({ success: false, message: 'Order ID is required' });
  }

  if (!mongoose.Types.ObjectId.isValid(data.orderId)) {
    return res.status(400).json({ success: false, message: 'Invalid Order ID format' });
  }

  try {
    // Update the order with the provided data
    const result = await Order.findOneAndUpdate(
      { _id: data.orderId }, // Find the order by ID
      {
        $set: {
          paymentStatus: data.paymentStatus,
          refunded_amount: 0, // Reset refunded amount
          remaining_cart_value: 0, // Set remaining cart value to 0
          settle_status: 'PENDING', // Set settlement status to pending
          settlement_reference_no: `GEN-${new Date().getTime()}`, // Generate settlement reference number
          order_recon_status: 'COMPLETED', // Mark order reconciliation as completed
          price: data.price,
          items: data.items, // Set the items data from the request body
        },
      },
      { new: true } // Return the updated order
    ).exec(); // Ensure the query is executed as a promise


    // If no order is found
    if (!result) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // If paymentStatus is not 'PAID', do not confirm the order
    if (result.paymentStatus !== 'PAID') {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be confirmed because payment has not been made.',
      });
    }

    // Proceed to confirm the order if payment is 'PAID'
    result.is_order_confirmed = true;
    result.is_settlement_sent = true; // Mark as settlement sent
    await result.save(); // Save the updated settlement status

    // Respond with the updated order
    return res.status(200).json({
      success: true,
      message: 'Order confirmed successfully',
      order: result,
    });
  } catch (error) {
    console.error('Error confirming order:', error.message);

    // Determine specific MongoDB or general errors
    let errorMessage = 'Error confirming order';
    if (error instanceof mongoose.Error) {
      if (error.name === 'CastError') {
        errorMessage = 'Invalid Order ID format';
      }
    }

    // Send a failure response with more details
    return res.status(500).json({
      success: false,
      message: errorMessage,
      error: error.message,
    });
  }
}






