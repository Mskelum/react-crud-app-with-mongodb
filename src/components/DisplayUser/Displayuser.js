import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import './Displayuser.css'

const Home = () => {

  const [users, setUsers] = useState([]);
  const [searchquery, setSearchquery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();

  const URL = 'http://localhost:8000/users';

  const getData = async () => {
    return await axios.get(URL).then((res) => res.data);
  };

  useEffect(() => {
    getData().then((data) => setUsers(data.users));
  }, []);


  const ComponentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentRef.current,
    documentTitle: 'user report',
    onAfterPrint: () => alert('User Report downloaded')
  });

  const handleSearch = () => {
    getData().then((data) => {
      const filteredData = data.users.filter((user) => 
        Object.values(user).some((field) => 
          field.toString().toLowerCase().includes(searchquery.toLowerCase())
        )
      );
      setUsers(filteredData);
      setNoResults(filteredData.length === 0);
    });
  };

  const handleSentReport = () => {
    const phoneNumber = '94758125068'; // No need for '+'
    const message = 'selected user reports';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  
    window.open(whatsappUrl, '_blank');
  }
  


  return (
    <div>
      
      <h1>User Data</h1>

      <div>
        <input 
          onChange={(e) => setSearchquery(e.target.value)}
          type='text' 
          name='search' 
          placeholder='search' 
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <button
        onClick={() => navigate('/adduser')}
        className="adduser-button"
      >
        Add User
      </button>

      {/* <button
        onClick={() => navigate('/imgart')}
        className="adduser-button"
      >
        Image upload
      </button> */}

      {noResults ? (
        <div>
          No user found
        </div>
      ) : (

      <div ref={ComponentRef}>
        {users.length > 0 ? (
          users.map((user, index) => (
            <div key={index} className="user-card">
              <h2>{user.name}</h2>
              <h2>{user._id}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Address:</strong> {user.address}</p>
              <Link to={`/update/${user._id}`} className="delete-button">Update</Link>
              <Link to={`/delete/${user._id}`} className="delete-button">Delete</Link>
            </div>
          ))
        ) : (
          <p>No users found</p>
        )}
      </div>
              
      )}

      <div>
        <button onClick={handlePrint}>Download</button>
        <button onClick={handleSentReport}>Send</button>
      </div>

    </div>
  );
};

export default Home;
