import React from 'react';
import styled from 'styled-components';

const Banner = styled.section`
  background-color: #fffae6;
  padding: 3rem 2rem;
  text-align: center;
  border-radius: 8px;
  margin: 4rem 0;

  h2 {
    font-size: 2rem;
    color: #ff6b6b;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
    color: #555;
  }

  button {
    padding: 0.8rem 2rem;
    background-color: #ff6b6b;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #e05555;
    }
  }

  img {
    margin-top: 2rem;
    width: 100%;
    max-width: 400px;
    border-radius: 50%;
  }
`;

function OfferBanner() {
  return (
    <Banner>
      <h2>Holiday Special Offer For You</h2>
      <p>Get up to 50% discount on your favorite meals. Limited time only!</p>
      <button>Get Offer</button>
      <img src="/images/offer-pasta.jpg" alt="Special Offer" />
    </Banner>
  );
}

export default OfferBanner;