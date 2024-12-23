'use client';
import { useEffect, useState } from "react";
import { IClient } from "@/mongodb/schemas/ClientSchema";
import styles from "./Clientlist.module.css";

const ClientList = () => {
    const [clients, setClients] = useState<IClient[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    // const [activeTab, setActiveTab] = useState<"Wap" | "SaaS">("Wap");
    const activeTab: string = "Wap"
    const [sortConfig, setSortConfig] = useState<{ key: keyof IClient | null, direction: 'asc' | 'desc' | null }>({
        key: null,
        direction: null,
    });

    useEffect(() => {
        const fetchClients = async () => {
            try {
                setLoading(true);
                setError(null);
                const sort = `type=${activeTab}`
                const ascOrder = `type=${activeTab}`
                const descOrder = `type=${activeTab}`
                const query = `${sort}&${ascOrder}&${descOrder}`;
                const res = await fetch(`/api/v1/client?${query}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch clients");
                }
                const data: IClient[] = await res.json();
                setClients(data);
            } catch (error) {
                setError(typeof error === "string" ? error : "Error fetching clients");
            } finally {
                setLoading(false);
            }
        };
        fetchClients();
    }, [activeTab]);



    const handleSort = (key: keyof IClient) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });

        const sortedClients = [...clients].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setClients(sortedClients);
    };

    if (loading) {
        return <div className={styles.loading}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    // const handleTabClick = () => {
    //     console.log('working:', handleTabClick);
    // }
    return (
        <div className={styles.clientList}>
            <h1 className={styles.heading}>Clients List</h1>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "Wap" ? styles.active : ""}`}
                // onClick={() => handleTabClick("Wap")}
                >
                    Wap
                </button>
                <button
                // className={`${styles.tab} ${activeTab === "SaaS" ? styles.active : ""}`}
                // onClick={() => handleTabClick("SaaS")}
                >
                    SaaS
                </button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th onClick={() => handleSort("email")}>
                            Email {sortConfig.key === "email" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => handleSort("companyName")}>
                            Company Name {sortConfig.key === "companyName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th onClick={() => handleSort("serviceType")}>
                            Service Type {sortConfig.key === "serviceType" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                        <th>
                            Domain
                        </th>
                        <th onClick={() => handleSort("saasProductName")}>
                            SaaS Product {sortConfig.key === "saasProductName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {clients?.map((client, index) => (
                        <tr key={index}>
                            <td>{client.email}</td>
                            <td>{client.companyName}</td>
                            <td>{client.serviceType}</td>
                            <td>{client.domain || "N/A"}</td>
                            <td>{client.saasProductName || "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientList;
