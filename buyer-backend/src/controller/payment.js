import Razorpay from "razorpay";
import crypto from "crypto";

const razorpay = new Razorpay({
  key_id: "rzp_test_ppnch0jTkkUkKU",
  key_secret: "yydc1erOVUl4u53UFj9jtFSI",
});

export const createOrder = async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Verify Payment API endpoint
export const verifyPayment = (req, res) => {
  const { payment_id, order_id, signature } = req.body; // Data received from frontend
  const body = `${order_id}|${payment_id}`; // Concatenate order_id and payment_id

  // Generate a Razorpay signature
  const generated_signature = crypto
    .createHmac("sha256", "yydc1erOVUl4u53UFj9jtFSI") // Your Razorpay key secret
    .update(body)
    .digest("hex");

  // Compare generated signature with the received signature
  if (generated_signature === signature) {
    res.status(200).json({ success: true, message: "Payment successful" });
  } else {
    res.status(400).json({ success: false, message: "Payment verification failed" });
  }
};
