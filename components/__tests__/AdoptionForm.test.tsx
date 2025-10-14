import { render, screen, fireEvent } from '@testing-library/react';
import { AdoptionForm } from '../AdoptionForm';
import '@testing-library/jest-dom';
import React from 'react';

describe('AdoptionForm', () => {
  it('should display a thank you message after submitting the form', () => {
    const petName = 'Fido';
    render(<AdoptionForm petName={petName} />);

    const nameInput = screen.getByPlaceholderText('Your Full Name');
    const emailInput = screen.getByPlaceholderText('Your Email Address');
    const submitButton = screen.getByText(`Express Interest in ${petName}`);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('Thank you!')).toBeInTheDocument();
    expect(screen.getByText(`Your adoption interest for ${petName} has been received. We will contact you shortly!`)).toBeInTheDocument();
  });
});