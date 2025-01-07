import Razorpay from "razorpay";
import crypto from "crypto";
import Order from '../model/order.js'; // Make sure to adjust the path to your model


const razorpay = new Razorpay({
  key_id: "rzp_test_ppnch0jTkkUkKU",
  key_secret: "yydc1erOVUl4u53UFj9jtFSI",
});

export const createOrder = async (req, res) => {
  const { amount, billing, quote } = req.body;
  console.log("🚀 ~ createOrder ~ req.body:", req.user);
   const {uid:userId}=req.user.decodedToken 
  try {
    // Create Razorpay order
    const razorpayOrder = razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt-${Date.now()}`,
      payment_capture: 1, // Automatically capture payment
    });

    // Save the order in the database
    const orderData = {
      id: razorpayOrder.id,
      billing,
      quote,
      userId,
      transactionId: razorpayOrder.receipt, // Use the receipt or any identifier
    };

   await saveOrderInDB(orderData);

    // Respond with success
    res.json({

      id: razorpayOrder.id,
      amount: amount * 100, // Send amount in paise
       "currency": "INR"
    });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ success: false, message: 'Failed to create order', error: err.message });
  }
};


// Verify Payment API endpoint

export const verifyPayment = (req, res) => {
  try {
    const { payment_id, order_id, signature } = req.body; // Data received from frontend
    console.log("🚀 ~ verifyPayment ~ req.body:", req.body)

    if (!payment_id || !order_id || !signature) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters",
      });
    }

    // Concatenate order_id and payment_id to create the body
    const body = `${order_id}|${payment_id}`;

    console.log("🚀 ~ verifyPayment ~ body:", body)
    // Generate a Razorpay signature using the key secret from environment variables
    const generated_signature = crypto
      .createHmac("sha256", "yydc1erOVUl4u53UFj9jtFSI") // Use key secret from environment variables
      .update(body)
      .digest("hex");
      console.log("🚀 ~ verifyPayment ~ generated_signature:", generated_signature)

    // Compare generated signature with the received signature
    if (generated_signature === signature) {
      console.log("Payment verified successfully:", { payment_id, order_id });
      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      console.error("Payment verification failed: Invalid signature");
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification",
    });
  }
};


const saveOrderInDB = async (orderData) => {
  const newOrder = new Order({
    payment_origin_source: 'Razorpay', // Source of payment
    payment_return_destination: 'some return URL',
    addOns: [], // Add any add-ons if necessary
    billing: orderData.billing,
    fulfillments: [],
    quote: orderData.quote,
    id: orderData.id, // Razorpay order ID
    city: 'CityName',
    state: 'StateName',
    userId: orderData.userId, // User associated with the order
    transactionId: orderData.transactionId,
    paymentStatus: 'NOT-PAID', // You can update later
  });

  try {
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (err) {
    console.error('Error saving order:', err);
    throw err;
  }
};

