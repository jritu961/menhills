import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

const PaymentPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 20px;
  background-color: #fffaf3;
  font-family: 'Arial', sans-serif;
`;

const PaymentButton = styled.button`
  padding: 12px 24px;
  background-color: #dc6f00;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #bf5e00;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RazorPayPaymentPage = ({ totalAmount }) => {
  const navigate = useNavigate(); // Hook to navigate to order history page
  const token=localStorage.getItem("authToken")
  const handleRazorpayPayment = async () => {
    console.log("tokennn",token)

    try {
      const order = await fetch(`${process.env.REACT_APP_BASE_URL_Buyer}/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalAmount }), // Pass total amount
      }).then((res) => res.json());

      const options = {
        key: "rzp_test_ppnch0jTkkUkKU", 
        amount: order.amount,
        currency: order.currency,
        name: "Men's Wear Store",
        description: "Purchase Men's Wear",
        image: "https://your-logo-url.com",
        order_id: order.id,
        handler: (response) => {
          // alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
          navigate("/order"); // Redirect to order history page on success
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Customer Address",
        },
        modal: {
          iframe: false,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error initiating Razorpay payment:", error);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <PaymentPageContainer>
      <h2>Complete Your Payment</h2>
      <p>Total Amount: ₹{totalAmount}</p>
      <PaymentButton onClick={handleRazorpayPayment}>
        Proceed to Pay
      </PaymentButton>
    </PaymentPageContainer>
  );
};

export default RazorPayPaymentPage;
