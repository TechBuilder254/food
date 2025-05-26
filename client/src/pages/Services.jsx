import React from 'react';
import styled from 'styled-components';

const ServicesContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #ff6b35;
  margin-bottom: 2rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
`;

const ServiceCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 2rem;
  text-align: center;
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 24px rgba(255,107,53,0.15);
  }
`;

const ServiceIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #ff6b35;
`;

const ServiceTitle = styled.h3`
  margin-bottom: 0.5rem;
  color: #222;
`;

const ServiceDesc = styled.p`
  color: #555;
  font-size: 1.05rem;
`;

const services = [
  {
    icon: '🍔',
    title: 'Fast Food Delivery',
    desc: 'Get your favorite meals delivered hot and fresh to your doorstep in record time.',
  },
  {
    icon: '🥗',
    title: 'Healthy Options',
    desc: 'Choose from a wide variety of healthy, nutritious, and delicious menu items.',
  },
  {
    icon: '🎉',
    title: 'Event Catering',
    desc: 'We cater for parties, corporate events, and special occasions with custom menus.',
  },
  {
    icon: '🛒',
    title: 'Online Ordering',
    desc: 'Order easily through our website and track your order status in real-time.',
  },
];

function Services() {
  return (
    <ServicesContainer>
      <Title>Our Services</Title>
      <ServicesGrid>
        {services.map((service, idx) => (
          <ServiceCard key={idx}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDesc>{service.desc}</ServiceDesc>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesContainer>
  );
}

export default Services;