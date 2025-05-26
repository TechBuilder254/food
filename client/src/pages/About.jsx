import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 1rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #ff6b35;
  margin-bottom: 2rem;
`;

const Section = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.06);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Highlight = styled.span`
  color: #ff6b35;
  font-weight: bold;
`;

function About() {
  return (
    <AboutContainer>
      <Title>About Spoon--& Soul</Title>
      <Section>
        <h2>Who We Are</h2>
        <p>
          <Highlight>Spoon--& Soul</Highlight> is dedicated to bringing you the best food experience, whether you’re craving a quick bite, a healthy meal, or a sweet treat. We believe food is more than just a meal—it's a way to connect, celebrate, and nourish the soul.
        </p>
      </Section>
      <Section>
        <h2>Our Mission</h2>
        <p>
          Our mission is to deliver <Highlight>delicious, high-quality meals</Highlight> to your doorstep, while making healthy and diverse food options accessible and convenient for everyone.
        </p>
      </Section>
      <Section>
        <h2>Why Choose Us?</h2>
        <ul>
          <li>🍽️ Wide variety of menu options for every taste</li>
          <li>🚚 Fast and reliable delivery service</li>
          <li>🥗 Fresh, quality ingredients</li>
          <li>🎉 Catering for events and special occasions</li>
          <li>💬 Friendly customer support</li>
        </ul>
      </Section>
      <Section>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? Reach out to us at <a href="mailto:info@spoonandsoul.com">info@spoonandsoul.com</a> or call <a href="tel:+254700000000">+254 700 000 000</a>.
        </p>
      </Section>
    </AboutContainer>
  );
}

export default About;