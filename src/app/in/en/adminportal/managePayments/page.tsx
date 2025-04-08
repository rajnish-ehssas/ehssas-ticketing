"use client";
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import Link from "next/link";
import styles from "./managePayments.module.css";

const ManagePayments: React.FC = () => {
    const [invoiceNumber, setInvoiceNumber] = useState<string>("");
    const [invoiceDate, setInvoiceDate] = useState<string>("");
    const [paymentStatus, setPaymentStatus] = useState<string>("Pending");
    const [subtotal, setSubtotal] = useState<number>(0);
    const [pdfBlobUrl, setPdfBlobUrl] = useState<string | null>(null);

    useEffect(() => {
        const doc = new jsPDF();
        doc.text(`Invoice Number: ${invoiceNumber}`, 10, 10);
        doc.text(`Invoice Date: ${invoiceDate}`, 10, 20);
        doc.text(`Payment Status: ${paymentStatus}`, 10, 30);
        doc.text(`Subtotal: $${subtotal}`, 10, 40);

        const blob = doc.output("blob");
        setPdfBlobUrl(URL.createObjectURL(blob));
    }, [invoiceNumber, invoiceDate, paymentStatus, subtotal]);

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Bill Raise System</h1>
            <div className={styles.fieldContainer}>
                <label>
                    Invoice Number:
                    <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.fieldContainer}>
                <label>
                    Invoice Date:
                    <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.fieldContainer}>
                <label>
                    Payment Status:
                    <select
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        className={styles.select}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                    </select>
                </label>
            </div>

            <div className={styles.fieldContainer}>
                <label>
                    Subtotal:
                    <input
                        type="number"
                        value={subtotal}
                        onChange={(e) => setSubtotal(parseFloat(e.target.value))}
                        className={styles.input}
                    />
                </label>
            </div>

            <div className={styles.buttonContainer}>
                {pdfBlobUrl && (
                    <Link href={pdfBlobUrl} download={`invoice_${invoiceNumber}.pdf`}>
                        <button className={styles.button}>Download PDF</button>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ManagePayments;

