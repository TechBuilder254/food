import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 60px);
`;

const Sidebar = styled.div`
  width: 250px;
  background: #1a1a1a;
  padding: 2rem 1rem;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  padding: 2rem;
  background: #f5f5f5;
  margin-left: 250px;
`;

const NavItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: white;
  text-decoration: none;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  background: ${props => (props.$active ? '#ff6b35' : 'transparent')};

  &:hover {
    background: #ff6b35;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 0.8rem;
  margin-top: 2rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch('http://localhost:5000/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('adminToken');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <LayoutContainer>
      <Sidebar>
        <NavItem to="/admin" $active={location.pathname === '/admin'}>
          Dashboard
        </NavItem>
        <NavItem to="/admin/orders" $active={location.pathname === '/admin/orders'}>
          Orders
        </NavItem>
        
        <NavItem to="/admin/profile" $active={location.pathname === '/admin/profile'}>
          Profile
        </NavItem>
        <LogoutButton onClick={handleLogout} disabled={isLoggingOut}>
          {isLoggingOut ? 'Logging out...' : 'Logout'}
        </LogoutButton>
      </Sidebar>
      <Content>{children}</Content>
    </LayoutContainer>
  );
};

export default AdminLayout;