
import React from 'react';
import { PetCard } from './PetCard';
import type { Pet } from '../types';

interface PetGridProps {
  pets: Pet[];
  onSelectPet: (pet: Pet) => void;
}

export const PetGrid: React.FC<PetGridProps> = ({ pets, onSelectPet }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {pets.map(pet => (
        <PetCard key={pet.id} pet={pet} onSelectPet={onSelectPet} />
      ))}
    </div>
  );
};
