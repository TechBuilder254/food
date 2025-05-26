import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  background: ${props => {
    if (props.variant === 'delete') return '#dc3545';
    if (props.variant === 'secondary') return '#6c757d';
    return '#28a745';
  }};
  font-size: 1rem;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const AdminList = styled.div`
  display: grid;
  gap: 1rem;
`;

const AdminItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
`;

const Title = styled.h2`
  color: #333;
  margin-bottom: 1.5rem;
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

const SuccessMessage = styled.div`
  color: #28a745;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
`;

function Profile() {
  const [admins, setAdmins] = useState([]);
  const [currentAdmin, setCurrentAdmin] = useState(null);
  const [newAdmin, setNewAdmin] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAdmins();
    fetchCurrentAdmin();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setAdmins(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch admins:', error);
      setError('Failed to fetch admins');
    }
  };

  const fetchCurrentAdmin = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/profile', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setCurrentAdmin(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      setError('Failed to fetch profile');
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (newAdmin.password !== newAdmin.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: newAdmin.username,
          email: newAdmin.email,
          password: newAdmin.password
        })
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Admin added successfully');
        setNewAdmin({
          username: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        fetchAdmins();
      } else {
        setError(data.message || 'Failed to add admin');
      }
    } catch (error) {
      console.error('Failed to add admin:', error);
      setError('Failed to add admin');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this admin?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (response.ok) {
        setAdmins(admins.filter(admin => admin.id !== id));
        setSuccess('Admin deleted successfully');
      } else {
        setError('Failed to delete admin');
      }
    } catch (error) {
      console.error('Failed to delete admin:', error);
      setError('Failed to delete admin');
    }
  };

  return (
    <AdminLayout>
      <Container>
        <Grid>
          <div>
            {currentAdmin && (
              <Card>
                <Title>My Profile</Title>
                <div>
                  <p><strong>Username:</strong> {currentAdmin.username}</p>
                  <p><strong>Email:</strong> {currentAdmin.email}</p>
                  <p><strong>Role:</strong> {currentAdmin.role}</p>
                </div>
              </Card>
            )}

            <Card>
              <Title>Add New Admin</Title>
              {error && <ErrorMessage>{error}</ErrorMessage>}
              {success && <SuccessMessage>{success}</SuccessMessage>}
              <Form onSubmit={handleAddAdmin}>
                <FormGroup>
                  <label>Username</label>
                  <Input
                    type="text"
                    value={newAdmin.username}
                    onChange={(e) => setNewAdmin({...newAdmin, username: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Email</label>
                  <Input
                    type="email"
                    value={newAdmin.email}
                    onChange={(e) => setNewAdmin({...newAdmin, email: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Password</label>
                  <Input
                    type="password"
                    value={newAdmin.password}
                    onChange={(e) => setNewAdmin({...newAdmin, password: e.target.value})}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <label>Confirm Password</label>
                  <Input
                    type="password"
                    value={newAdmin.confirmPassword}
                    onChange={(e) => setNewAdmin({...newAdmin, confirmPassword: e.target.value})}
                    required
                  />
                </FormGroup>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? 'Adding...' : 'Add Admin'}
                </Button>
              </Form>
            </Card>
          </div>

          <Card>
            <Title>Manage Admins</Title>
            <AdminList>
              {admins.map(admin => (
                <AdminItem key={admin.id}>
                  <div>
                    <p><strong>{admin.username}</strong></p>
                    <p>{admin.email}</p>
                    <p><small>Role: {admin.role}</small></p>
                  </div>
                  {currentAdmin?.id !== admin.id && (
                    <Button 
                      variant="delete" 
                      onClick={() => handleDelete(admin.id)}
                    >
                      Delete
                    </Button>
                  )}
                </AdminItem>
              ))}
            </AdminList>
          </Card>
        </Grid>
      </Container>
    </AdminLayout>
  );
}

export default Profile;