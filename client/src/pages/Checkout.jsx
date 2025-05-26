import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  padding: 1.5rem;
  border-radius: 8px;
  background: #f8f9fa;
  
  h3 {
    color: #333;
    margin-bottom: 1rem;
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0.5rem 0;
  border-bottom: 1px dashed #ddd;
  
  &:last-child {
    border-bottom: none;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
    color: #333;
  }

  input, select {
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #ff6b35;
    }
  }

  .error {
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const PaymentSection = styled.div`
  margin: 1.5rem 0;
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;

  h3 {
    margin-bottom: 1rem;
    color: #333;
  }
`;

const PaymentMethod = styled.div`
  display: grid;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
`;

const SubmitButton = styled.button`
  background: #ff6b35;
  color: white;
  padding: 1rem;
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

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 1rem;
  background: #ffe9e9;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: 'mpesa'
  });

  if (!state?.orderData) {
    return (
      <CheckoutContainer>
        <h2>No order data found</h2>
        <SubmitButton onClick={() => navigate('/menu')}>Return to Menu</SubmitButton>
      </CheckoutContainer>
    );
  }

  const { orderData } = state;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.fullName.trim() || formData.fullName.trim().split(' ').length < 2) {
      setError('Please enter your full name (first and last name)');
      return false;
    }

    if (!formData.phone.match(/^(?:\+254|0)[17]\d{8}$/)) {
      setError('Please enter a valid Kenyan phone number (e.g., 0712345678)');
      return false;
    }

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email address');
      return false;
    }

    if (!formData.address.trim() || formData.address.length < 10) {
      setError('Please enter a detailed delivery address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsProcessing(true);
    setError('');

    try {
      const orderPayload = {
        items: orderData.items.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: orderData.total,
        customer: {
          fullName: formData.fullName.trim(),
          phone: formData.phone.replace(/^\+254/, '0'),
          email: formData.email.toLowerCase().trim(),
          address: formData.address.trim()
        },
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === 'cash' ? 'pending' : 'awaiting_payment'
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to process order');
      }

      // Navigate directly to success page with order details
      navigate('/order-success', { 
        state: { 
          orderId: data.orderId,
          paymentMethod: formData.paymentMethod,
          total: orderData.total,
          phone: formData.phone
        } 
      });

    } catch (error) {
      console.error('Checkout error:', error);
      setError(error.message || 'Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <CheckoutContainer>
      <h2>Checkout</h2>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <OrderSummary>
        <h3>Order Summary</h3>
        {orderData.items.map(item => (
          <OrderItem key={item.id}>
            <span>{item.name} x {item.quantity}</span>
            <span>KSH {(item.price * item.quantity).toFixed(2)}</span>
          </OrderItem>
        ))}
        <OrderItem style={{ marginTop: '1rem', fontWeight: 'bold' }}>
          <span>Total:</span>
          <span>KSH {orderData.total.toFixed(2)}</span>
        </OrderItem>
      </OrderSummary>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="phone">Phone Number (M-Pesa)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="07XXXXXXXX"
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            required
          />
        </FormGroup>

        <FormGroup>
          <label htmlFor="address">Delivery Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Street, City"
            required
          />
        </FormGroup>

        <PaymentSection>
          <h3>Payment Method</h3>
          <PaymentMethod>
            <FormGroup>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="mpesa">M-Pesa</option>
                <option value="card">Credit/Debit Card</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </FormGroup>
          </PaymentMethod>
        </PaymentSection>

        <SubmitButton type="submit" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : `Pay KSH ${orderData.total.toFixed(2)}`}
        </SubmitButton>
      </Form>
    </CheckoutContainer>
  );
}

export default Checkout;