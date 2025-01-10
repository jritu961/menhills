import React, { useState, useEffect } from 'react';
import { Header } from "../components/header";
import { NavbarComponentData } from "../components/navbarContent";
import { NavbarComponent } from "../components/navbar";
import styled from 'styled-components';
import { Footer } from "../components/footer";
import Sidebar from '../components/sideBar';
const HeaderContainer = styled.div`
  display:flex;
  height: 80px; /* Adjust the height as needed */
  background-color: #2c3e50;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  z-index: 1000;
  
  @media (max-width: 768px) {
   justify-content:center;
}


`;

const HeaderTitle = styled.h3`
  font-size: 22px;
  color: #ecf0f1;
  @media (max-width: 768px) {
    /* flex-direction: column; */
    display:none;
  }
`;

const FilterButtonContainer = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    /* flex-direction: column; */
    justify-content:center;
    align-items: center;

  }
  @media (max-width: 510px) {
    gap: 2px;
    padding:2px;
}
`;

const FilterButton = styled.button`
  padding: 10px;
  background-color: #f28c00;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d17a00;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
  @media (max-width: 510px) {
    padding: 3px;
    display:none;
    flex-direction:column;
}
`;

const OrderHistoryContainer = styled.div`
margin-left:350px;
  flex-direction: row;
  transition: all 0.3s;
  @media (max-width: 768px) {
    margin-left:50px;
  }
  @media (max-width: 768px) {
             padding-left: 0;
  }
`;

const OrdersContainer = styled.div`

display:flex;
justify-content:center;
flex-direction:column;
max-width:100%;
  padding: 20px;
  background-color: #f9f9f9;
  overflow-y: auto;
  box-sizing: border-box;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const OrderCard = styled.div`

  background-color: #fff;
  padding: 25px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  max-width: 850px;
  transition: transform 0.3s, box-shadow 0.3s;
  animation: fadeIn 0.5s ease-out;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media (max-width: 1300px) {
    max-width: 550px;
  }
  @media (max-width: 1300px) {
    max-width: 380px;
  }
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
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
  font-size: 18px;
  font-weight: bold;
  color: #f28c00;
`;

const OrderStatus = styled.div`
  color: #fff;
  padding: 8px 16px;
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
  margin-top: 15px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ProductImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;
const ImageContainer = styled.div`
  flex: 1;
  background-color: #eef2f3;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  padding: 20px;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
const ProductInfo = styled.div`
  margin-left: 15px;

  @media (max-width: 768px) {
    margin-left: 0;
  }
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
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await fetch(`${process.env.REACT_APP_BASE_URL_Buyer}/order`, {
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!fetchedOrders.ok) {
          console.error("Error fetching orders:", fetchedOrders.statusText);
          throw new Error(`Failed to fetch orders: ${fetchedOrders.statusText}`);
        }

        const orders = await fetchedOrders.json();
        setOrders(orders.data);
        setFilteredOrders(orders.data);
      } catch (error) {
        console.error("Error in fetchOrders:", error.message);
      }
    };

    fetchOrders();
  }, [token]);

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === selectedStatus));
    }
  }, [selectedStatus, orders]);

  return (
    <>
    <div style={{display:"flex",flexDirection:"column"}}>    <Header />
      <NavbarComponent styled={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '1000' }} />
      <NavbarComponentData styled={{ position: 'fixed', top: '0', left: '0', right: '0', zIndex: '1000' }} />
      <HeaderContainer>
        <HeaderTitle>Order History</HeaderTitle>
        <FilterButtonContainer>
          <FilterButton onClick={() => setSelectedStatus('All')}>All</FilterButton>
          <FilterButton onClick={() => setSelectedStatus('Completed')}>Completed</FilterButton>
          <FilterButton onClick={() => setSelectedStatus('Pending')}>Pending</FilterButton>
          <FilterButton onClick={() => setSelectedStatus('Cancelled')}>Cancelled</FilterButton>
          <FilterButton onClick={() => setSelectedStatus('Returned')}>Returned</FilterButton>
        </FilterButtonContainer>
      </HeaderContainer>
     

      <OrderHistoryContainer>
        
        <OrdersContainer>
          {filteredOrders.map((order) => (
            <OrderCard key={order._id}>
              <OrderHeader>
                <div>
                  <OrderId>{order._id}</OrderId>
                  <OrderDate>{new Date(order.createdAt).toLocaleDateString()}</OrderDate>
                </div>
                <OrderAmount>₹{order.price}</OrderAmount>
              </OrderHeader>
              <OrderStatus status={order.order_recon_status}>
                {order.is_order_confirmed ? 'Confirmed' : 'Pending'}
              </OrderStatus>
              <div>
                <h4>Items:</h4>
                {order.items.map((item) => (
                  <ProductDetails key={item.item_id}>
                    <ProductImage src={item.images[0]} alt={item.name} />
                    <ProductInfo>
                      <ProductName>{item.name}</ProductName>
                      <ProductColor>Color: {item.color}</ProductColor>
                      <p>Size: {item.size}</p>
                    </ProductInfo>
                  </ProductDetails>
                ))}
              </div>
            </OrderCard>
          ))}
        </OrdersContainer>
       
      </OrderHistoryContainer>
      <Sidebar/>
      <Footer/>
      </div>
  
    </>
  );
};

export default OrderHistoryPage;
