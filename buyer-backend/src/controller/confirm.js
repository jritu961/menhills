import mongoose from 'mongoose';
import Order from '../model/order.js'; // Import the Order model





export async function confirmOrder(req, res) {
    const { orderId } = req.body;
    console.log("orderId received:", orderId);
    
    // Validate the orderId format using Mongoose's ObjectId.isValid
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
        return res.status(400).json({ success: false, message: 'Invalid order ID format' });
    }

    try {
        // Attempt to find the order and update it atomically
        const result = await Order.findOneAndUpdate(
            { _id: orderId },  // Find the order by ID
            {
                $set: {
                    is_order_confirmed: true,  // Mark as confirmed
                    refunded_amount: 0,  // Reset refunded amount
                    remaining_cart_value: 0,  // Set remaining cart value to 0
                    settle_status: 'PENDING',  // Set settlement status to pending
                    settlement_reference_no: `GEN-${new Date().getTime()}`,  // Generate a settlement reference number
                    order_recon_status: 'COMPLETED',  // Mark order reconciliation as completed
                }
            },
            { new: true } // Return the updated order
        );

        // Check if the order was found and updated
        if (!result) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        // If the order is already confirmed, return a 400 error
        if (result.is_order_confirmed) {
            return res.status(400).json({ success: false, message: 'Order already confirmed' });
        }

        // Check if payment status is "PAID" and settlement is not done
        if (result.paymentStatus === 'PAID' && !result.is_settlement_done) {
            result.is_settlement_sent = true;  // Mark as settlement sent
            await result.save();  // Save the updated settlement status
        }

        // Optional: Add business logic to notify other systems
        // For example: notifyThirdPartySystem(result); 

        // Respond with a success message
        return res.status(200).json({
            success: true,
            message: 'Order confirmed successfully',
            order: result
        });

    } catch (error) {
        // Log the error for debugging
        console.error('Error confirming order:', error.message);

        // Handle specific MongoDB errors or general ones
        let errorMessage = 'Error confirming order';
        if (error instanceof mongoose.Error) {
            if (error.name === 'CastError') {
                errorMessage = 'Invalid order ID format';
            }
        }

        // Send a failure response with more details
        return res.status(500).json({
            success: false,
            message: errorMessage,
            error: error.message
        });
    }
}




