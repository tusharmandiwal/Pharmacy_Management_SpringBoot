
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Inventory from './Admin/Inventory';
import OrderPage from './User/OrderPage';
import CartPage from './User/CartPage';
import ReportPage from './Admin/ReportPage';
import Supplier from './Admin/Supplier';
import UserHistory from './User/UserHistory';
import AboutUs from './pages/AboutUs';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Policy from './pages/Policy';

import Payment from './pages/Payment';
import AdminDashboard from './Admin/AdminDashboard';
import Users from './Admin/Users';

const AppRoutes = () => (
  <Routes>
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />
    <Route path="/admin/inventory" element={<Inventory />} />
    <Route path="/orderpage" element={<OrderPage />} />
    <Route path="/cart" element={<CartPage />} /> 
    <Route path="/admin/report" element={<ReportPage />} /> 
    <Route path='/admin/supplier' element={<Supplier/>} />
    <Route path="/" element={<OrderPage />} />
    <Route path='/userHistory' element={<UserHistory />} />
    <Route path="/about" element={<AboutUs/>} />
    <Route path="/terms" element={<Terms/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/privacy" element={<Policy/>} />
    <Route path='/admin/dashboard' element={<AdminDashboard />} />
    <Route path="/payment" element={<Payment />} />
    <Route path="/admin/users" element={<Users />} />
  </Routes>
);

export default AppRoutes;