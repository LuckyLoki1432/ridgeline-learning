import { describe, expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';

describe('Ridgeline Learning landing page', () => {
  it('renders all required page sections and landmarks', () => {
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /build skills/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /clearer path/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /choose the next step/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /start with a conversation/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /frequently asked questions/i })).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('opens the mobile menu and closes it with Escape while restoring focus', async () => {
    const user = userEvent.setup();
    render(<App />);
    const menuButton = screen.getByRole('button', { name: /open menu/i });
    await user.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    await user.keyboard('{Escape}');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveFocus();
  });

  it('focuses the first invalid field and exposes field-level errors', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByText(/enter a name between 2 and 80 characters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toHaveFocus();
    expect(screen.getByLabelText(/full name/i)).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows local-only confirmation for valid input', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(screen.getByLabelText(/full name/i), 'Alex Learner');
    await user.type(screen.getByLabelText(/email address/i), 'alex@example.com');
    await user.selectOptions(screen.getByLabelText(/program interest/i), 'Foundations of Digital Work');
    await user.click(screen.getByLabelText(/agree to be contacted/i));
    await user.click(screen.getByRole('button', { name: /send enquiry/i }));
    expect(await screen.findByRole('status')).toHaveTextContent(/no message has been sent/i);
    expect(screen.getByLabelText(/full name/i)).toHaveValue('');
  });
});
