'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import RButton from "@/childComponent/RButton";

interface BillingHistory {
  date: string;
  amount: number;
  status: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  lastFourDigits: string;
}

interface Plan {
  name: string;
  price: string;
  renewalDate: string;
}

const Billing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<Plan>({
    name: 'Starter',
    price: '$19.99',
    renewalDate: '2024-12-01',
  });
  // const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
  //   { id: '1', name: 'Visa', lastFourDigits: '1234' },
  //   { id: '2', name: 'MasterCard', lastFourDigits: '5678' },
  // ]);
  const paymentMethods: PaymentMethod[] = [
    { id: '1', name: 'Visa', lastFourDigits: '1234' },
    { id: '2', name: 'MasterCard', lastFourDigits: '5678' },
  ]
  // const [billingHistory, setBillingHistory] = useState<BillingHistory[]>([
  //   { date: '2024-11-01', amount: 19.99, status: 'Paid' },
  //   { date: '2024-10-01', amount: 19.99, status: 'Paid' },
  // ]);
  const billingHistory: BillingHistory[] = [
    { date: '2024-11-01', amount: 19.99, status: 'Paid' },
    { date: '2024-10-01', amount: 19.99, status: 'Paid' },
  ]
  const handleChangePlan = (plan: string) => {
    setSelectedPlan({
      name: plan,
      price: plan === 'Starter' ? '$19.99' : '$29.99',
      renewalDate: '2025-01-01',
    });
  };

  const handleCancelPlan = () => {
    alert('Your plan has been canceled.');
  };

  const handleAddPaymentMethod = () => {
    alert('Add payment method');
  };

  return (
    <div className={styles.billingSection}>
      <div className={styles.planDetails}>
        <h3>Current Plan: {selectedPlan.name}</h3>
        <p>Price: {selectedPlan.price}</p>
        <p>Renewal Date: {selectedPlan.renewalDate}</p>
        <RButton
          type="submit"
          buttonText='Cancel Plan'
          onClick={handleCancelPlan}
        />

        <div className={styles.changePlan}>
          <label>Change Plan </label>
          <select onChange={(e) => handleChangePlan(e.target.value)}>
            <option value="none">--Select--</option>
            <option value="Starter">Starter</option>
            <option value="Pro">Pro</option>
            <option value="Enterprise">Enterprise</option>
          </select>
        </div>
      </div>
      <div className={styles.paymentMethods}>
        <h3>Payment Method</h3>
        <select>
          {paymentMethods?.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name} (**** **** **** {method.lastFourDigits})
            </option>
          ))}
        </select>

        <RButton
          type="submit"
          buttonText='Add Payment'
          onClick={handleAddPaymentMethod}
          className={styles.paymentButton}
        />
      </div>
      <div className={styles.billingHistory}>
        <div className={styles.billingText}>
          <h3>Billing History</h3>
        </div>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.amount}</td>
                  <td>{item.status}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Billing;
