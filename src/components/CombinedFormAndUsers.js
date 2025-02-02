import React, { useState } from "react";
import axios from "axios";
import "../style/combined.css";
import placeholderImage from '../image/image.jpg';

const SellForm = ({ onFormSubmit }) => {
  const [companyName, setCompanyName] = useState("");
  const [gstNumber, setGstNumber] = useState("");
  const [gstValid, setGstValid] = useState(null); // Null means not checked yet
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phone, setPhone] = useState("");
  const [secondPhone, setSecondPhone] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [userType, setUserType] = useState("user");

  const handleGstChange = async (e) => {
    const gst = e.target.value;
    setGstNumber(gst);

    // Only verify if GST number length is 15 characters
    if (gst.length === 15) {
      try {
        const response = await axios.get(`https://api.example.com/verify-gst?gst=${gst}`); // Replace with actual GST verification API
        if (response.data.valid) {
          setGstValid(true);
        } else {
          setGstValid(false);
        }
      } catch (error) {
        setGstValid(false);
        console.error("Error verifying GST:", error);
      }
    } else {
      setGstValid(null); // Reset validation if GST number is incomplete
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gstValid === false) {
      alert("Invalid GST Number. Please check and enter a valid one.");
      return;
    }

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
      userType,
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
      <div className="left-section">
        <h2 className="form-title">Company Form</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Company Name *</label>
            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
          </div>

          <div className="input-group">
            <label>GST Number *</label>
            <input
              type="text"
              placeholder="GST Number"
              value={gstNumber}
              onChange={handleGstChange}
              maxLength={15}
              required
            />
            {gstValid === true && <p className="gst-success">✅ GST Verified</p>}
            {gstValid === false && <p className="gst-error">❌ Invalid GST Number</p>}
          </div>

          <div className="input-group">
            <label>Address *</label>
            <input type="text" placeholder="Street Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
          </div>

          <div className="row">
            <div className="input-group">
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <input type="text" placeholder="Zip Code" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            </div>
          </div>

          <div className="row">
            <div className="input-group">
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="input-group">
              <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label>Second Phone (Optional)</label>
            <input type="text" placeholder="Second Phone" value={secondPhone} onChange={(e) => setSecondPhone(e.target.value)} />
          </div>

          <div className="input-group">
            <label>Date *</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>

          <button type="submit" className="btn-submit">Submit</button>
        </form>
      </div>

      <div className="right-section">
        <div className="image-placeholder" style={{width:"60%" , padding:"14% 10% 20% 10%"}}>
          <img src={placeholderImage} alt="Placeholder" className="placeholder-img" />
        </div>
      </div>
    </div>
  );
};

export default SellForm;




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../style/combined.css"; // Import combined styles

// const SellForm = ({ onFormSubmit }) => {
//   const [companyName, setCompanyName] = useState("");
//   const [gstNumber, setGstNumber] = useState("");
//   const [address, setAddress] = useState("");
//   const [country, setCountry] = useState("");
//   const [state, setState] = useState("");
//   const [city, setCity] = useState("");
//   const [pincode, setPincode] = useState("");
//   const [phone, setPhone] = useState("");
//   const [secondPhone, setSecondPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [date, setDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newFormData = {
//       companyName,
//       gstNumber,
//       address,
//       country,
//       state,
//       city,
//       pincode,
//       phone,
//       secondPhone,
//       email,
//       date,
//     };

//     onFormSubmit(newFormData);
//     axios
//       .post("http://localhost:3001/sell", newFormData)
//       .then((result) => {
//         console.log("Form submitted successfully:", result.data);
//       })
//       .catch((err) => console.error("Error submitting form:", err));
//   };

//   return (
//     <div className="form-container">
//       <h2 className="form-title">Sell Form</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
//         <input type="text" placeholder="GST Number" value={gstNumber} onChange={(e) => setGstNumber(e.target.value)} required />
//         <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
//         <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
//         <input type="text" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
//         <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
//         <input type="text" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
//         <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
//         <input type="text" placeholder="Second Phone" value={secondPhone} onChange={(e) => setSecondPhone(e.target.value)} required />
//         <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
//         <button type="submit" className="btn-submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// const ManageUsers = ({ users, onUpdateUser, onDeleteUser }) => {
//   return (
//     <div className="manage-users-container">
//       <h2 className="section-title">Manage Users</h2>
//       <div className="user-list">
//         {users.map(user => (
//           <div className="user-card" key={user._id}>
//             <div className="user-info">
//               <p><strong>Company Name:</strong> {user.companyName}</p>
//               <p><strong>GST Number:</strong> {user.gstNumber}</p>
//               <p><strong>Address:</strong> {user.address}</p>
//               <p><strong>Phone:</strong> {user.phone}</p>
//               <p><strong>Second Phone:</strong> {user.secondPhone}</p>
//               <p><strong>Email:</strong> {user.email}</p>
//               <p><strong>Purchase Date:</strong> {user.date}</p>
//             </div>
//             <div className="user-actions">
//               <button onClick={() => onUpdateUser(user._id)} className="btn-update">Update</button>
//               <button onClick={() => onDeleteUser(user._id)} className="btn-delete">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CombinedFormAndUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [isUpdated, setIsUpdated] = useState(false);

//   useEffect(() => {
//     axios.get("http://localhost:3001/getUsers")
//       .then(result => setUsers(result.data))
//       .catch(err => console.log(err));
//   }, [isUpdated]);

//   const handleFormSubmit = (newFormData) => {
//     setUsers([...users, newFormData]);
//     setIsUpdated(!isUpdated);
//   };

//   const handleUpdateUser = (id) => {
//     console.log(`Update user with ID: ${id}`);
//   };

//   const handleDeleteUser = (id) => {
//     axios.delete(`http://localhost:3001/deleteUser/${id}`)
//       .then(() => setIsUpdated(!isUpdated))
//       .catch(err => console.error("Error deleting user:", err));
//   };

//   return (
//     <div className="combined-container">
//       <div className="left-side">
//         <SellForm onFormSubmit={handleFormSubmit} />
//       </div>
//       <div className="right-side">
//         <ManageUsers users={users} onUpdateUser={handleUpdateUser} onDeleteUser={handleDeleteUser} />
//       </div>
//     </div>
//   );
// };

// export default CombinedFormAndUsers;
