import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiClient } from "../../api/client";
import {
  FiSearch,
  FiEye,
  FiFileText,
  FiDollarSign
} from "react-icons/fi";

interface Invoice {
  id: string;
  invoiceNumber: string;
  amount: number;
  taxAmount: number;
  totalAmount: number;
  currency: string;
  status: string;
  createdAt: string;
}

export const Invoices = () => {

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {

    loadInvoices();

  }, []);

  async function loadInvoices() {

    try {

      const res = await apiClient.get("/invoices");

      setInvoices(res.data.invoices);

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  }

  const filteredInvoices = useMemo(() => {

    return invoices.filter(invoice => {

      const matchesSearch =
        invoice.invoiceNumber
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "ALL" ||
        invoice.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [search, statusFilter, invoices]);

  const statusColor = (status: string) => {

    switch (status) {

      case "PAID":
        return "bg-green-600";

      case "PENDING":
        return "bg-yellow-600";

      case "CANCELLED":
        return "bg-red-600";

      default:
        return "bg-gray-600";

    }

  };

  if (loading) {

    return (

      <div className="p-10 text-center">

        Loading invoices...

      </div>

    );

  }

  return (

    <div className="p-8">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold">

            My Invoices

          </h1>

          <p className="text-gray-400">

            View all billing history.

          </p>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3" />

          <input
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
            placeholder="Search invoice..."
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-zinc-900 border border-zinc-700"
          />

        </div>

        <select
          value={statusFilter}
          onChange={(e)=>setStatusFilter(e.target.value)}
          className="rounded-lg bg-zinc-900 border border-zinc-700 px-4"
        >

          <option value="ALL">All</option>

          <option value="PAID">Paid</option>

          <option value="PENDING">Pending</option>

          <option value="CANCELLED">Cancelled</option>

        </select>

      </div>

      {filteredInvoices.length === 0 ? (

        <div className="bg-zinc-900 rounded-xl p-12 text-center">

          <FiFileText
            className="mx-auto mb-4"
            size={50}
          />

          <h2 className="text-xl font-semibold">

            No invoices found.

          </h2>

        </div>

      ) : (

        <div className="overflow-auto rounded-xl">

          <table className="w-full">

            <thead className="bg-zinc-900">

              <tr>

                <th className="text-left p-4">

                  Invoice

                </th>

                <th className="text-left">

                  Date

                </th>

                <th>

                  Total

                </th>

                <th>

                  Status

                </th>

                <th>

                  Action

                </th>

              </tr>

            </thead>

            <tbody>

              {filteredInvoices.map(invoice=>(

                <tr
                  key={invoice.id}
                  className="border-b border-zinc-800"
                >

                  <td className="p-4">

                    {invoice.invoiceNumber}

                  </td>

                  <td>

                    {new Date(
                      invoice.createdAt
                    ).toLocaleDateString()}

                  </td>

                  <td>

                    <div className="flex items-center justify-center">

                      <FiDollarSign/>

                      {invoice.totalAmount.toLocaleString()}

                    </div>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-sm ${statusColor(invoice.status)}`}
                    >

                      {invoice.status}

                    </span>

                  </td>

                  <td>

                    <Link

                      to={`/invoice/${invoice.id}`}

                      className="inline-flex items-center gap-2 text-blue-400"

                    >

                      <FiEye/>

                      View

                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>

  );

};