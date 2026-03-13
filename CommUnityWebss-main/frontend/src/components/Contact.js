import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="section light fade-element">
      <h2>Contact Us</h2>

      <div className="contact-container">

        <div className="contact-image">
          <img src={`${process.env.PUBLIC_URL}/images/contactus.png`} alt="Contact Us" />
        </div>

        <div className="contact-form">
          <form>
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" placeholder="Enter your full name" required />

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter your email" required />

            <label htmlFor="subject">Subject</label>
            <input type="text" id="subject" name="subject" placeholder="Enter subject" required />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="5" placeholder="Write your message here..." required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default Contact;
