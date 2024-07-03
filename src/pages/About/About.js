import React from 'react';
import './About.css';
import Navbar from '../../components/Navbar/Navbar';

const About = () => {
  return (
    <div>
      <Navbar />
    <div className="about-container">
      <p className="about-text">
        I am a mobile app developer with extensive experience in React Native and Flutter. 
        My expertise spans frontend development, encompassing HTML, CSS, JavaScript and ReactJS. 
        Furthermore, I have a solid background in backend development, 
        having worked with SQL, Firebase, and MongoDB. My passion lies in crafting 
        contemporary, user-friendly applications, and I stay abreast of the latest 
        trends in mobile app development and UI/UX design. I am eager to collaborate 
        with you and contribute to the success of your project.
      </p>
    </div>
    </div>
  )
}

export default About;
