import { apiClient } from "./client";

export const invoiceApi = {
  getInvoices: async () => {
    const res = await apiClient.get("/payments/invoices");
    return res.data;
  },

  getInvoice: async (id: string) => {
    const res = await apiClient.get(`/payments/invoices/${id}`);
    return res.data;
  },
};