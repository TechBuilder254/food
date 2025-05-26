import React from 'react';
import styled from 'styled-components';
import '../styles/style.css';

const Card = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  h3 {
    margin: 1rem 0;
    font-size: 1.2rem;
    color: #333;
  }
`;

function CategoryCard({ title, image }) {
  return (
    <Card>
      <img src={image} alt={title} />
      <h3>{title}</h3>
    </Card>
  );
}

export default CategoryCard;