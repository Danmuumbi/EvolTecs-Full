import { useEffect, useState } from "react";
import { apiClient } from "@/api/client";

type SupportUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

type TicketResponse = {
  id: string;
  message: string;
  isAdmin: boolean;
  adminName: string | null;
  userId: string | null;
  createdAt: string;
};

type SupportTicket = {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  message: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  user: SupportUser;
  responses: TicketResponse[];
};

export const ManageSupport = () => {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [selectedTicket, setSelectedTicket] =
    useState<SupportTicket | null>(null);

  const [updating, setUpdating] = useState(false);

  const [replyMessage, setReplyMessage] =
    useState("");

  const [sendingReply, setSendingReply] =
    useState(false);


  /*
  |--------------------------------------------------------------------------
  | CUSTOMER NAME
  |--------------------------------------------------------------------------
  */

  const getCustomerName = (
    user: SupportUser
  ) => {
    return `${user.firstName} ${user.lastName}`.trim();
  };


  /*
  |--------------------------------------------------------------------------
  | LOAD ALL SUPPORT TICKETS
  |--------------------------------------------------------------------------
  */

  const fetchTickets = async () => {
    try {
      setLoading(true);

      setError("");

      const response =
        await apiClient.get(
          "/support/admin/tickets"
        );

      setTickets(
        response.data.tickets
      );

    } catch (error: any) {
      console.error(
        "Failed to fetch support tickets:",
        error
      );

      setError(
        error.response?.data?.message ||
        "Failed to load support tickets."
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
    fetchTickets();
  }, []);


  /*
  |--------------------------------------------------------------------------
  | UPDATE TICKET STATUS / PRIORITY
  |--------------------------------------------------------------------------
  */

  const updateTicket = async (
    id: string,
    changes: {
      status?: string;
      priority?: string;
    }
  ) => {
    try {
      setUpdating(true);

      const response =
        await apiClient.patch(
          `/support/admin/tickets/${id}`,
          changes
        );

      const updatedTicket =
        response.data.ticket;

      setTickets(
        (currentTickets) =>
          currentTickets.map(
            (ticket) =>
              ticket.id === id
                ? {
                    ...ticket,
                    ...updatedTicket,
                  }
                : ticket
          )
      );

      setSelectedTicket(
        (current) =>
          current
            ? {
                ...current,
                ...updatedTicket,
              }
            : null
      );

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Failed to update ticket."
      );

    } finally {
      setUpdating(false);
    }
  };


  /*
  |--------------------------------------------------------------------------
  | REPLY TO TICKET
  |--------------------------------------------------------------------------
  */

  const replyToTicket = async () => {
    if (!selectedTicket) {
      return;
    }

    const cleanMessage =
      replyMessage.trim();

    if (!cleanMessage) {
      alert(
        "Please enter a reply message."
      );

      return;
    }

    try {
      setSendingReply(true);

      const response =
        await apiClient.post(
          `/support/admin/tickets/${selectedTicket.id}/reply`,
          {
            message:
              cleanMessage,
          }
        );

      const newResponse =
        response.data.response;

      const updatedTicket: SupportTicket = {
        ...selectedTicket,

        status:
          "IN_PROGRESS",

        responses: [
          ...selectedTicket.responses,
          newResponse,
        ],
      };

      setSelectedTicket(
        updatedTicket
      );

      setTickets(
        (currentTickets) =>
          currentTickets.map(
            (ticket) =>
              ticket.id ===
              selectedTicket.id
                ? updatedTicket
                : ticket
          )
      );

      setReplyMessage("");

    } catch (error: any) {
      alert(
        error.response?.data?.message ||
        "Failed to send reply."
      );

    } finally {
      setSendingReply(false);
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
          Loading support tickets...
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
            Manage Support
          </h1>

          <p className="mt-1 text-sm text-gray-400">
            View and respond to customer support requests.
          </p>

        </div>


        <button
          onClick={fetchTickets}
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
            Total Tickets
          </p>

          <p className="mt-2 text-3xl font-bold text-white">
            {tickets.length}
          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Open
          </p>

          <p className="mt-2 text-3xl font-bold text-cyan-400">

            {
              tickets.filter(
                (ticket) =>
                  ticket.status ===
                  "OPEN"
              ).length
            }

          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            High Priority
          </p>

          <p className="mt-2 text-3xl font-bold text-red-400">

            {
              tickets.filter(
                (ticket) =>
                  ticket.priority ===
                  "HIGH"
              ).length
            }

          </p>

        </div>


        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">

          <p className="text-sm text-gray-400">
            Resolved
          </p>

          <p className="mt-2 text-3xl font-bold text-emerald-400">

            {
              tickets.filter(
                (ticket) =>
                  ticket.status ===
                  "RESOLVED"
              ).length
            }

          </p>

        </div>

      </div>


      {/* TICKETS */}

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

        {tickets.length === 0 ? (

          <div className="p-12 text-center">

            <h3 className="text-lg font-semibold text-white">
              No support tickets
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Customer support requests will appear here.
            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/10">

            {tickets.map(
              (ticket) => (

                <div
                  key={ticket.id}
                  className="p-5 transition hover:bg-white/[0.03]"
                >

                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">


                    {/* MAIN */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3 className="font-semibold text-white">

                          {ticket.subject}

                        </h3>


                        <span className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs text-cyan-300">

                          {ticket.category}

                        </span>


                        <span
                          className={`rounded-full px-2.5 py-1 text-xs ${
                            ticket.status ===
                            "OPEN"
                              ? "bg-blue-400/10 text-blue-300"
                              : ticket.status ===
                                "RESOLVED"
                              ? "bg-emerald-400/10 text-emerald-300"
                              : "bg-yellow-400/10 text-yellow-300"
                          }`}
                        >

                          {ticket.status}

                        </span>

                      </div>


                      <div className="mt-2 text-sm text-gray-400">

                        <span className="text-white">

                          {getCustomerName(
                            ticket.user
                          )}

                        </span>

                        {" · "}

                        {ticket.user.email}

                      </div>


                      <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">

                        {ticket.message}

                      </p>


                      <p className="mt-3 text-xs text-gray-500">

                        {new Date(
                          ticket.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex flex-wrap items-center gap-2">


                      <select
                        value={
                          ticket.priority
                        }
                        disabled={
                          updating
                        }
                        onChange={(
                          event
                        ) =>
                          updateTicket(
                            ticket.id,
                            {
                              priority:
                                event.target
                                  .value,
                            }
                          )
                        }
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white outline-none"
                      >

                        <option value="LOW">
                          Low Priority
                        </option>

                        <option value="MEDIUM">
                          Medium Priority
                        </option>

                        <option value="HIGH">
                          High Priority
                        </option>

                      </select>


                      <select
                        value={
                          ticket.status
                        }
                        disabled={
                          updating
                        }
                        onChange={(
                          event
                        ) =>
                          updateTicket(
                            ticket.id,
                            {
                              status:
                                event.target
                                  .value,
                            }
                          )
                        }
                        className="rounded-lg border border-white/10 bg-black/20 px-3 py-2 text-xs text-white outline-none"
                      >

                        <option value="OPEN">
                          Open
                        </option>

                        <option value="IN_PROGRESS">
                          In Progress
                        </option>

                        <option value="RESOLVED">
                          Resolved
                        </option>

                        <option value="CLOSED">
                          Closed
                        </option>

                      </select>


                      <button
                        onClick={() =>
                          setSelectedTicket(
                            ticket
                          )
                        }
                        className="rounded-lg border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs text-cyan-300 transition hover:bg-cyan-400/20"
                      >

                        View Details

                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* DETAILS MODAL */}

      {selectedTicket && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827]">


            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 p-6">

              <div>

                <h2 className="text-xl font-semibold text-white">

                  {selectedTicket.subject}

                </h2>

                <p className="mt-1 text-sm text-gray-400">

                  {selectedTicket.ticketNumber}

                </p>

              </div>


              <button
                onClick={() =>
                  setSelectedTicket(
                    null
                  )
                }
                className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >

                ✕

              </button>

            </div>


            <div className="space-y-6 p-6">


              {/* CUSTOMER */}

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Customer
                </p>

                <p className="mt-1 text-white">

                  {getCustomerName(
                    selectedTicket.user
                  )}

                </p>

                <p className="text-sm text-gray-400">

                  {selectedTicket.user.email}

                </p>

              </div>


              {/* CATEGORY */}

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Category
                </p>

                <p className="mt-1 text-white">

                  {selectedTicket.category}

                </p>

              </div>


              {/* ORIGINAL MESSAGE */}

              <div>

                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Original Message
                </p>

                <div className="mt-2 whitespace-pre-wrap rounded-xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-gray-300">

                  {selectedTicket.message}

                </div>

              </div>


              {/* CONVERSATION */}

              <div>

                <p className="mb-3 text-xs uppercase tracking-wide text-gray-500">

                  Conversation

                </p>


                {selectedTicket.responses.length === 0 ? (

                  <p className="text-sm text-gray-500">

                    No replies yet.

                  </p>

                ) : (

                  <div className="space-y-3">

                    {selectedTicket.responses.map(
                      (response) => (

                        <div
                          key={response.id}
                          className={`rounded-xl border p-4 ${
                            response.isAdmin
                              ? "border-cyan-400/20 bg-cyan-400/10"
                              : "border-white/10 bg-white/[0.03]"
                          }`}
                        >

                          <div className="mb-2 flex items-center justify-between">

                            <span className="text-sm font-medium text-white">

                              {response.isAdmin
                                ? response.adminName ||
                                  "EvolTechs Support"
                                : getCustomerName(
                                    selectedTicket.user
                                  )}

                            </span>


                            <span className="text-xs text-gray-500">

                              {new Date(
                                response.createdAt
                              ).toLocaleString()}

                            </span>

                          </div>


                          <p className="whitespace-pre-wrap text-sm leading-6 text-gray-300">

                            {response.message}

                          </p>

                        </div>

                      )
                    )}

                  </div>

                )}

              </div>


              {/* REPLY */}

              <div className="border-t border-white/10 pt-5">

                <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">

                  Reply to Customer

                </p>


                <textarea
                  value={
                    replyMessage
                  }
                  onChange={(
                    event
                  ) =>
                    setReplyMessage(
                      event.target.value
                    )
                  }
                  placeholder="Write your response to the customer..."
                  rows={5}
                  disabled={
                    sendingReply
                  }
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-cyan-400/40"
                />


                <div className="mt-3 flex justify-end">

                  <button
                    onClick={
                      replyToTicket
                    }
                    disabled={
                      sendingReply ||
                      !replyMessage.trim()
                    }
                    className="rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-medium text-black transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    {sendingReply
                      ? "Sending..."
                      : "Send Reply"}

                  </button>

                </div>

              </div>


              {/* STATUS */}

              <div className="grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2">


                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Status
                  </p>

                  <p className="mt-1 text-white">

                    {selectedTicket.status}

                  </p>

                </div>


                <div>

                  <p className="text-xs uppercase tracking-wide text-gray-500">
                    Priority
                  </p>

                  <p className="mt-1 text-white">

                    {selectedTicket.priority}

                  </p>

                </div>

              </div>


              {/* CREATED DATE */}

              <div className="border-t border-white/10 pt-5">

                <p className="text-xs text-gray-500">

                  Submitted{" "}

                  {new Date(
                    selectedTicket.createdAt
                  ).toLocaleString()}

                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};