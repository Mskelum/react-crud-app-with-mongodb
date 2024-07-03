import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import About from './pages/About/About';
import Navbar from './components/Navbar/Navbar';
import Adduser from './components/AddUser/Adduser';
import Updateuser from './components/UpdateUser/Updateuser';
import DeleteUser from './components/DeleteUser/Deleteuser';
import ImageUploader from './components/Image/ImageUploader';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/update/:id" element={<Updateuser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
