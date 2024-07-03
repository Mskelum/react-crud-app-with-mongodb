import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import Navbar from '../../components/Navbar/Navbar';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_68clym8', 'template_bvw35u6', form.current, 'XyS6IgpZ53S8uzOYu')
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          alert('SUCCESS!');
        },
        (error) => {
          console.error('FAILED...', error);
          alert('FAILED...',error);
        }
      );
  };

  return (
    <div>
      <Navbar />
    <div className="login-container">
      <h1>Contact us</h1>
      <form ref={form} onSubmit={sendEmail} className="login-form">
        <div className="form-group">
          <label htmlFor="user_name">Name:</label>
          <input type="text" id="user_name" name="user_name" required />
        </div>
        <div className="form-group">
          <label htmlFor="user_email">Email:</label>
          <input type="email" id="user_email" name="user_email" required />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea id="message" name="message" required />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>
    </div>
  );
};

export default Contact;
