import { useEffect, useMemo, useState } from "react";
import { apiClient } from "@/api/client";

type PaymentUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
};

type OrderItem = {
  id: string;
  serviceType: string;
  name: string;
  description: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

type PaymentOrder = {
  id: string;
  orderNumber: string;
  totalAmount: number;
  status: string;
  paymentStatus: string;
  items: OrderItem[];
};

type Payment = {
  id: string;
  paymentMethod: string;
  transactionId: string | null;
  amount: number;
  status: string;
  mpesaCode: string | null;
  createdAt: string;
  updatedAt: string;
  user: PaymentUser;
  order: PaymentOrder;
};

export const ManagePayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [selectedPayment, setSelectedPayment] =
    useState<Payment | null>(null);

  /*
  |--------------------------------------------------------------------------
  | LOAD PAYMENTS
  |--------------------------------------------------------------------------
  */

  const fetchPayments = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await apiClient.get(
          "/payments/admin/payments"
        );

      setPayments(
        response.data.payments || []
      );

    } catch (error: any) {
      console.error(
        "Failed to fetch payments:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load payments."
      );

    } finally {
      setLoading(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | INITIAL LOAD
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchPayments();
  }, []);

  /*
  |--------------------------------------------------------------------------
  | FILTER PAYMENTS
  |--------------------------------------------------------------------------
  */

  const filteredPayments = useMemo(() => {
    const searchTerm =
      search.toLowerCase().trim();

    return payments.filter((payment) => {
      const customerName =
        `${payment.user.firstName} ${payment.user.lastName}`
          .toLowerCase();

      const matchesSearch =
        !searchTerm ||
        customerName.includes(searchTerm) ||
        payment.user.email
          .toLowerCase()
          .includes(searchTerm) ||
        payment.order.orderNumber
          .toLowerCase()
          .includes(searchTerm) ||
        payment.paymentMethod
          .toLowerCase()
          .includes(searchTerm) ||
        payment.transactionId
          ?.toLowerCase()
          .includes(searchTerm) ||
        payment.mpesaCode
          ?.toLowerCase()
          .includes(searchTerm);

      const matchesStatus =
        statusFilter === "ALL" ||
        payment.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  }, [
    payments,
    search,
    statusFilter,
  ]);

  /*
  |--------------------------------------------------------------------------
  | STATISTICS
  |--------------------------------------------------------------------------
  */

  const totalRevenue =
    payments
      .filter(
        (payment) =>
          payment.status === "PAID"
      )
      .reduce(
        (total, payment) =>
          total + payment.amount,
        0
      );

  const paidPayments =
    payments.filter(
      (payment) =>
        payment.status === "PAID"
    ).length;

  const pendingPayments =
    payments.filter(
      (payment) =>
        payment.status === "PENDING"
    ).length;

  // const failedPayments =
  //   payments.filter(
  //     (payment) =>
  //       payment.status === "FAILED" ||
  //       payment.status === "REFUNDED"
  //   ).length;

  /*
  |--------------------------------------------------------------------------
  | FORMAT CURRENCY
  |--------------------------------------------------------------------------
  */

  const formatCurrency = (
    amount: number
  ) => {
    return new Intl.NumberFormat(
      "en-KE",
      {
        style: "currency",
        currency: "KES",
        minimumFractionDigits: 2,
      }
    ).format(amount);
  };

  /*
  |--------------------------------------------------------------------------
  | STATUS BADGE
  |--------------------------------------------------------------------------
  */

  const getStatusClass = (
    status: string
  ) => {
    switch (status) {
      case "PAID":
        return "bg-emerald-400/10 text-emerald-300";

      case "PENDING":
        return "bg-yellow-400/10 text-yellow-300";

      case "FAILED":
        return "bg-red-400/10 text-red-300";

      case "REFUNDED":
        return "bg-purple-400/10 text-purple-300";

      default:
        return "bg-gray-400/10 text-gray-300";
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">

        <div className="text-gray-400">
          Loading payments...
        </div>

      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <div className="space-y-6">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-white">
            Manage Payments
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            View and manage all customer payments and transactions.
          </p>

        </div>

        <button
          onClick={fetchPayments}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white transition hover:bg-white/10"
        >
          Refresh
        </button>

      </div>


      {/* ERROR */}

      {error && (
        <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}


      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Total Payments
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {payments.length}
          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Total Revenue
          </p>

          <p className="mt-2 text-2xl font-bold text-emerald-400">
            {formatCurrency(totalRevenue)}
          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Paid
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {paidPayments}
          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Pending
          </p>

          <p className="mt-2 text-3xl font-bold text-yellow-400">
            {pendingPayments}
          </p>

        </div>

      </div>


      {/* SEARCH AND FILTERS */}

      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:flex-row">

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search customer, email, order, transaction or M-Pesa code..."
          className="flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/50"
        />

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none"
        >

          <option value="ALL">
            All Statuses
          </option>

          <option value="PAID">
            Paid
          </option>

          <option value="PENDING">
            Pending
          </option>

          <option value="FAILED">
            Failed
          </option>

          <option value="REFUNDED">
            Refunded
          </option>

        </select>

      </div>


      {/* PAYMENT TABLE */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

        {filteredPayments.length === 0 ? (

          <div className="p-12 text-center">

            <h3 className="text-lg font-semibold text-white">
              No payments found
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              No payments match your current search or filter.
            </p>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1000px]">

              <thead className="border-b border-white/10 bg-white/[0.03]">

                <tr>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Amount
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Method
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                    Date
                  </th>

                  <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody className="divide-y divide-white/10">

                {filteredPayments.map(
                  (payment) => (

                    <tr
                      key={payment.id}
                      className="transition hover:bg-white/[0.03]"
                    >

                      {/* CUSTOMER */}

                      <td className="px-5 py-4">

                        <div className="font-medium text-white">

                          {payment.user.firstName}{" "}

                          {payment.user.lastName}

                        </div>

                        <div className="mt-1 text-xs text-gray-500">

                          {payment.user.email}

                        </div>

                      </td>


                      {/* ORDER */}

                      <td className="px-5 py-4">

                        <div className="font-medium text-cyan-300">

                          {payment.order.orderNumber}

                        </div>

                        <div className="mt-1 text-xs text-gray-500">

                          {payment.order.items.length}{" "}

                          item
                          {payment.order.items.length !== 1
                            ? "s"
                            : ""}

                        </div>

                      </td>


                      {/* AMOUNT */}

                      <td className="px-5 py-4">

                        <span className="font-semibold text-white">

                          {formatCurrency(
                            payment.amount
                          )}

                        </span>

                      </td>


                      {/* METHOD */}

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-gray-300">

                          {payment.paymentMethod}

                        </span>

                      </td>


                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={`rounded-full px-3 py-1.5 text-xs ${getStatusClass(
                            payment.status
                          )}`}
                        >

                          {payment.status}

                        </span>

                      </td>


                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-gray-400">

                        {new Date(
                          payment.createdAt
                        ).toLocaleString()}

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-4 text-right">

                        <button
                          onClick={() =>
                            setSelectedPayment(
                              payment
                            )
                          }
                          className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300 transition hover:bg-cyan-400/20"
                        >

                          View Details

                        </button>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* DETAILS MODAL */}

      {selectedPayment && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827]">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 p-6">

              <div>

                <h2 className="text-xl font-semibold text-white">
                  Payment Details
                </h2>

                <p className="mt-1 text-sm text-gray-400">

                  {selectedPayment.order.orderNumber}

                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedPayment(null)
                }
                className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >

                ✕

              </button>

            </div>


            {/* MODAL BODY */}

            <div className="space-y-6 p-6">

              {/* PAYMENT SUMMARY */}

              <div className="grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Amount
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">

                    {formatCurrency(
                      selectedPayment.amount
                    )}

                  </p>

                </div>


                <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Status
                  </p>

                  <p className="mt-2">

                    <span
                      className={`rounded-full px-3 py-1.5 text-xs ${getStatusClass(
                        selectedPayment.status
                      )}`}
                    >

                      {selectedPayment.status}

                    </span>

                  </p>

                </div>


                <div className="rounded-xl border border-white/10 bg-black/20 p-4">

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Payment Method
                  </p>

                  <p className="mt-2 text-white">

                    {selectedPayment.paymentMethod}

                  </p>

                </div>

              </div>


              {/* CUSTOMER */}

              <div className="border-t border-white/10 pt-5">

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Customer
                </p>

                <p className="mt-2 text-white">

                  {selectedPayment.user.firstName}{" "}

                  {selectedPayment.user.lastName}

                </p>

                <p className="text-sm text-gray-400">

                  {selectedPayment.user.email}

                </p>

                {selectedPayment.user.phone && (

                  <p className="text-sm text-gray-400">

                    {selectedPayment.user.phone}

                  </p>

                )}

              </div>


              {/* TRANSACTION DETAILS */}

              <div className="border-t border-white/10 pt-5">

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Transaction Details
                </p>

                <div className="mt-3 space-y-2 text-sm">

                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Payment ID
                    </span>

                    <span className="break-all text-right text-gray-300">

                      {selectedPayment.id}

                    </span>

                  </div>


                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Transaction ID
                    </span>

                    <span className="break-all text-right text-gray-300">

                      {selectedPayment.transactionId ||
                        "N/A"}

                    </span>

                  </div>


                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      M-Pesa Code
                    </span>

                    <span className="break-all text-right text-gray-300">

                      {selectedPayment.mpesaCode ||
                        "N/A"}

                    </span>

                  </div>


                  <div className="flex justify-between gap-4">

                    <span className="text-gray-500">
                      Created
                    </span>

                    <span className="text-right text-gray-300">

                      {new Date(
                        selectedPayment.createdAt
                      ).toLocaleString()}

                    </span>

                  </div>

                </div>

              </div>


              {/* ORDER DETAILS */}

              <div className="border-t border-white/10 pt-5">

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Order Items
                </p>

                <div className="mt-3 space-y-3">

                  {selectedPayment.order.items.map(
                    (item) => (

                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-black/20 p-4"
                      >

                        <div>

                          <p className="font-medium text-white">

                            {item.name}

                          </p>

                          <p className="mt-1 text-xs text-gray-500">

                            {item.serviceType} · Quantity:{" "}

                            {item.quantity}

                          </p>

                        </div>

                        <p className="font-semibold text-white">

                          {formatCurrency(
                            item.totalPrice
                          )}

                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* ORDER STATUS */}

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">

                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Order Status
                  </p>

                  <p className="mt-2 text-white">

                    {selectedPayment.order.status}

                  </p>

                </div>


                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Order Payment Status
                  </p>

                  <p className="mt-2 text-white">

                    {selectedPayment.order.paymentStatus}

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};