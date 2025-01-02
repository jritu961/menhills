import Razorpay from "razorpay";

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
