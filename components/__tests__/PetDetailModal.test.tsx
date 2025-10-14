import { render, screen, fireEvent } from '@testing-library/react';
import { PetDetailModal } from '../PetDetailModal';
import { Pet } from '../../types';
import '@testing-library/jest-dom';
import React from 'react';

const mockPet: Pet = {
  id: 1,
  name: 'Fido',
  breed: 'Golden Retriever',
  age: '2 years',
  size: 'Large',
  location: 'Buenos Aires',
  imageUrl: 'https://example.com/fido.jpg',
  story: 'A friendly and playful dog.',
  type: 'dog'
};

describe('PetDetailModal', () => {
  it('should display the pet\'s information', () => {
    render(<PetDetailModal pet={mockPet} onClose={() => {}} isStoryLoading={false} />);

    expect(screen.getByText(mockPet.name)).toBeInTheDocument();
    expect(screen.getByText(mockPet.breed)).toBeInTheDocument();
    expect(screen.getByText(mockPet.age)).toBeInTheDocument();
    expect(screen.getByText(mockPet.size)).toBeInTheDocument();
    expect(screen.getByText(mockPet.location)).toBeInTheDocument();
    expect(screen.getByText(mockPet.story as string)).toBeInTheDocument();
  });

  it('should call the onClose function when the close button is clicked', () => {
    const onClose = vi.fn();
    render(<PetDetailModal pet={mockPet} onClose={onClose} isStoryLoading={false} />);

    const closeButton = screen.getByLabelText('Close');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});