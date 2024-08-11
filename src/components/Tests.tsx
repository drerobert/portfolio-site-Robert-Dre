// tests.tsx
import { TestCase } from './types';

export const testCases: TestCase[] = [
  {
    name: 'Check if header is rendered',
    test: () => {
      const header = document.querySelector('header');
      return !!header;
    },
  },
  {
    name: 'Validate contact form existence',
    test: () => {
      const form = document.querySelector('form');
      if (!form) return false;
      const emailInput = form.querySelector('input[type="email"]');
      return emailInput !== null;
    },
  },
  {
    name: 'Submit contact form successfully',
    test: async () => {
      const form = document.querySelector('form');
      if (!form) return false;

      const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (!nameInput || !emailInput || !messageInput || !submitButton) return false;

      // Simulate filling out the form
      nameInput.value = 'John Doe';
      emailInput.value = 'john.doe@example.com';
      messageInput.value = 'This is a test message.';

      // Simulate form submission
      const formSubmitEvent = new Event('submit', { bubbles: true });
      form.dispatchEvent(formSubmitEvent);

      // Check if form is cleared after submission
      return nameInput.value === '' && emailInput.value === '' && messageInput.value === '';
    },
  },
  {
    name: 'Contact form validation errors',
    test: async () => {
      const form = document.querySelector('form');
      if (!form) return false;

      const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (!nameInput || !emailInput || !messageInput || !submitButton) return false;

      // Simulate filling out the form with invalid data
      nameInput.value = '';
      emailInput.value = 'invalid-email';
      messageInput.value = 'Short';

      // Simulate form submission
      const formSubmitEvent = new Event('submit', { bubbles: true });
      form.dispatchEvent(formSubmitEvent);

      // Check if error messages are displayed
      const errorMessages = document.querySelectorAll('.error-message');
      return errorMessages.length > 0;
    },
  },
  {
    name: 'Check navigation links',
    test: () => {
      const navLinks = document.querySelectorAll('nav a');
      return navLinks.length > 0;
    },
  },
  {
    name: 'Simulate a scroll event',
    test: () => {
      window.scrollTo(0, document.body.scrollHeight);
      return window.scrollY > 0;
    },
  },
];