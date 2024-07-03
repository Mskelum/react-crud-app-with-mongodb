import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Updateuser.css'; // Reuse the CSS file

const UpdateUser = () => {
  const [updateUser, setUpdateUser] = useState({
    name: '',
    email: '',
    age: '',
    address: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        setUpdateUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [id]);

  const handleChange = (e) => {
    setUpdateUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/users/${id}`, updateUser);
      console.log('User updated:', updateUser);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <div className="add-user-container">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className="add-user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={updateUser.name}
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
            value={updateUser.email}
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
            value={updateUser.age}
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
            value={updateUser.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Update User</button>
      </form>
    </div>
  );
};

export default UpdateUser;
