import {
  useEffect,
  useState,
  type SVGProps,
  type FormEvent,
} from "react";

import { apiClient } from "../../api/client";

type IconProps = SVGProps<SVGSVGElement>;

/* ======================================================
   ICONS
====================================================== */

const MessageCircle = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M21 11.5c0 4.97-4.03 9-9 9a9 9 0 0 1-4.78-1.35L3 20l1.85-3.23A8.96 8.96 0 0 1 3 11.5c0-4.97 4.03-9 9-9s9 4.03 9 9Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.5 11.5h6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M11.5 8.5v6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const Headphones = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M4 13v-2a8 8 0 0 1 16 0v2"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M6 13h0a2 2 0 0 0-2 2v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4a2 2 0 0 0-2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M18 13h0a2 2 0 0 1 2 2v4a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-4a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Clock3 = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="M12 7.5v4.5l3.5 2.1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ShieldCheck = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 3 5 6.5v5.75c0 5 3.25 8.75 7 9.75 3.75-1 7-4.75 7-9.75V6.5L12 3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M9 12.5l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowUpRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M7 17 17 7M7 7h10v10"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Sparkles = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M12 2.5 13.4 6.9 18 8.25 14.1 11.6 14.9 16.1 12 13.9 9.1 16.1 9.9 11.6 6 8.25 10.6 6.9 12 2.5Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckCircle = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.8"
    />

    <path
      d="m8 12 2.5 2.5L16 9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronRight = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="m9 18 6-6-6-6"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Send = (props: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="m22 2-7 20-4-9-9-4 20-7Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    <path
      d="M22 2 11 13"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

/* ======================================================
   TAWK TYPES
====================================================== */

declare global {
  interface Window {
    Tawk_API?: {
      onLoad?: () => void;
      maximize?: () => void;
      minimize?: () => void;
      hideWidget?: () => void;
      showWidget?: () => void;
    };

    Tawk_LoadStart?: Date;
  }
}

/* ======================================================
   TYPES
====================================================== */

type TicketForm = {
  subject: string;
  category: string;
  message: string;
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
  responses: TicketResponse[];
};

/* ======================================================
   COMPONENT
====================================================== */

