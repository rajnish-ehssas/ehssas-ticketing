"use client";
import { useState } from 'react';
import styles from './managePayments.module.css';

interface Invoice {
    invoiceNumber: string;
    invoiceId: string;
    billingReference: string;
    invoiceAmount: number;
    invoiceDate: string;
    invoiceStatus: 'Pending' | 'Paid' | 'Overdue' | 'Cancelled';
    billingCode: string;
    paymentInvoice: boolean;
}

const ManagePayments = () => {
    const [invoice, setInvoice] = useState<Invoice>({
        invoiceNumber: '',
        invoiceId: '',
        billingReference: '',
        invoiceAmount: 0,
        invoiceDate: '',
        invoiceStatus: 'Pending',
        billingCode: '',
        paymentInvoice: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInvoice((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/invoices', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(invoice),
        });
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>

            <input
                type="text"
                name="invoiceNumber"
                value={invoice.invoiceNumber}
                onChange={handleChange}
                placeholder="Invoice Number"
                className={styles.inputField}
            />
            <input
                type="text"
                name="invoiceId"
                value={invoice.invoiceId}
                onChange={handleChange}
                placeholder="Invoice ID"
                className={styles.inputField}
            />

            <input
                type="text"
                name="billingReference"
                value={invoice.billingReference}
                onChange={handleChange}
                placeholder="Billing Reference"
                className={styles.inputField}
            />
            <input
                type="number"
                name="invoiceAmount"
                value={invoice.invoiceAmount}
                onChange={handleChange}
                placeholder="Invoice Amount"
                className={styles.inputField}
            />
            <input
                type="text"
                name="invoiceDate"
                value={invoice.invoiceDate}
                onChange={handleChange}
                placeholder="Invoice Date"
                className={styles.inputField}
            />
            <input
                type="text"
                name="invoiceStatus"
                value={invoice.invoiceStatus}
                onChange={handleChange}
                placeholder="Invoice Status"
                className={styles.inputField}
            />
            <input
                type="text"
                name="billingCode"
                value={invoice.billingCode}
                onChange={handleChange}
                placeholder="Billing Code"
                className={styles.inputField}
            />
            <div className={styles.checkboxContainer}>
                <input
                    type="checkbox"
                    name="paymentInvoice"
                    checked={invoice.paymentInvoice}
                    onChange={(e) =>
                        setInvoice({ ...invoice, paymentInvoice: e.target.checked })
                    }
                />
                <span>Payment Invoice</span>
            </div>
            <button type="submit" className={styles.button}>
                Raised bill
            </button>
        </form>
    );
};

export default ManagePayments;

