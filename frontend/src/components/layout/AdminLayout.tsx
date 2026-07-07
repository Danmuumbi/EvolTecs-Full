import { Outlet, Navigate } from 'react-router-dom';
import { AdminHeader } from '../common/AdminHeader';
import { AdminSidebar } from '../common/AdminSidebar';
import { useAuth } from '../../context/AuthContext/useAuth';

export const AdminLayout = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // Fixed: Use lowercase role comparison
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="p-6 mt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};