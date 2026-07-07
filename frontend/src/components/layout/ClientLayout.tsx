import { Outlet, Navigate } from 'react-router-dom';
import { ClientHeader } from '../common/ClientHeader';
import { ClientSidebar } from '../common/ClientSidebar';
import { Footer } from '../common/Footer';
import { useAuth } from '../../context/AuthContext/useAuth';

export const ClientLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Fixed: Use lowercase role comparisons
  if (!user || (user.role !== 'customer' && user.role !== 'admin')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <ClientSidebar />
      <div className="flex-1 ml-64">
        <ClientHeader />
        <main className="p-6 mt-16">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};