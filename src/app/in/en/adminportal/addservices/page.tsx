"use client";
import { useState } from "react";
import styles from "./AddClientForm.module.css";

const Page = () => {
  const [formData, setFormData] = useState({
    Service: "",
  
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    e.preventDefault();
    try {

       await fetch("/api/v1/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      //   const newTicket = await res.json();
      //   setTickets((prevTickets) => [...prevTickets, newTicket]);
      //   setFormData({
      //     name: "",
      //     email: "",
      //     contactNumber: "",
      //     helpTopic: "",
      //     product: "",
      //     domainName: "",
      //     subject: "",
      //     message: "",
      //   });

    } catch (error: unknown) {
      console.error("Validation Error:", error);
      //   if (error instanceof ZodError) {
      //     const fieldErrors: Record<string, string> = {};
      //     error.errors.forEach((err) => {
      //       fieldErrors[err.path[0]] = err.message;
      //     });
      //     setErrors(fieldErrors);
      //   } else {
      //     console.error("Unexpected error:", error);
      //   }
    }
    // Add logic to send formData to your backend (e.g., via API)
  };

  return (
    <div>
      <div className={styles.Container}>
        <h1 className={styles.heading}>Add/Edit Services</h1>
        <form className={styles.Form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="Service">Sevice Name</label>
            <input
              type="text"
              id="Service"
              name="Service"
              value={formData.Service}
              onChange={handleInputChange}
              required
            />
          </div>
         
          <button type="submit" className={styles.submitButton}>
            Add New Service
          </button>
        </form>


      </div>
      <div>
        Table showing List of Services Below....
      </div>
    </div>
  );
};

export default Page;
