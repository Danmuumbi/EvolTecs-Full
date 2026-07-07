import { useAuth } from '@context/AuthContext/useAuth';

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p className="text-gray-400">Welcome back, {user?.firstName}!</p>
    </div>
  );
};