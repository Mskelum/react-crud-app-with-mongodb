import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './Deleteuser.css'; // Import the CSS file

const DeleteUser = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/users/${id}`);
      console.log('User deleted');
      navigate('/');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="delete-user-container">
      <h1>Delete User</h1>
      <p>Are you sure you want to delete the following user?</p>
      <div className="user-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Address:</strong> {user.address}</p>
      </div>
      <button onClick={handleDelete} className="delete-button">Delete User</button>
      <button onClick={() => navigate('/')} className="cancel-button">Cancel</button>
    </div>
  );
};

export default DeleteUser;
