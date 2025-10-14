import { render, screen } from '@testing-library/react';
import { PetGrid } from '../PetGrid';
import { Pet } from '../../types';
import '@testing-library/jest-dom';
import React from 'react';

const mockPets: Pet[] = [
  { id: 1, name: 'Fido', breed: 'Golden Retriever', age: '2 years', size: 'Large', location: 'Buenos Aires', imageUrl: 'https://example.com/fido.jpg', type: 'dog' },
  { id: 2, name: 'Luna', breed: 'Siamese', age: '1 year', size: 'Small', location: 'Cordoba', imageUrl: 'https://example.com/luna.jpg', type: 'cat' },
];

describe('PetGrid', () => {
  it('should render a list of PetCard components', () => {
    render(<PetGrid pets={mockPets} onSelectPet={() => {}} />);

    mockPets.forEach(pet => {
      expect(screen.getByText(pet.name)).toBeInTheDocument();
    });
  });
});