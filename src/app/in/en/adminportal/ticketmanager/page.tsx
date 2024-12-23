"use client";

import { useState, useEffect } from "react";
import styles from "./ticketmanager.module.css"; // Import the CSS Module

// Define types for Ticket data
interface Message {
  message: string;
  sentBy: string;
  createdAt: string;
}

interface Ticket {
  id: string;
  clientEmail: string;
  companyName: string;
  helpTopic: string;
  subject: string;
  service: string;
  contactNumber?: string;
  domain?: string;
  email: string;
  product: string;
  status: string;
  webApp?:string;
  messages: Message[]; // Array of messages
}

interface TicketInput {
  email: string;
  helpTopic: string;
  subject: string;
  contactNumber?: string;
  product: string;
  status: string;
  messages: Message[]; // Define a more specific type if possible
}
interface Client {
  email: string;
  companyName: string;
  service: string;
  domain?: string;
  Tickets: {
    openTickets: TicketInput[];
  };
}


const TicketManager = () => {
  const [activeTab, setActiveTab] = useState<"open" | "closed">("open");
  const [openTickets, setOpenTickets] = useState<Ticket[]>([]);
  // const [closedTickets, setClosedTickets] = useState<Ticket[]>([]);
  const closedTickets: Ticket[] = []

  // Function to fetch open tickets from the backend
  const fetchOpenTickets = async () => {
    try {
      const res = await fetch("/api/v1/tickets/open", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        const response = await res.json();
        console.log(response);
        // Map and format the response data
        const formattedTickets: Ticket[] = response.data.flatMap((client: Client) =>
          client.Tickets.openTickets.map((ticket: TicketInput, idx: number) => ({
            id: `${client.email}-ticket-${idx}`, // Unique ID based on client email and index
            clientEmail: ticket.email,
            companyName: client.companyName,
            helpTopic: ticket.helpTopic,
            subject: ticket.subject,
            service: client.service,
            contactNumber: ticket.contactNumber,
            domain: client.domain,
            email: client.email,
            product: ticket.product,
            status: ticket.status,
            messages: ticket.messages,
          }))
        );

        setOpenTickets(formattedTickets);
      }
    } catch (error) {
      console.error("Error fetching open tickets:", error);
    }
  };

  console.log(openTickets)
  // Function to fetch closed tickets from the backend
  const fetchClosedTickets = async () => {
    try {
      console.log("Fetching closed tickets...");
      // You can implement fetching closed tickets here in a similar way
    } catch (error) {
      console.error("Error fetching closed tickets:", error);
    }
  };

  // Fetch data when the component loads or activeTab changes
  useEffect(() => {
    if (activeTab === "open") {
      fetchOpenTickets();
    } else {
      fetchClosedTickets();
    }
  }, [activeTab]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ticket Manager</h1>

      {/* Tab Buttons */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "open" ? styles.active : ""
            }`}
          onClick={() => setActiveTab("open")}
        >
          Open Tickets
        </button>
        <button
          className={`${styles.tab} ${activeTab === "closed" ? styles.active : ""
            }`}
          onClick={() => setActiveTab("closed")}
        >
          Closed Tickets
        </button>
      </div>

      {/* Render Open Tickets */}
      {activeTab === "open" && (
        <div className={styles.ticketList}>
          {openTickets.length > 0 ? (
            openTickets.map((ticket:Ticket) => (
              <div key={ticket.id} className={styles.ticket}>
                <h3>Company: {ticket.companyName}</h3>
                <h3>domain: {ticket.domain}</h3>
                <h3>email: {ticket.email}</h3>
                <h3>service: {ticket.webApp}</h3>
                {/* <h3>Company: {ticket.companyName}</h3> */}
                <p>
                  <strong>Client Email:</strong> {ticket.clientEmail}
                </p>
                <p>
                  <strong>Subject:</strong> {ticket.subject}
                </p>
                <p>
                  <strong>Help Topic:</strong> {ticket.helpTopic}
                </p>
                <p>
                  <strong>Product:</strong> {ticket.product}
                </p>
                <p>
                  <strong>Contact Number:</strong> {ticket.contactNumber}
                </p>
                <p>
                  <strong>Status:</strong> {ticket.status}
                </p>

                {/* Render Messages */}
                <h4>Messages:</h4>
                {ticket.messages.map((msg, idx) => (
                  <div
                    key={`${ticket.id}-msg-${idx}`} // Unique key for messages
                    style={{ marginLeft: "15px" }}
                  >
                    <p>
                      <strong>Message:</strong> {msg.message}
                    </p>
                    <p>
                      <strong>Sent By:</strong> {msg.sentBy}
                    </p>
                    <p>
                      <strong>Created At:</strong>{" "}
                      {new Date(msg.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}

                <button>VIEW TICKET</button>
              </div>
            ))
          ) : (
            <p>No open tickets found</p>
          )}
        </div>
      )}

      {/* Render Closed Tickets */}
      {activeTab === "closed" && (
        <div className={styles.ticketList}>
          {closedTickets.length > 0 ? (
            closedTickets.map((ticket) => (
              <div key={ticket.id} className={styles.ticket}>
                <h3>Company: {ticket.companyName}</h3>
                <p>
                  <strong>Client Email:</strong> {ticket.clientEmail}
                </p>
                <p>
                  <strong>Subject:</strong> {ticket.subject}
                </p>
                <p>
                  <strong>Help Topic:</strong> {ticket.helpTopic}
                </p>
              </div>
            ))
          ) : (
            <p>No closed tickets found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TicketManager;
