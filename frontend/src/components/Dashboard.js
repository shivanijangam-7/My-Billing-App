import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard({ user }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
    setInvoices(storedInvoices);
  }, []);

  // stats
  const total = invoices.length;
  const paid = invoices.filter((i) => i.status === "Paid").length;
  const pending = invoices.filter((i) => i.status === "Pending").length;
  const partial = invoices.filter((i) => i.status === "Partial").length;
  const revenue = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, i) => sum + parseFloat(i.amount || 0), 0);

  // revenue by month
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const revenueByMonth = new Array(12).fill(0);
  invoices.forEach((inv) => {
    if (inv.status === "Paid") {
      const month = new Date(inv.date).getMonth();
      revenueByMonth[month] += parseFloat(inv.amount || 0);
    }
  });

  const lineData = {
    labels: months,
    datasets: [
      {
        label: "Revenue",
        data: revenueByMonth,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37,99,235,0.2)",
        fill: true,
        tension: 0.3,
      },
    ],
  };

  // invoice status chart
  const statusData = {
    labels: ["Paid", "Pending", "Partial"],
    datasets: [
      {
        data: [paid, pending, partial],
        backgroundColor: ["#22c55e", "#ef4444", "#eab308"],
      },
    ],
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.fullName}</h2>
      <p className="role-badge">Role: {user.role}</p>

      {/* ADMIN Dashboard */}
      {user.role === "ADMIN" && (
        <>
          <div className="stats-grid">
            <div className="stat-card">
              <h3>{total}</h3>
              <p>Total Invoices</p>
            </div>
            <div className="stat-card green">
              <h3>{paid}</h3>
              <p>Paid</p>
            </div>
            <div className="stat-card red">
              <h3>{pending}</h3>
              <p>Pending</p>
            </div>
            <div className="stat-card yellow">
              <h3>{partial}</h3>
              <p>Partial</p>
            </div>
            <div className="stat-card blue">
              <h3>₹{revenue.toFixed(2)}</h3>
              <p>Revenue Collected</p>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-box">
              <h3>Invoice Status</h3>
              <Doughnut data={statusData} />
            </div>
            <div className="chart-box">
              <h3>Revenue by Month</h3>
              <Line data={lineData} />
            </div>
          </div>
        </>
      )}

      {/* ACCOUNTANT Dashboard */}
      {user.role === "ACCOUNTANT" && (
        <>
          <div className="stats-grid">
            <div className="stat-card green">
              <h3>{paid}</h3>
              <p>Paid Invoices</p>
            </div>
            <div className="stat-card red">
              <h3>{pending}</h3>
              <p>Pending Invoices</p>
            </div>
            <div className="stat-card blue">
              <h3>₹{revenue.toFixed(2)}</h3>
              <p>Revenue Collected</p>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-box">
              <h3>Revenue by Month</h3>
              <Line data={lineData} />
            </div>
          </div>
        </>
      )}

      {/* CUSTOMER Dashboard */}
      {user.role === "CUSTOMER" && (
        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>{total}</h3>
            <p>Your Invoices</p>
          </div>
          <div className="stat-card green">
            <h3>{paid}</h3>
            <p>Paid</p>
          </div>
          <div className="stat-card red">
            <h3>{pending}</h3>
            <p>Pending</p>
          </div>
        </div>
      )}
    </div>
  );
}
