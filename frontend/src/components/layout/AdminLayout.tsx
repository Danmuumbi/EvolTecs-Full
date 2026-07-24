// import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { Outlet, Navigate} from 'react-router-dom';
import { AdminHeader } from '../common/AdminHeader';
import { AdminSidebar } from '../common/AdminSidebar';
import { useAuth } from '../../context/AuthContext/useAuth';

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();
  // const location = useLocation();

  console.log('🏗️ AdminLayout - User:', user?.email);

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

  if (!user || user.role !== 'admin') {
    console.log('🔒 No admin user, redirecting to home');
    return <Navigate to="/" replace />;
  }

  console.log('✅ AdminLayout rendering for admin:', user.email);

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <AdminSidebar />
      <div className="flex-1 ml-0 md:ml-64">
        <AdminHeader />
        <main className="p-4 md:p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};