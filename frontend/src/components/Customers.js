import React, { useState, useEffect } from "react";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [search, setSearch] = useState("");

  // load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("customers")) || [];
    setCustomers(saved);
  }, []);

  // save to localStorage
  useEffect(() => {
    localStorage.setItem("customers", JSON.stringify(customers));
  }, [customers]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddCustomer = () => {
    if (!form.name || !form.phone || !form.email) {
      alert("Please fill required fields!");
      return;
    }
    setCustomers([...customers, { ...form, id: Date.now() }]);
    setForm({ name: "", phone: "", email: "", address: "" });
  };

  const handleDelete = (id) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  const filtered = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search)
  );

  return (
    <div className="page">
      <h2>Customer Management</h2>

      {/* Add Customer Form */}
      <div className="card form-card">
        <div className="form-grid">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Customer Name"
          />
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
          />
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Customer Address"
          />
        </div>
        <button className="btn primary" onClick={handleAddCustomer}>
          Add Customer
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        className="search-box"
        placeholder="Search by name or phone..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length > 0 ? (
            filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
