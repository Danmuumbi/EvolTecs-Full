import { useAuth } from '@context/AuthContext/useAuth';

export const ClientHeader = () => {
  const { user } = useAuth();

  return (
    <header className="fixed top-0 right-0 left-64 z-40 h-16 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between">
      <h2 className="text-lg font-semibold">Client Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-400">{user?.firstName} {user?.lastName}</span>
      </div>
    </header>
  );
};