import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SuccessContainer = styled.div`
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const OrderDetails = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    color: #333;
    margin-bottom: 1rem;
  }

  p {
    margin: 0.5rem 0;
    color: #666;
  }
`;

const Button = styled.button`
  background: #ff6b35;
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: #e85d04;
    transform: translateY(-1px);
  }
`;

function OrderSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.orderId) {
    return (
      <SuccessContainer>
        <h2>No order information found</h2>
        <Button onClick={() => navigate('/menu')}>Return to Menu</Button>
      </SuccessContainer>
    );
  }

  const { orderId, paymentMethod, total, phone } = state;

  return (
    <SuccessContainer>
      <h2>Order Placed Successfully!</h2>
      
      <OrderDetails>
        <h3>Order Details</h3>
        <p>Order ID: #{orderId}</p>
        <p>Total Amount: KSH {total?.toFixed(2)}</p>
        <p>Payment Method: {paymentMethod}</p>
        {paymentMethod === 'mpesa' && (
          <p>Please complete M-Pesa payment on {phone}</p>
        )}
        {paymentMethod === 'cash' && (
          <p>Payment will be collected upon delivery</p>
        )}
      </OrderDetails>

      <p>We'll notify you once your order is confirmed.</p>
      
      <Button onClick={() => navigate('/menu')}>
        Continue Shopping
      </Button>
    </SuccessContainer>
  );
}

export default OrderSuccess;