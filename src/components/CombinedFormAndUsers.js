import React, { useState, useEffect } from "react";
import axios from "axios";
import "../style/combined.css"; // Import combined styles

const SellForm = ({ onFormSubmit }) => {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFormData = {
      companyName,
      gstNumber,
      address,
      country,
      state,
      city,
      pincode,
      phone,
      secondPhone,
      email,
      date,
    };

    onFormSubmit(newFormData);
    axios
      .post("http://localhost:3001/sell", newFormData)
      .then((result) => {
        console.log("Form submitted successfully:", result.data);
      })
      .catch((err) => console.error("Error submitting form:", err));
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Sell Form</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        <input type="text" placeholder="GST Number" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} required />
        <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
        <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
        <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
        <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
        <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <input type="text" placeholder="Second Phone" value={secondPhone} onChange={(e) => setSecondPhone(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit" className="btn-submit">Submit</button>
      </form>
    </div>
  );
};

const ManageUsers = ({ users, onUpdateUser, onDeleteUser }) => {
  return (
    <div className="manage-users-container">
      <h2 className="section-title">Manage Users</h2>
      <div className="user-list">
        {users.map(user => (
          <div className="user-card" key={user._id}>
            <div className="user-info">
              <p><strong>Company Name:</strong> {user.companyName}</p>
              <p><strong>GST Number:</strong> {user.gstNumber}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Second Phone:</strong> {user.secondPhone}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Purchase Date:</strong> {user.date}</p>
            </div>
            <div className="user-actions">
              <button onClick={() => onUpdateUser(user._id)} className="btn-update">Update</button>
              <button onClick={() => onDeleteUser(user._id)} className="btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CombinedFormAndUsers = () => {
  const [users, setUsers] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/getUsers")
      .then(result => setUsers(result.data))
      .catch(err => console.log(err));
  }, [isUpdated]);

  const handleFormSubmit = (newFormData) => {
    setUsers([...users, newFormData]);
    setIsUpdated(!isUpdated);
  };

  const handleUpdateUser = (id) => {
    console.log(`Update user with ID: ${id}`);
  };

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:3001/deleteUser/${id}`)
      .then(() => setIsUpdated(!isUpdated))
      .catch(err => console.error("Error deleting user:", err));
  };

  return (
    <div className="combined-container">
      <div className="left-side">
        <SellForm onFormSubmit={handleFormSubmit} />
      </div>
      <div className="right-side">
        <ManageUsers users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
      </div>
    </div>
  );
};

export default CombinedFormAndUsers;
