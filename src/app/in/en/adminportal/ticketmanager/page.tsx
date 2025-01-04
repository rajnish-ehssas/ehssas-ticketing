"use client";
import { useState, useEffect } from "react";
import styles from "./ticketmanager.module.css";
import { ITicket } from "@/mongodb/schemas/Tickets";
import RButton from "@/childComponent/RButton";
import RInput from "@/childComponent/RInput";
import { BiCollapse, BiExpand } from "react-icons/bi";

const TicketManager = () => {
  const [activeTab, setActiveTab] = useState<"Open" | "Closed">("Open");
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [messageInputs, setMessageInputs] = useState<{ [key: number]: string }>({});

  const toggleAccordion = (index: number) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        const status = `status=${activeTab}`;
        const res = await fetch(`/api/v1/tickets?${status}`);
        if (res.ok) {
          const response = await res.json();
          // console.log("response:", response);
          setTickets(response);
        }
      } catch (error) {
        console.error("Error fetching open tickets:", error);
      }
    };
    fetchOpenTickets()
  }, [activeTab, messageInputs]);

  const handleInputChange = (index: number, value: string) => {
    setMessageInputs(prevState => ({
      ...prevState,
      [index]: value,
    }));
  };

  const handleCloseTicket = async (ticket: ITicket, index: number) => {
    try {
      const res = await fetch("/api/v1/tickets", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticketId: ticket._id,
          message: messageInputs[index],
          status: "Closed",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to close ticket");
      } else {
        // const updatedTicket = await res.json();
        setMessageInputs(prevState => ({
          ...prevState,
          [index]: '',
        }));
      }
    } catch (error: unknown) {
      console.error("Error closing ticket:", error);
    }
  }
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
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Ticket Manager</h1>
      {/* Tab Buttons */}
      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "Open" ? styles.active : ""}`}
          onClick={() => setActiveTab("Open")}
        >
          Open Tickets
        </button>
        <button
          className={`${styles.tab} ${activeTab === "Closed" ? styles.active : ""}`}
          onClick={() => setActiveTab("Closed")}
        >
          Closed Tickets
        </button>
      </div>

      {/* Render Open Tickets */}
      {activeTab === "Open" && (<>
        <div className={styles.ticketList}>
          {tickets.length > 0 ? (
            // tickets.map((ticket: ITicket, index: number) => (
            //   <div key={index} className={styles.ticket}>
            //     {/* <h3>CompanyName: {ticket.contactEmail}</h3> */}
            //     <h3><strong>Ticket Number:</strong>{String(ticket?._id)}</h3>
            //     <p><strong>ServiceType: </strong> {ticket.chooseYourProduct}</p>
            //     {ticket.chooseYourProduct === 'webApp' ?
            //       <p><strong>Domain: </strong> {ticket.domain}</p>
            //       :
            //       <p><strong>saas Product Name: </strong> {ticket.saasProductName}</p>
            //     }
            //     <p><strong>Email: </strong> {ticket.contactEmail}</p>
            //     <p><strong>Name: </strong> {ticket.name}</p>
            //     <p><strong>Subject:</strong> {ticket.subject}</p>
            //     <p><strong>Help Topic:</strong> {ticket.helpTopic}</p>
            //     <p><strong>Contact Number:</strong> {ticket.contactNumber}</p>
            //     {/* Render Messages */}
            //     <h4>Messages:</h4>
            //     {ticket.messages.map((msg, idx) => (
            //       <div key={`${idx}-msg-${idx}`} style={{ marginLeft: "15px" }}>
            //         <p><strong>Message: </strong> {msg.message}</p>
            //         <p><strong>Sent By: </strong> {msg.sentBy}</p>
            //         <p><strong>Created At: </strong>{new Date(msg.createdAt as Date).toLocaleString()}</p>
            //       </div>
            //     ))}
            // <RInput
            //   type="text"
            //   placeholder="Enter your message"
            //   value={messageInputs[index] || ''}
            //   onChange={(e) => handleInputChange(index, e.target.value)}
            // />{" "}
            //     <RButton onClick={() => handleUpdateTicket(ticket, index)}>Submit</RButton>{" "}
            //     <RButton onClick={() => handleCloseTicket(ticket, index)}>Submit and Close</RButton>
            //   </div>
            // ))
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
                              <strong>{message.sentBy === "ADMIN" ? "Me" : "Client"}:</strong>
                            </td>
                            <td colSpan={4}>
                              {message.message}
                            </td>
                            <td colSpan={1}>
                              <strong>{new Date(message.createdAt as Date).toLocaleString()}</strong>
                            </td>
                          </tr>
                        ))}
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
                                onChange={(e) => handleInputChange(index, e.target.value)}
                              />{" "}
                              <RButton onClick={() => handleUpdateTicket(ticket, index)}>Submit</RButton>{" "}
                              <RButton onClick={() => handleCloseTicket(ticket, index)}>Submit and Close</RButton>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No open tickets found</p>
          )}
        </div>
      </>)
      }

      {/* Render Closed Tickets */}
      {
        activeTab === "Closed" && (
          <div className={styles.ticketList}>
            {tickets.length > 0 ? (
              // tickets.map((ticket: ITicket, index: number) => (
              //   <div key={index} className={styles.ticket}>
              //     {/* <h3>CompanyName: {ticket.contactEmail}</h3> */}
              //     <h3><strong>Ticket Number:</strong>{String(ticket?._id)}</h3>
              //     <p><strong>ServiceType: </strong> {ticket.chooseYourProduct}</p>
              //     {ticket.chooseYourProduct === 'webApp' ?
              //       <p><strong>Domain: </strong> {ticket.domain}</p>
              //       :
              //       <p><strong>saas Product Name: </strong> {ticket.saasProductName}</p>
              //     }
              //     <p><strong>Email: </strong> {ticket.contactEmail}</p>
              //     <p><strong>Name: </strong> {ticket.name}</p>
              //     <p><strong>Subject:</strong> {ticket.subject}</p>
              //     <p><strong>Help Topic:</strong> {ticket.helpTopic}</p>
              //     <p><strong>Contact Number:</strong> {ticket.contactNumber}</p>
              //     {/* Render Messages */}
              //     <h4>Messages:</h4>
              //     {ticket.messages.map((msg, idx) => (
              //       <div key={`${idx}-msg-${idx}`} style={{ marginLeft: "15px" }}>
              //         <p><strong>Message: </strong> {msg.message}</p>
              //         <p><strong>Sent By: </strong> {msg.sentBy}</p>
              //         <p><strong>Created At: </strong>{new Date(msg.createdAt as Date).toLocaleString()}</p>
              //       </div>
              //     ))}
              //   </div>
              // ))
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
                                <strong>{message.sentBy === "ADMIN" ? "Me" : "Client"}:</strong>
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
            ) : (
              <p>No open tickets found</p>
            )}
          </div>
        )
      }
    </div >
  );
};

export default TicketManager;
