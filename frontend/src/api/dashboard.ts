import { apiClient } from './client';
// import toast from 'react-hot-toast';

export interface DashboardStats {
  stats: {
    domains: number;
    hosting: number;
    emails: number;
    orders: number;
    totalSpent: number;
    invoices: number;
    paidInvoices: number;
  };
  recentActivity: Array<{
    icon: string;
    action: string;
    detail: string;
    time: string;
    status: string;
  }>;
  recentOrders: any[];
}

export interface ResourceUsage {
  hostingPlans: any[];
  emailUsage: {
    total: number;
    used: number;
    percentage: number;
  };
}

export const dashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    try {
      console.log('📊 Fetching dashboard stats...');
      const response = await apiClient.get('/dashboard/stats');
      console.log('✅ Dashboard stats received:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to fetch dashboard stats:', error.response?.data || error.message);
      throw error;
    }
  },

  getResources: async (): Promise<ResourceUsage> => {
    try {
      console.log('📊 Fetching resource usage...');
      const response = await apiClient.get('/dashboard/resources');
      console.log('✅ Resource usage received:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ Failed to fetch resource usage:', error.response?.data || error.message);
      throw error;
    }
  },
};