export const Support = () => {
  const [chatReady, setChatReady] = useState(false);

  const [ticket, setTicket] = useState<TicketForm>({
    subject: "",
    category: "",
    message: "",
  });

  const [tickets, setTickets] = useState<SupportTicket[]>([]);

  const [selectedTicket, setSelectedTicket] =
    useState<SupportTicket | null>(null);

  const [replyMessage, setReplyMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoadingTickets, setIsLoadingTickets] =
    useState(true);

  const [isSendingReply, setIsSendingReply] =
    useState(false);

  const [ticketSubmitted, setTicketSubmitted] =
    useState(false);

  const [ticketNumber, setTicketNumber] =
    useState("");

  const [error, setError] = useState("");

  const [replyError, setReplyError] =
    useState("");

  /* ======================================================
     LOAD TAWK
  ====================================================== */

  useEffect(() => {
    if (document.getElementById("tawk-script")) {
      setChatReady(true);

      setTimeout(() => {
        window.Tawk_API?.maximize?.();
      }, 700);

      return;
    }

    window.Tawk_API = window.Tawk_API || {};

    window.Tawk_LoadStart = new Date();

    window.Tawk_API.onLoad = () => {
      setChatReady(true);

      setTimeout(() => {
        window.Tawk_API?.maximize?.();
      }, 700);
    };

    const script = document.createElement("script");

    script.id = "tawk-script";

    script.async = true;

    script.src =
      "https://embed.tawk.to/67e840310af2d7190363b4f1/1inhjlgu3";

    script.charset = "UTF-8";

    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);
  }, []);

  /* ======================================================
     LOAD CUSTOMER TICKETS
  ====================================================== */

  const fetchTickets = async () => {
    try {
      setIsLoadingTickets(true);

      const response =
        await apiClient.get("/support/tickets");

      setTickets(response.data.tickets || []);

    } catch (error: any) {
      console.error(
        "Failed to load support tickets:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Failed to load your support tickets."
      );

    } finally {
      setIsLoadingTickets(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  /* ======================================================
     SUBMIT NEW TICKET
  ====================================================== */

  const handleTicketSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!ticket.subject.trim()) {
      setError(
        "Please enter a subject for your support request."
      );

      return;
    }

    if (!ticket.category) {
      setError(
        "Please select a support category."
      );

      return;
    }

    if (!ticket.message.trim()) {
      setError(
        "Please describe the issue you need help with."
      );

      return;
    }

    try {
      setIsSubmitting(true);

      const response =
        await apiClient.post(
          "/support/tickets",
          {
            subject: ticket.subject.trim(),

            category:
              ticket.category,

            message:
              ticket.message.trim(),
          }
        );

      const data =
        response.data;

      setTicketNumber(
        data.ticket?.ticketNumber ||
          data.ticketNumber ||
          ""
      );

      setTicketSubmitted(true);

      setTicket({
        subject: "",
        category: "",
        message: "",
      });

      await fetchTickets();

    } catch (error: any) {
      console.error(
        "Support ticket submission error:",
        error
      );

      setError(
        error?.response?.data?.message ||
          "Something went wrong while submitting your ticket."
      );

    } finally {
      setIsSubmitting(false);
    }
  };

  /* ======================================================
     SEND CUSTOMER REPLY
  ====================================================== */

  const handleReplySubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!selectedTicket) {
      return;
    }

    const cleanMessage =
      replyMessage.trim();

    if (!cleanMessage) {
      setReplyError(
        "Please enter a message."
      );

      return;
    }

    try {
      setIsSendingReply(true);

      setReplyError("");

      await apiClient.post(
        `/support/tickets/${selectedTicket.id}/reply`,
        {
          message: cleanMessage,
        }
      );

      setReplyMessage("");

      await fetchTickets();

      const refreshed =
        await apiClient.get(
          "/support/tickets"
        );

      const updatedTicket =
        refreshed.data.tickets.find(
          (ticket: SupportTicket) =>
            ticket.id === selectedTicket.id
        );

      if (updatedTicket) {
        setSelectedTicket(updatedTicket);
      }

    } catch (error: any) {
      console.error(
        "Failed to send support reply:",
        error
      );

      setReplyError(
        error?.response?.data?.message ||
          "Failed to send your reply."
      );

    } finally {
      setIsSendingReply(false);
    }
  };

  /* ======================================================
     OPEN CHAT
  ====================================================== */

  const openChat = () => {
    window.Tawk_API?.maximize?.();
  };

  /* ======================================================
     STATUS STYLE
  ====================================================== */

  const getStatusStyle = (
    status: string
  ) => {
    switch (status) {
      case "OPEN":
        return "bg-blue-400/10 text-blue-300";

      case "IN_PROGRESS":
        return "bg-yellow-400/10 text-yellow-300";

      case "RESOLVED":
        return "bg-emerald-400/10 text-emerald-300";

      case "CLOSED":
        return "bg-gray-400/10 text-gray-300";

      default:
        return "bg-white/10 text-gray-300";
    }
  };

  /* ======================================================
     RENDER
  ====================================================== */

  return (
    <div className="min-h-full w-full">

      {/* ==================================================
          HEADER
      ================================================== */}

      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-6 sm:p-8 lg:p-10">

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative z-10 max-w-3xl">

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">

            <Sparkles className="h-3.5 w-3.5" />

            EvolTechs Support

          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">

            How can we help you?

          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">

            Get help with your website, domains, hosting, email, technical
            issues, and other EvolTechs services.

          </p>

          <div className="mt-7 flex flex-wrap gap-3">

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-gray-300">

              <Clock3 className="h-4 w-4 text-cyan-400" />

              Response within 24 hours

            </div>

            <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/10 px-4 py-3 text-sm text-gray-300">

              <ShieldCheck className="h-4 w-4 text-cyan-400" />

              Secure support

            </div>

          </div>

        </div>

      </section>


      {/* ==================================================
          MY SUPPORT TICKETS
      ================================================== */}

      <section className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03]">

        <div className="border-b border-white/10 p-6 sm:p-8">

          <h2 className="text-xl font-semibold text-white">

            My Support Tickets

          </h2>

          <p className="mt-2 text-sm text-gray-400">

            View your previous support requests and continue conversations with the EvolTechs support team.

          </p>

        </div>

        {isLoadingTickets ? (

          <div className="p-8 text-center text-sm text-gray-500">

            Loading your support tickets...

          </div>

        ) : tickets.length === 0 ? (

          <div className="p-8 text-center">

            <Headphones className="mx-auto h-10 w-10 text-gray-600" />

            <p className="mt-4 text-sm text-gray-400">

              You have not submitted any support tickets yet.

            </p>

          </div>

        ) : (

          <div className="divide-y divide-white/10">

            {tickets.map((item) => (

              <button
                key={item.id}
                type="button"
                onClick={() =>
                  setSelectedTicket(item)
                }
                className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-white/[0.04]"
              >

                <div className="min-w-0">

                  <div className="flex flex-wrap items-center gap-2">

                    <h3 className="truncate font-medium text-white">

                      {item.subject}

                    </h3>

                    <span className={`rounded-full px-2.5 py-1 text-xs ${getStatusStyle(item.status)}`}>

                      {item.status.replace(
                        "_",
                        " "
                      )}

                    </span>

                  </div>

                  <p className="mt-2 text-xs text-gray-500">

                    {item.ticketNumber}

                    {" · "}

                    {item.category}

                    {" · "}

                    {new Date(
                      item.createdAt
                    ).toLocaleString()}

                  </p>

                  <p className="mt-2 line-clamp-1 text-sm text-gray-400">

                    {item.responses.length > 0
                      ? item.responses[
                          item.responses.length - 1
                        ].message
                      : item.message}

                  </p>

                </div>

                <ChevronRight className="h-5 w-5 shrink-0 text-gray-500" />

              </button>

            ))}

          </div>

        )}

      </section>


      {/* ==================================================
          MAIN CONTENT
      ================================================== */}

      <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">

        {/* ==================================================
            NEW TICKET
        ================================================== */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">

          <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

          <div className="relative z-10 p-6 sm:p-8 lg:p-10">

            {!ticketSubmitted ? (

              <>

                <div className="mb-8">

                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

                    <Headphones className="h-7 w-7 text-cyan-400" />

                  </div>

                  <h2 className="text-2xl font-semibold text-white">

                    Submit a Support Ticket

                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-400">

                    For issues that require investigation, submit a support request and our team will review it and respond within 24 hours.

                  </p>

                </div>

                {error && (

                  <div className="mb-6 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">

                    {error}

                  </div>

                )}

                <form
                  onSubmit={handleTicketSubmit}
                  className="space-y-5"
                >

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                      What do you need help with?

                    </label>

                    <input
                      type="text"
                      value={ticket.subject}
                      onChange={(event) =>
                        setTicket((current) => ({
                          ...current,
                          subject:
                            event.target.value,
                        }))
                      }
                      placeholder="e.g. My website is not loading"
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    />

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                      Support category

                    </label>

                    <select
                      value={ticket.category}
                      onChange={(event) =>
                        setTicket((current) => ({
                          ...current,
                          category:
                            event.target.value,
                        }))
                      }
                      className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-gray-400 outline-none transition focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    >

                      <option value="">
                        Select a category
                      </option>

                      <option value="website">
                        Website
                      </option>

                      <option value="domain">
                        Domain
                      </option>

                      <option value="hosting">
                        Hosting
                      </option>

                      <option value="email">
                        Business Email
                      </option>

                      <option value="billing">
                        Billing & Invoices
                      </option>

                      <option value="technical">
                        Technical Issue
                      </option>

                      <option value="other">
                        Other
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-300">

                      Describe your issue

                    </label>

                    <textarea
                      value={ticket.message}
                      onChange={(event) =>
                        setTicket((current) => ({
                          ...current,
                          message:
                            event.target.value,
                        }))
                      }
                      placeholder="Please provide as much detail as possible..."
                      rows={8}
                      className="w-full resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-gray-600 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/10"
                    />

                  </div>

                  <div className="flex flex-col gap-4 border-t border-white/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-center gap-2 text-xs text-gray-500">

                      <Clock3 className="h-4 w-4 text-cyan-400" />

                      We aim to respond within 24 hours

                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                    >

                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          Submit Support Ticket

                          <ArrowUpRight className="h-4 w-4" />
                        </>
                      )}

                    </button>

                  </div>

                </form>

              </>

            ) : (

              <div className="flex min-h-[580px] flex-col items-center justify-center text-center">

                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-emerald-400/20 bg-emerald-400/10">

                  <CheckCircle className="h-10 w-10 text-emerald-400" />

                </div>

                <h2 className="text-2xl font-semibold text-white">

                  Support ticket submitted

                </h2>

                <p className="mt-4 max-w-md text-sm leading-6 text-gray-400">

                  Your support request has been received by the EvolTechs team.

                </p>

                {ticketNumber && (

                  <div className="mt-6 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-sm text-cyan-300">

                    Ticket number:

                    {" "}

                    <span className="font-semibold">

                      {ticketNumber}

                    </span>

                  </div>

                )}

                <button
                  onClick={() => {
                    setTicketSubmitted(false);

                    setTicketNumber("");

                    setError("");
                  }}
                  className="mt-7 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
                >

                  Submit another ticket

                </button>

              </div>

            )}

          </div>

        </div>


        {/* ==================================================
            SIDEBAR
        ================================================== */}

        <aside className="space-y-4">

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400/10">

              <Headphones className="h-5 w-5 text-cyan-400" />

            </div>

            <h3 className="font-semibold text-white">

              What can we help with?

            </h3>

            <ul className="mt-4 space-y-3 text-sm text-gray-400">

              <li>• Website technical issues</li>

              <li>• Domain registration and management</li>

              <li>• Hosting and server problems</li>

              <li>• Business email assistance</li>

              <li>• Website updates and maintenance</li>

              <li>• General EvolTechs services</li>

            </ul>

          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/10 to-transparent p-6">

            <h3 className="font-semibold text-white">

              Need immediate help?

            </h3>

            <p className="mt-3 text-sm leading-6 text-gray-400">

              Start a live conversation with our support assistant for immediate assistance.

            </p>

            <button
              onClick={openChat}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
            >

              <MessageCircle className="h-4 w-4" />

              Open Live Chat

            </button>

            {!chatReady && (

              <p className="mt-3 text-center text-xs text-gray-500">

                Connecting to live support...

              </p>

            )}

          </div>

        </aside>

      </section>


      {/* ==================================================
          TICKET CONVERSATION MODAL
      ================================================== */}

      {selectedTicket && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">

          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111827]">

            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-white/10 p-6">

              <div className="min-w-0">

                <div className="flex flex-wrap items-center gap-2">

                  <h2 className="truncate text-xl font-semibold text-white">

                    {selectedTicket.subject}

                  </h2>

                  <span className={`rounded-full px-2.5 py-1 text-xs ${getStatusStyle(selectedTicket.status)}`}>

                    {selectedTicket.status.replace(
                      "_",
                      " "
                    )}

                  </span>

                </div>

                <p className="mt-2 text-sm text-gray-500">

                  {selectedTicket.ticketNumber}

                  {" · "}

                  {selectedTicket.category}

                </p>

              </div>

              <button
                onClick={() =>
                  setSelectedTicket(null)
                }
                className="rounded-lg px-3 py-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >

                ✕

              </button>

            </div>


            {/* CONVERSATION */}

            <div className="flex-1 space-y-5 overflow-y-auto p-6">

              {/* ORIGINAL MESSAGE */}

              <div className="flex justify-end">

                <div className="max-w-[85%] rounded-2xl rounded-br-md border border-cyan-400/20 bg-cyan-400/10 p-4">

                  <p className="mb-2 text-xs font-medium text-cyan-300">

                    You

                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200">

                    {selectedTicket.message}

                  </p>

                  <p className="mt-3 text-right text-xs text-gray-500">

                    {new Date(
                      selectedTicket.createdAt
                    ).toLocaleString()}

                  </p>

                </div>

              </div>


              {/* REPLIES */}

              {selectedTicket.responses.map(
                (response) => (

                  <div
                    key={response.id}
                    className={`flex ${
                      response.isAdmin
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 ${
                        response.isAdmin
                          ? "rounded-bl-md border border-white/10 bg-white/[0.06]"
                          : "rounded-br-md border border-cyan-400/20 bg-cyan-400/10"
                      }`}
                    >

                      <p className="mb-2 text-xs font-medium text-gray-400">

                        {response.isAdmin
                          ? response.adminName ||
                            "EvolTechs Support"
                          : "You"}

                      </p>

                      <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200">

                        {response.message}

                      </p>

                      <p className="mt-3 text-xs text-gray-500">

                        {new Date(
                          response.createdAt
                        ).toLocaleString()}

                      </p>

                    </div>

                  </div>

                )
              )}

            </div>


            {/* REPLY FORM */}

            {selectedTicket.status !== "CLOSED" && (

              <div className="border-t border-white/10 p-5">

                {replyError && (

                  <div className="mb-3 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">

                    {replyError}

                  </div>

                )}

                <form
                  onSubmit={handleReplySubmit}
                  className="flex gap-3"
                >

                  <textarea
                    value={replyMessage}
                    onChange={(event) =>
                      setReplyMessage(
                        event.target.value
                      )
                    }
                    placeholder="Write a reply..."
                    rows={3}
                    className="flex-1 resize-none rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-cyan-400/50"
                  />

                  <button
                    type="submit"
                    disabled={
                      isSendingReply ||
                      !replyMessage.trim()
                    }
                    className="self-end rounded-xl bg-cyan-500 p-3 text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                    <Send className="h-5 w-5" />

                  </button>

                </form>

              </div>

            )}

            {selectedTicket.status === "CLOSED" && (

              <div className="border-t border-white/10 p-5 text-center text-sm text-gray-500">

                This support ticket is closed.

              </div>

            )}

          </div>

        </div>

      )}

    </div>
  );
};