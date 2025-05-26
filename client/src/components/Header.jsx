import React from 'react';
import { NavLink } from 'react-router-dom'; // NavLink for active styling
import styled from 'styled-components';

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  background: #ffffff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.07);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
    flex-wrap: wrap;
  }
`;

const Logo = styled.h1`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ff6b6b;
  letter-spacing: 2px;
  cursor: pointer;
  user-select: none;
`;

const Menu = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }
`;

const MenuItem = styled.li`
`;

const StyledLink = styled(NavLink)`
  text-decoration: none;
  font-weight: 600;
  color: #555555;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  transition: all 0.3s ease;

  &.active, &:hover {
    color: #ff6b6b;
    background-color: #ffe6e6;
    box-shadow: 0 2px 10px rgba(255, 107, 107, 0.2);
  }
`;

function Header() {
  return (
    <Nav>
      <Logo>Spoon--& Soul</Logo>
      <Menu>
        <MenuItem><StyledLink to="/" end>Home</StyledLink></MenuItem>
        <MenuItem><StyledLink to="/menu">Menu</StyledLink></MenuItem>
        <MenuItem><StyledLink to="/services">Services</StyledLink></MenuItem>
        <MenuItem><StyledLink to="/about">About</StyledLink></MenuItem>
      </Menu>
      <Menu>
        <MenuItem><StyledLink to="/login">Login & Signup </StyledLink></MenuItem>
        
      </Menu>
    </Nav>
  );
}

export default Header;
