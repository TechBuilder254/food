import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Layout Components
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingCart from './components/FloatingCart';
import AdminLayout from './components/admin/AdminLayout';

// Public Pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Services from './pages/Services';
import About from './pages/About';
import Login from './pages/Login';


// User Pages
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';

// Admin Pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import AdminProducts from './pages/admin/Products';
import AdminProfile from './pages/admin/Profile';
import AdminLogin from './pages/AdminLogin';

// Utils & Context
import { ProtectedAdminRoute } from './utils/ProtectedRoutes';
import { CartProvider } from './context/CartContext';

// Styles
import './App.css';
import './styles/style.css';

// Helper component to conditionally render Header/FloatingCart/Footer
function AppContent() {
  const location = useLocation();
  const isAdminRoute =
    location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';

  return (
    <div className="App">
      {!isAdminRoute && <Header />}
      {!isAdminRoute && <FloatingCart />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        

        {/* User Routes */}
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />

        {/* Admin Auth Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Layout Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminOrders />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminProducts />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminProfile />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <CartProvider>
      <Router>
        <AppContent />
      </Router>
    </CartProvider>
  );
}

export default App;