import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Adduser.css';

const Adduser = () => {

  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const [addUser, setAddUser] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });

  const handleChange = (e) => {
    setAddUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/users', addUser);
      console.log('User added:', response.data);
      setSuccessMessage('User added successfully!');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Navigate after 2 seconds
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="add-user-container">
      <h1>Add User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={addUser.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={addUser.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={addUser.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={addUser.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Add User</button>
      </form>
    </div>
  );
};

export default Adduser;
