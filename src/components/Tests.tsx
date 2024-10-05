import { TestCase } from './types';

export const testCases: TestCase[] = [
  {
    name: 'Check if navbar is rendered',
    test: () => {
      const navbar = document.querySelector('nav');
      navbar?.scrollIntoView({ behavior: 'smooth' });
      return !!navbar;
    },
  },
  {
    name: 'Validate contact form existence',
    test: () => {
      const form = document.querySelector('form');
      form?.scrollIntoView({ behavior: 'smooth' });
      if (!form) return false;
      const emailInput = form.querySelector('input[type="email"]');
      return emailInput !== null;
    },
  },
  {
    name: 'Submit contact form successfully',
    test: async () => {
      const form = document.querySelector('form');
      form?.scrollIntoView({ behavior: 'smooth' });
      if (!form) return false;

      const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (!nameInput || !emailInput || !messageInput || !submitButton) return false;

      // Simulate typing into the form in real time
      await typeIntoInput(nameInput, 'Test Robert');
      await typeIntoInput(emailInput, 'dretest.robert@gmail.com');
      await typeIntoInput(messageInput, 'Hey! Im sending you a test message..');

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
      form?.scrollIntoView({ behavior: 'smooth' });
      if (!form) return false;

      const nameInput = form.querySelector('input[name="name"]') as HTMLInputElement;
      const emailInput = form.querySelector('input[name="email"]') as HTMLInputElement;
      const messageInput = form.querySelector('textarea[name="message"]') as HTMLTextAreaElement;
      const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement;

      if (!nameInput || !emailInput || !messageInput || !submitButton) return false;

      // Simulate typing invalid data
      await typeIntoInput(nameInput, 'a');
      await typeIntoInput(emailInput, 'invalid-email');
      await typeIntoInput(messageInput, 'Short');

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
    test: async () => {
      const navLinks = document.querySelectorAll('nav a');
      
      // Check if there are any navigation links
      if (navLinks.length === 0) return false;
  
      // Simulate clicking each navigation link
      for (const link of Array.from(navLinks)) {
        (link as HTMLAnchorElement).click();
        await new Promise(resolve => setTimeout(resolve, 1000)); // Add a small delay between clicks for visual effect or waiting for navigation to finish
      }
  
      return true;
    },
  }
];
// Simulates typing into an input field with a delay to mimic real-time typing
const typeIntoInput = (input: HTMLInputElement | HTMLTextAreaElement, text: string): Promise<void> => {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        input.value += text.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, 100); // 100ms typing delay
  });
};
