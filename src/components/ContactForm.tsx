import "../styles/ContactForm.css";

import React, { useState } from 'react';


interface FormState {
  name: string;
  email: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name) newErrors.name = 'Name is required.';
    if (!formState.email || !/\S+@\S+\.\S+/.test(formState.email)) newErrors.email = 'Valid email is required.';
    if (!formState.message || formState.message.length < 10) newErrors.message = 'Message must be at least 10 characters long.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate form submission
      console.log('Form submitted:', formState);
      setSubmitted(true);
      setFormState({ name: '', email: '', message: '' }); // Clear form
      setErrors({});
    }
  };

  return (
    <div className="contact-section"> 
      <form onSubmit={handleSubmit} className="p-4 border rounded bg-secondary "> 
        <h2 className="mb-4">Contact Me</h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formState.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>} 
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            className={`form-control btn-block ${errors.email ? 'is-invalid' : ''}`}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formState.message}
            onChange={handleChange}
            className={`form-control ${errors.message ? 'is-invalid' : ''}`}
          />
          {errors.message && <div className="invalid-feedback">{errors.message}</div>}
        </div>
        {submitted && <div className="alert alert-success">Thank you for your message and have a great day!</div>}
        <button type="submit" className="btn btn-primary btn-lg">Send</button>
      </form>
    </div>
  );
};

export default ContactForm;
