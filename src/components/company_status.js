import React, { useState } from "react";
import "../../src/style/companystatus.css";

const companyData = [
  {
    companyName: "JaiswalSon private limited",
    gstNumber: "27ABCDE1234F1Z5",
    address: "Coimbatore, Tamil Nadu",
    phone: "8960106544",
    secondPhone: "9597458562",
    email: "jaissrajat123@gmail.com",
    date: "2025-02-01",
  },
  {
    companyName: "TechSolutions Ltd.",
    gstNumber: "29XYZAB1234F1Z6",
    address: "Bangalore, Karnataka",
    phone: "9876543210",
    secondPhone: "8123456789",
    email: "contact@techsolutions.com",
    date: "2025-02-02",
  },
  {
    companyName: "Global Enterprises",
    gstNumber: "27PQRST5678D1Z8",
    address: "Mumbai, Maharashtra",
    phone: "9223344556",
    secondPhone: "8326789012",
    email: "info@globalenterprises.com",
    date: "2025-02-03",
  },
  {
    companyName: "EcoTech Industries",
    gstNumber: "33JKLPU4567H1Z9",
    address: "Chennai, Tamil Nadu",
    phone: "8887776666",
    secondPhone: "9998887777",
    email: "support@ecotechind.com",
    date: "2025-02-04",
  },
  {
    companyName: "Bright Horizons Corp.",
    gstNumber: "19LMNOP1234G1Z0",
    address: "Hyderabad, Telangana",
    phone: "7418529630",
    secondPhone: "9632587410",
    email: "contact@brighthorizons.com",
    date: "2025-02-05",
  },
  {
    companyName: "Future Innovations Pvt. Ltd.",
    gstNumber: "18QWERT1234H1Z1",
    address: "Pune, Maharashtra",
    phone: "5522334455",
    secondPhone: "6677889900",
    email: "support@futureinnovations.com",
    date: "2025-02-06",
  },
];

const CompanyStatus = () => {
  const [companyNameFilter, setCompanyNameFilter] = useState("");
  const [gstNumberFilter, setGstNumberFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");

  const [users, setUsers] = useState(companyData); // Storing company data

  const handleUpdateUser = (id) => {
    console.log(`Update company data for ID: ${id}`);
    // Implement the actual update logic here (e.g., open a form to edit)
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((entry) => entry.companyName !== id)); // Filter out deleted user
    console.log(`Deleted company data for ID: ${id}`);
  };

  const filteredData = users.filter((entry) => {
    return (
      (companyNameFilter === "" || entry.companyName.toLowerCase().includes(companyNameFilter.toLowerCase())) &&
      (gstNumberFilter === "" || entry.gstNumber.toLowerCase().includes(gstNumberFilter.toLowerCase())) &&
      (phoneFilter === "" || entry.phone.includes(phoneFilter)) &&
      (emailFilter === "" || entry.email.toLowerCase().includes(emailFilter.toLowerCase()))
    );
  });

  return (
    <div>
      <div className="table-container">
        <h2 className="table-title">Company Status</h2>
        
        <div className="filter-container">
          <label htmlFor="company-name-filter" className="filterheader">
            Company Name:
          </label>
          <input
            type="text"
            id="company-name-filter"
            value={companyNameFilter}
            onChange={(e) => setCompanyNameFilter(e.target.value)}
            className="filterstatus"
          />
          
          <label htmlFor="gst-number-filter" className="filterheader">
            GST Number:
          </label>
          <input
            type="text"
            id="gst-number-filter"
            value={gstNumberFilter}
            onChange={(e) => setGstNumberFilter(e.target.value)}
            className="filterstatus"
          />
          
          <label htmlFor="phone-filter" className="filterheader">
            Phone:
          </label>
          <input
            type="text"
            id="phone-filter"
            value={phoneFilter}
            onChange={(e) => setPhoneFilter(e.target.value)}
            className="filterstatus"
          />
          
          <label htmlFor="email-filter" className="filterheader">
            Email:
          </label>
          <input
            type="text"
            id="email-filter"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            className="filterstatus"
          />
        </div>

        <div className="table-wrapper">
          <table className="scrap-table">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>GST Number</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Second Phone</th>
                <th>Email</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <td>{entry.companyName}</td>
                  <td>{entry.gstNumber}</td>
                  <td>{entry.address}</td>
                  <td>{entry.phone}</td>
                  <td>{entry.secondPhone}</td>
                  <td>{entry.email}</td>
                  <td>{entry.date}</td>
                  <td>
                    <button
                      onClick={() => handleUpdateUser(entry.companyName)}
                      className="btn-update"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteUser(entry.companyName)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyStatus;
