import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { ClientHeader } from '../common/ClientHeader';
import { ClientSidebar } from '../common/ClientSidebar';
import { Footer } from '../common/Footer';
import { useAuth } from '../../context/AuthContext/useAuth';

export const ClientLayout = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  console.log('🏗️ ClientLayout - User:', user?.email);
  console.log('🏗️ ClientLayout - Location:', location.pathname);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    console.log('🔒 No user, redirecting to login');
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Allow both lowercase and uppercase roles
  const validRoles = ['customer', 'admin', 'CUSTOMER', 'ADMIN'];
  if (!validRoles.includes(user.role)) {
    console.log('🚫 Invalid role:', user.role);
    return <Navigate to="/" replace />;
  }

  console.log('✅ ClientLayout rendering dashboard for:', user.email);

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <ClientSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <ClientHeader />
        <main className="p-4 md:p-6 mt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};