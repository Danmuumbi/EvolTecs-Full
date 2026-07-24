import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext/useAuth';
import { PublicLayout } from './components/layout/PublicLayout';
import { ClientLayout } from './components/layout/ClientLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { CartProvider } from './context/CartContext/CartProvider';
import { CartDrawer } from './components/common/CartDrawer';

// Public Routes
import { Home } from './routes/public/Home';
import { Services } from './routes/public/Services';
import { Hosting } from './routes/public/Hosting';
import { Domains } from './routes/public/Domains';
import { About } from './routes/public/About';
import { Contact } from './routes/public/Contact';
import { Login } from './routes/public/Login';
import { Register } from './routes/public/Register';
import { Checkout } from './routes/public/Checkout';
import { VerifyEmail } from './routes/public/VerifyEmail';
import { ResendVerification } from './routes/public/ResendVerification';

// Client Routes
import { Dashboard } from './routes/client/Dashboard';
import { MyDomains } from './routes/client/MyDomains';
import { MyHosting } from './routes/client/MyHosting';
import { MyEmails } from './routes/client/MyEmails';
import { Invoices } from './routes/client/Invoices';
import { Support } from './routes/client/Support';
import { Profile } from './routes/client/Profile';
import { DomainManage } from './routes/client/DomainManage';

// Admin Routes
import { AdminDashboard } from './routes/admin/AdminDashboard';
import { ManageUsers } from './routes/admin/ManageUsers';
import { ManageDomains } from './routes/admin/ManageDomains';
import { ManageHosting } from './routes/admin/ManageHosting';
import { ManagePayments } from './routes/admin/ManagePayments';
import { ManageSupport } from './routes/admin/ManageSupport';

import { DomainRenewal } from './routes/public/DomainRenewal';
import { ForgotPassword } from './routes/public/ForgotPassword';
import { ResetPassword } from './routes/public/ResetPassword';

import { Terms } from './routes/public/Terms';
import { FAQs } from './routes/public/FAQs';
import { AdminProfile } from './routes/admin/AdminProfile';
// import { Chatbot } from './components/common/Chatbot';
import { Privacy } from './routes/public/Privacy';

function App() {
  const { user, isLoading } = useAuth();

  console.log('🔍 App - User:', user?.email, 'Role:', user?.role, 'Loading:', isLoading);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#0a0a0a]">
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/hosting" element={<Hosting />} />
            <Route path="/domains" element={<Domains />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/resend-verification" element={<ResendVerification />} />
            <Route path="/renew/:domainId" element={<DomainRenewal />} />
            <Route path="/terms" element={<Terms />} />
              <Route path="/faqs" element={<FAQs />} />
              <Route path="/privacy" element={<Privacy />} />


            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

             {/* <Chatbot />  */}
            <Route 
              path="/login" 
              element={
                !user ? <Login /> : 
                user.role === 'admin' ? <Navigate to="/admin" replace /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
            <Route 
              path="/register" 
              element={
                !user ? <Register /> : 
                user.role === 'admin' ? <Navigate to="/admin" replace /> : 
                <Navigate to="/dashboard" replace />
              } 
            />
          </Route>

          {/* Client Routes - Protected */}
          <Route element={<ClientLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-domains" element={<MyDomains />} />
            <Route path="/my-hosting" element={<MyHosting />} />
            <Route path="/my-emails" element={<MyEmails />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/domain/:domainId" element={<DomainManage />} />
          </Route>

          {/* Admin Routes - Protected */}
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/domains" element={<ManageDomains />} />
            <Route path="/admin/hosting" element={<ManageHosting />} />
            <Route path="/admin/payments" element={<ManagePayments />} />
            <Route path="/admin/support" element={<ManageSupport />} />
            <Route path="/admin/profile"element={<AdminProfile />}/></Route>

          {/* 404 - Not Found */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;