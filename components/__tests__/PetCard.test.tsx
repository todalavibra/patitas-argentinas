import { render, screen, fireEvent } from '@testing-library/react';
import { PetCard } from '../PetCard';
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

describe('PetCard', () => {
  it('should display the pet\'s information', () => {
    render(<PetCard pet={mockPet} onSelectPet={() => {}} />);

    expect(screen.getByText(mockPet.name)).toBeInTheDocument();
    expect(screen.getByText(mockPet.breed)).toBeInTheDocument();
    expect(screen.getByText(mockPet.age)).toBeInTheDocument();
    expect(screen.getByText(mockPet.size)).toBeInTheDocument();
    expect(screen.getByText(`${mockPet.location}, Argentina`)).toBeInTheDocument();
  });

  it('should call the onSelectPet function when the card is clicked', () => {
    const onSelectPet = vi.fn();
    render(<PetCard pet={mockPet} onSelectPet={onSelectPet} />);

    const card = screen.getByText(mockPet.name).closest('div.group');
    if (card) {
      fireEvent.click(card);
    }

    expect(onSelectPet).toHaveBeenCalledTimes(1);
    expect(onSelectPet).toHaveBeenCalledWith(mockPet);
  });
});