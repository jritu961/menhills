import React,{useEffect,useState} from "react";
import styled from "styled-components";
import AddressPage from "./address.jsx";
import { useNavigate } from "react-router-dom";

import { Header } from "../components/header"
import {NavbarComponent} from "../components/navbar"
import {Footer} from "../components/footer"





const CheckoutPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #fffaf3;
`;

const OrderSummary = styled.div`
  padding: 20px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const PaymentOptions = styled.div`
  padding: 20px;
  border: 1px solid #f4a261;
  border-radius: 8px;
  background-color: #fff8ed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
  font-size: 16px;
  color: #6a4f4b;
`;

const Total = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: #dc6f00;
  margin-top: 15px;
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

const Heading = styled.h2`
  font-size: 24px;
  color: #dc6f00;
  border-bottom: 2px solid #f4a261;
  padding-bottom: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin: 10px 0;
  font-size: 16px;
  color: #6a4f4b;

  input {
    margin-right: 10px;
  }
`;



// ... Styled components for OrderSummary, PaymentOptions, etc.

const CheckoutPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch or filter selected items (example assumes fetching from localStorage or API)
    const cartData = JSON.parse(localStorage.getItem("cart")) || []; // Replace with API call if needed
    console.log("cartData101>>>>>>>>",cartData)
    const selectedItems = cartData.filter((item) => item.isSelected); // Adjust based on your data structure
    console.log("selectedItems>>>>>>>>",selectedItems)

    setOrderItems(cartData);
  }, []);

   const handleRazorpayPayment = async () => {
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
          navigate("/order-history"); // Redirect to order history page on success
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
  const totalAmount = orderItems.reduce(
    (total, item) => total + item.count * item.price,
    0
  );
  console.log("totalAmount>>>>>>>>",totalAmount)




  return (
    <>
      <Header />
      <CheckoutPageContainer>
        <AddressPage />

        <OrderSummary>
          <Heading>Order Summary</Heading>
          {orderItems.length > 0 ? (
            orderItems.map((item, index) => (
              <SummaryItem key={index}>
                 <span>
                 <img src={item.images} alt={item.name} width="50" height="50" />
                 </span>
                <span>
                  {item.name} (x{item.count})
                </span>
                <span>
                  {item.color} 
                </span>
                <span>
                  {item.size} 
                </span>
                <span>₹{item.count * item.price}</span>
              </SummaryItem>
            ))
          ) : (
            <p>No items selected for purchase.</p>
          )}
          <Total>Total: ₹{totalAmount}</Total>
        </OrderSummary>

        <PaymentOptions>
          <Heading>Payment Options</Heading>
          <Label>
            <input type="radio" name="payment" value="cod" /> Cash on Delivery
          </Label>
          <Label>
            <input type="radio" name="payment" value="card" /> Credit/Debit Card
          </Label>
          <Label>
            <input type="radio" name="payment" value="upi" /> UPI
          </Label>
          <PaymentButton onClick={handleRazorpayPayment}>
            Proceed to Pay
          </PaymentButton>
        </PaymentOptions>
      </CheckoutPageContainer>
      <Footer />
    </>
  );
};

export default CheckoutPage;

