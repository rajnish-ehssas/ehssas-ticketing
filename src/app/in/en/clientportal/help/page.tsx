"use client";
import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import { ticketSystemValidate } from "@/validation/helpTicketSystemValidate";
// import { ZodError } from "zod";
import { BiExpand, BiCollapse } from "react-icons/bi";
import { IClient } from "@/mongodb/schemas/ClientSchema";
import { ITicket } from "@/mongodb/schemas/Tickets";
import RInput from "@/childComponent/RInput";
import { IoMdArrowRoundForward } from "react-icons/io";
import RButton from "@/childComponent/RButton";

const TicketSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"form" | "Open" | "Closed">("form");
  const [clientData, setClientData] = useState<IClient | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    contactEmail: "",
    contactNumber: "",
    helpTopic: "",
    chooseYourProduct: "",
    domain: "",
    saasProductName: "",
    subject: "",
    messages: "",
  });
  const [messageInputs, setMessageInputs] = useState<{ [key: number]: string }>({});

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
      // console.log('formData:', formData);
      const validateData = ticketSystemValidate.parse(formData);
      // console.log('validateData:', validateData);
      const res = await fetch("/api/v1/tickets", {
        method: "POST",
        body: JSON.stringify(validateData),
      });
      // console.log('res:', res);
      const newTicket = await res.json();
      if (!res.ok) {
        // console.log('newTicket ERR:', newTicket);
        setErrors({ form: newTicket.error });
        return;
      } else {
        // console.log('newTicket ok:', newTicket);
        setErrors({ form: "" });
        setFormData({
          name: "",
          contactEmail: "",
          contactNumber: "",
          helpTopic: "",
          chooseYourProduct: "",
          domain: "",
          saasProductName: "",
          subject: "",
          messages: "",
        });
      }
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      setErrors({ form: "An unexpected error occurred. Please try again." });
    }
  };
  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const handleMessageChange = (index: number, value: string) => {
    setMessageInputs(prevState => ({
      ...prevState,
      [index]: value,
    }));
  };

  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        const status = `status=${activeTab}`;
        const res = await fetch(`/api/v1/tickets?${status}`);
        if (res.ok) {
          const response = await res.json();
          setTickets(response);
        }
      } catch (error) {
        console.error("Error fetching open tickets:", error);
      }
    };
    fetchOpenTickets()
  }, [activeTab, messageInputs]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/v1/products");
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

  const handleUpdateTicket = async (ticket: ITicket, index: number) => {
    try {
      const res = await fetch("/api/v1/tickets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket._id,
          message: messageInputs[index],
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setMessageInputs(prevState => ({
          ...prevState,
          [index]: '',
        }));
        throw new Error(errorData.error || "Failed to update ticket");
      } else {
        // const updatedTicket = await res.json();
        setMessageInputs(prevState => ({
          ...prevState,
          [index]: '',
        }));
        // console.log("Ticket successfully updated:", updatedTicket);
      }

    } catch (error: unknown) {
      console.error("Error updating ticket:", error);
    }
  }

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
              <label htmlFor="contactEmail">Contact Email</label>
              <input multiple id="contactEmail" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleInputChange} />
              {errors.contactEmail && <p className={styles.error}>{errors.contactEmail}</p>}
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
            <label htmlFor="chooseYourProduct">Choose Your Product</label>
            <select id="chooseYourProduct" name="chooseYourProduct" value={formData.chooseYourProduct} onChange={handleInputChange}>
              <option value="none">--Select--</option>
              <option value={clientData?.products}>
                {clientData?.products}
              </option>
            </select>
            {errors.chooseYourProduct && <p className={styles.error}>{errors.chooseYourProduct}</p>}
          </div>
          {clientData?.products?.includes("webApp") ? (
            <div className={styles.formGroup}>
              <label htmlFor="domain">Choose Your Domain Name</label>
              <select id="domain" name="domain"
                // value={formData.domain}
                onChange={handleInputChange}
              >
                <option value="none">--Select--</option>
                <option value={clientData?.domain || ""}>
                  {clientData?.domain || "No domain available"}
                </option>
              </select>
            </div>
          ) : (
            <div className={styles.formGroup}>
              <label htmlFor="saasProductName">Choose Your saas Product Name</label>
              <input id="saasProductName" name="saasProductName" value={formData.saasProductName} onChange={handleInputChange} />
            </div>
          )}
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={formData.subject} onChange={handleInputChange} />
            {errors.subject && <p className={styles.error}>{errors.subject}</p>}
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="messages">Message</label>
            <textarea id="messages" name="messages" rows={3} value={formData.messages} onChange={handleInputChange} />
            {errors.messages && <p className={styles.error}>{errors.messages}</p>}
          </div>
          <button className={styles.submitButton} onClick={handleSubmit}>
            Raise Ticket
          </button>
        </div>
      );
    } else if (activeTab === "Open") {
      return (
        <div className={styles.accordionContainer}>
          {tickets.length ?
            (
              tickets?.map((ticket: ITicket, index: number) => (
                <div key={index} className={styles.accordionItem}>
                  <div
                    className={`${styles.accordionHeader} ${activeAccordion === index ? styles.activeHeader : ""}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div><strong>Ticket Number:</strong>{String(ticket?._id)}</div>
                    <div>
                      <strong>Status:</strong> {activeTab}
                    </div>
                    {/* <div>
                      <strong>Subject:</strong> {ticket.subject}
                    </div> */}
                    <span>
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
                            <th><strong>
                              {ticket.chooseYourProduct === 'webApp' ?
                                "Domain Name" : "SaaS Product Name"
                              }
                            </strong></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ticket.name}</td>
                            <td>{ticket.contactEmail}</td>
                            <td>{ticket.contactNumber}</td>
                            <td>{ticket.helpTopic}</td>
                            <td>{ticket.chooseYourProduct}</td>
                            <td>{ticket.chooseYourProduct === "webApp" ?
                              ticket.domain : ticket.saasProductName}</td>
                          </tr>
                          <tr>
                            <td colSpan={6}>
                              <strong>Subject:</strong> {ticket.subject}
                            </td>
                          </tr>
                          {ticket.messages.map((message, index) => (<React.Fragment key={index}>
                            <tr>
                              <td colSpan={1}>
                                <strong>{message.sentBy === "CLIENT" ? "Me" : "Admin"}:</strong>
                              </td>
                              <td colSpan={4}>
                                {message.message}
                              </td>
                              <td colSpan={1}>
                                <strong>{new Date(message.createdAt as Date).toLocaleString()}</strong>
                              </td>
                            </tr>
                          </React.Fragment>))}
                          {(
                            <tr>
                              <td colSpan={1}>
                                <strong>Me:</strong>
                              </td>
                              <td colSpan={5}>
                                <RInput
                                  type="text"
                                  placeholder="Enter your message"
                                  value={messageInputs[index] || ''}
                                  onChange={(e) => handleMessageChange(index, e.target.value)}
                                />{" "}
                                <RButton onClick={() => handleUpdateTicket(ticket, index)}><IoMdArrowRoundForward /></RButton>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            )
            :
            (<p className={styles.noTickets}>No open tickets available.</p>)
          }
        </div>)
    } else if (activeTab === "Closed") {
      return (
        <div className={styles.accordionContainer}>
          {tickets.length ?
            (
              tickets?.map((ticket: ITicket, index: number) => (
                <div key={index} className={styles.accordionItem}>
                  <div
                    className={`${styles.accordionHeader} ${activeAccordion === index ? styles.activeHeader : ""}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <div>
                      <strong>Ticket Number:</strong> {String(ticket?._id)}
                    </div>
                    <div>
                      <strong>Status:</strong>{activeTab}
                    </div>
                    {/* <div>
                      <strong>Subject:</strong> {ticket.subject}
                    </div> */}
                    <span>
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
                            <th><strong>
                              {ticket.chooseYourProduct === 'webApp' ?
                                "Domain Name" : "SaaS Product Name"
                              }
                            </strong></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{ticket.name}</td>
                            <td>{ticket.contactEmail}</td>
                            <td>{ticket.contactNumber}</td>
                            <td>{ticket.helpTopic}</td>
                            <td>{ticket.chooseYourProduct}</td>
                            <td>{ticket.chooseYourProduct === "webApp" ?
                              ticket.domain : ticket.saasProductName}</td>
                          </tr>
                          <tr>
                            <td colSpan={6}>
                              <strong>Subject:</strong> {ticket.subject}
                            </td>
                          </tr>
                          {ticket.messages.map((message, index) => (
                            <tr key={index}>
                              <td colSpan={1}>
                                <strong>{message.sentBy === "CLIENT" ? "Me" : "Admin"}:</strong>
                              </td>
                              <td colSpan={4}>
                                {message.message}
                              </td>
                              <td colSpan={1}>
                                <strong>{new Date(message.createdAt as Date).toLocaleString()}</strong>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ))
            )
            :
            (<p className={styles.noTickets}>No closed tickets available.</p>)
          }
        </div>)
    }
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




