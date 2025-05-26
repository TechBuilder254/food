import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import AdminLayout from '../../components/admin/AdminLayout';

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  h3 {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
  }

  p {
    margin: 0.5rem 0 0;
    font-size: 1.8rem;
    font-weight: 600;
    color: #333;
  }
`;

function Dashboard() {
    const [stats, setStats] = useState({
        totalOrders: 0,
        totalRevenue: 0,
        pendingOrders: 0,
        totalProducts: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/admin/stats', {
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Failed to fetch stats');
            }

            const data = await response.json();
            setStats({
                totalOrders: data.totalOrders || 0,
                totalRevenue: data.totalRevenue || 0,
                pendingOrders: data.pendingOrders || 0,
                totalProducts: data.totalProducts || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <AdminLayout>
            <StatsGrid>
                <StatCard>
                    <h3>Total Orders</h3>
                    <p>{stats.totalOrders}</p>
                </StatCard>
                <StatCard>
                    <h3>Revenue</h3>
                    <p>KSH {(stats.totalRevenue || 0).toFixed(2)}</p>
                </StatCard>
                <StatCard>
                    <h3>Pending Orders</h3>
                    <p>{stats.pendingOrders}</p>
                </StatCard>
                <StatCard>
                    <h3>Total Products</h3>
                    <p>{stats.totalProducts}</p>
                </StatCard>
            </StatsGrid>
        </AdminLayout>
    );
}

export default Dashboard;