"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { ticketSystemValidate } from "@/validation/helpTicketSystemValidate";
import { ZodError } from "zod";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { IClient } from "@/mongodb/schemas/ClientSchema";
import { ITicket } from "@/mongodb/schemas/TicketSchema";

const TicketSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState("form");
  const [clientData, setClientData] = useState<IClient | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactNumber: "",
    helpTopic: "",
    product: "",
    subject: "",
    message: "",
    status: "Open",

  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validateData = ticketSystemValidate.parse(formData);
      const res = await fetch("/api/v1/tickets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validateData),
      });
      if (res.ok) {
        const newTicket = await res.json();
        setTickets((prevTickets) => [...prevTickets, newTicket]);
        setFormData({
          name: "",
          email: "",
          contactNumber: "",
          helpTopic: "",
          product: "",
          subject: "",
          message: "",
          status: "Open",

        });
      }

    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const fetchTickets = async (status: string) => {
    try {
      const res = await fetch(`/api/v1/tickets?status=${status}`);
      if (res.ok) {
        const data: ITicket[] = await res.json();
        setTickets(data);
      }
    } catch (error) {
      console.error(`Error fetching ${status} tickets:`, error);
    }
  };

  useEffect(() => {
    if (activeTab !== "form") {
      fetchTickets(activeTab);
    }
  }, [activeTab]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/v1/products", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {

          const data = await res.json();
          setClientData(data?.response);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);



  const renderTabContent = () => {
    if (activeTab === "form") {
      return (
        <div className={styles.formContainer}>
          <div className={styles.fromHeader}>
            <label>Fill below form to Raise Ticket</label>
          </div>
          <div className={styles.raise_ticket_form_row_one}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Contact Email</label>
              <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contactNumber">Contact Number</label>
              <input id="contactNumber" name="contactNumber" type="tel" value={formData.contactNumber} onChange={handleInputChange} />
              {errors.contactNumber && <p className={styles.error}>{errors.contactNumber}</p>}
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="helpTopic">Help Topic</label>
            <select id="helpTopic" name="helpTopic" value={formData.helpTopic} onChange={handleInputChange}>
              <option value="none">--Select--</option>
              <option value="Technical Support">Technical Support</option>
              <option value="Billing">Billing</option>
              <option value="Other">Other</option>
            </select>
            {errors.helpTopic && <p className={styles.error}>{errors.helpTopic}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="product">Choose Your Product</label>
            <select id="product" name="product" value={formData.product} onChange={handleInputChange}>
              <option value="none">--Select--</option>

              <option value={clientData?.products}>
                {clientData?.products}
              </option>
            </select>


            {errors.product && <p className={styles.error}>{errors.product}</p>}
          </div>
          {clientData?.products?.includes("webApp") && (
            <div className={styles.formGroup}>
              <label htmlFor="domainName">Choose Your Domain Name</label>
              <select
                id="domainName"
                name="domainName"
                // value={formData.domainName}
                onChange={handleInputChange}
              >
                <option value="none">--Select--</option>
                <option value={clientData?.domain || ""}>
                  {clientData?.domain || "No domain available"}
                </option>
              </select>
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} />
            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange} />
            {errors.message && <p className={styles.error}>{errors.message}</p>}
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Raise Ticket
          </button>
        </div>
      );
    }
    const filteredTickets = activeTab === "Open" ? tickets.filter((ticket) => ticket.status === "Open")
      : tickets.filter((ticket) => ticket.status === "Closed");


    return (
      <div className={styles.accordionContainer}>
        {filteredTickets.length > 0 ? (
          filteredTickets?.map((ticket, index) => (
            <div key={index} className={styles.accordionItem}>
              <div
                className={`${styles.accordionHeader} ${activeAccordion === index ? styles.activeHeader : ""}`}
                onClick={() => toggleAccordion(index)}
              >
                <div>
                  <strong>TokenNo:</strong> {index + 1}
                </div>
                <div>
                  <strong>Status:</strong> {ticket.status}
                </div>
                <div>
                  <strong>Subject:</strong> {ticket.subject}
                </div>
                <span className={styles.toggleIcon}>
                  {activeAccordion === index ? <BiCollapse /> : <BiExpand />}
                </span>
              </div>
              {activeAccordion === index && (
                <div className={styles.accordionBody}>
                  <table className={styles.ticketTable}>
                    <thead>
                      <tr>
                        <th><strong>Name</strong></th>
                        <th><strong>Email</strong></th>
                        <th><strong>Contact Number</strong></th>
                        <th><strong>Help Topic</strong></th>
                        <th><strong>Product</strong></th>
                        {/* <th><strong>Domain Name</strong></th> */}
                        <th><strong>Message</strong></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{ticket.name}</td>
                        <td>{ticket.email}</td>
                        <td>{ticket.contactNumber}</td>
                        <td>{ticket.helpTopic}</td>
                        <td>{ticket.product}</td>
                        {/* <td>{ticket.domainName}</td> */}
                        <td>{ticket.message}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className={styles.noTickets}>No tickets available.</p>
        )}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "form" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("form")}
        >
          Raise Ticket
        </button>

        <button
          className={`${styles.tab} ${activeTab === "Open" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("Open")}
        >
          Pending Tickets
        </button>
        <button
          className={`${styles.tab} ${activeTab === "Closed" ? styles.activeTab : ""}`}
          onClick={() => setActiveTab("Closed")}
        >
          Resolved Tickets
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default TicketSystem;






