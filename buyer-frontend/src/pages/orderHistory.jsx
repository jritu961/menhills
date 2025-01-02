import React, { useState, useEffect } from 'react';
import { Header } from "../components/header"
import { NavbarComponentData } from "../components/navbarContent"
import {NavbarComponent} from "../components/navbar"
import styled from 'styled-components';
import {Footer} from "../components/footer"

const SidebarContainer = styled.div`
  width: 250px;
  padding: 20px;
  color: white;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    /* display:flex; */
    gap:5px;
    width: 200px;
    left: ${(props) => (props.isOpen ? '0' : '-250px')};
    top: 0;
    transition: left 0.3s ease;
  }
`;

const SidebarTitle = styled.h3`
  text-align: center;
  font-size: 20px;
  margin-bottom: 20px;
`;

const SidebarButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f28c00;
  border: none;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  color: white;
  text-align: left;
  border-radius: 5px;

  &:hover {
    background-color: #d17a00;
  }
`;

const OrderHistoryContainer = styled.div`
  display: flex;
  flex-direction: row;
  /* padding-left: 260px; */
  /* transition: padding-left 0.3s ease; */

  @media (max-width: 768px) {
    flex-direction: column;
    padding-left: 0;
  }
`;

const OrdersContainer = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #fff;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const OrderCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  align-items: center;
`;

const OrderId = styled.h4`
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const OrderDate = styled.p`
  font-size: 14px;
  color: #888;
`;

const OrderAmount = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #f28c00;
`;

const OrderStatus = styled.div`
  color: f4a261;
  padding: 8px 12px;
  background-color: ${(props) => {
    if (props.status === 'Completed') return '#6c9e3b';
    if (props.status === 'Cancelled') return '#e74c3c';
    if (props.status === 'Pending') return '#f39c12';
    return '#8e44ad';
  }};
  border-radius: 20px;
  font-weight: bold;
  display: inline-block;
`;

const ProductDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductInfo = styled.div`
  margin-left: 15px;
`;

const ProductName = styled.p`
  font-size: 16px;
  color: #333;
  font-weight: bold;
`;

const ProductColor = styled.p`
  font-size: 14px;
  color: #888;
`;

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = [
        {
          orderId: 'ORD123',
          date: '2025-01-01',
          amount: 2500,
          status: 'Completed',
          products: [
            {
              image: 'https://via.placeholder.com/50',
              name: 'Men\'s T-Shirt',
              price: 500,
              color: 'Red',
            },
          ],
        },
        {
          orderId: 'ORD124',
          date: '2025-01-02',
          amount: 3000,
          status: 'Pending',
          products: [
            {
              image: 'https://via.placeholder.com/50',
              name: 'Women\'s Jacket',
              price: 1500,
              color: 'Black',
            },
          ],
        },
        {
          orderId: 'ORD125',
          date: '2025-01-03',
          amount: 1500,
          status: 'Cancelled',
          products: [
            {
              image: 'https://via.placeholder.com/50',
              name: 'Men\'s Jeans',
              price: 1200,
              color: 'Blue',
            },
          ],
        },
      ];
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === selectedStatus));
    }
  }, [selectedStatus, orders]);

  return (
<>
<Header/>
<NavbarComponent/>
<NavbarComponentData/>
<OrderHistoryContainer>
      <SidebarContainer isOpen={isSidebarOpen}>
        <SidebarTitle>Order Status</SidebarTitle>
        <SidebarButton onClick={() => setSelectedStatus('All')}>All</SidebarButton>
        <SidebarButton onClick={() => setSelectedStatus('Completed')}>Completed</SidebarButton>
        <SidebarButton onClick={() => setSelectedStatus('Pending')}>Pending</SidebarButton>
        <SidebarButton onClick={() => setSelectedStatus('Cancelled')}>Cancelled</SidebarButton>
        <SidebarButton onClick={() => setSelectedStatus('Returned')}>Returned</SidebarButton>
      </SidebarContainer>

      <OrdersContainer>
        <h2>Order History</h2>
        {filteredOrders.map((order) => (
          <OrderCard key={order.orderId}>
            <OrderHeader>
              <div>
                <OrderId>{order.orderId}</OrderId>
                <OrderDate>{order.date}</OrderDate>
              </div>
              <OrderAmount>₹{order.amount}</OrderAmount>
            </OrderHeader>
            <OrderStatus status={order.status}>{order.status}</OrderStatus>
            <div>
              {order.products.map((product, index) => (
                <ProductDetails key={index}>
                  <ProductImage src={product.image} alt={product.name} />
                  <ProductInfo>
                    <ProductName>{product.name}</ProductName>
                    <ProductColor>Color: {product.color}</ProductColor>
                  </ProductInfo>
                </ProductDetails>
              ))}
            </div>
          </OrderCard>
        ))}
      </OrdersContainer>
    </OrderHistoryContainer>
    <Footer/>
    </>
  );
};

export default OrderHistoryPage;
