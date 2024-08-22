// ContactForm.tsx
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
    <form onSubmit={handleSubmit}>
      <h2>Contact Me</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          value={formState.message}
          onChange={handleChange}
        />
        {errors.message && <p className="error-message">{errors.message}</p>}
      </div>
      {submitted && <p>Thank you for your message and have a great day!</p>}
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
