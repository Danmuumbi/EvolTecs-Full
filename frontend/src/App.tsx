import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext/useAuth';
import { PublicLayout } from './components/layout/PublicLayout';
import { ClientLayout } from './components/layout/ClientLayout';
import { AdminLayout } from './components/layout/AdminLayout';

// Public Routes
import { Home } from './routes/public/Home';
import { Services } from './routes/public/Services';
import { Hosting } from './routes/public/Hosting';
import { Domains } from './routes/public/Domains';
import { About } from './routes/public/About';
import { Contact } from './routes/public/Contact';
import { Login } from './routes/public/Login';
import { Register } from './routes/public/Register';

// Client Routes
import { Dashboard } from './routes/client/Dashboard';
import { MyDomains } from './routes/client/MyDomains';
import { MyHosting } from './routes/client/MyHosting';
import { MyEmails } from './routes/client/MyEmails';
import { Invoices } from './routes/client/Invoices';
import { Support } from './routes/client/Support';
import { Profile } from './routes/client/Profile';

// Admin Routes
import { AdminDashboard } from './routes/admin/AdminDashboard';
import { ManageUsers } from './routes/admin/ManageUsers';
import { ManageDomains } from './routes/admin/ManageDomains';
import { ManageHosting } from './routes/admin/ManageHosting';
import { ManagePayments } from './routes/admin/ManagePayments';
import { ManageSupport } from './routes/admin/ManageSupport';

function App() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/hosting" element={<Hosting />} />
        <Route path="/domains" element={<Domains />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
      </Route>

      {/* Client Routes - Protected */}
      <Route element={<ClientLayout />}>
        <Route path="/dashboard" element={user?.role === 'CUSTOMER' || user?.role === 'ADMIN' ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/my-domains" element={user ? <MyDomains /> : <Navigate to="/login" />} />
        <Route path="/my-hosting" element={user ? <MyHosting /> : <Navigate to="/login" />} />
        <Route path="/my-emails" element={user ? <MyEmails /> : <Navigate to="/login" />} />
        <Route path="/invoices" element={user ? <Invoices /> : <Navigate to="/login" />} />
        <Route path="/support" element={user ? <Support /> : <Navigate to="/login" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      </Route>

      {/* Admin Routes - Protected */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={user?.role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/admin/users" element={user?.role === 'ADMIN' ? <ManageUsers /> : <Navigate to="/" />} />
        <Route path="/admin/domains" element={user?.role === 'ADMIN' ? <ManageDomains /> : <Navigate to="/" />} />
        <Route path="/admin/hosting" element={user?.role === 'ADMIN' ? <ManageHosting /> : <Navigate to="/" />} />
        <Route path="/admin/payments" element={user?.role === 'ADMIN' ? <ManagePayments /> : <Navigate to="/" />} />
        <Route path="/admin/support" element={user?.role === 'ADMIN' ? <ManageSupport /> : <Navigate to="/" />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;