
import React from 'react';
import type { Pet } from '../types';
import { LocationIcon } from './IconComponents';

interface PetCardProps {
  pet: Pet;
  onSelectPet: (pet: Pet) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, onSelectPet }) => {
  return (
    <div 
      className="bg-white rounded-2xl shadow-md overflow-hidden group cursor-pointer transform hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col"
      onClick={() => onSelectPet(pet)}
    >
      <div className="relative h-64">
        <img
          src={pet.imageUrl}
          alt={`A cute ${pet.type} named ${pet.name}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-2xl font-bold text-white tracking-wide">{pet.name}</h3>
          <p className="text-sm text-stone-200">{pet.breed}</p>
        </div>
      </div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
           <div className="flex items-center text-stone-500 text-sm mb-4">
            <LocationIcon className="w-4 h-4 mr-2 text-stone-400" />
            <span>{pet.location}, Argentina</span>
          </div>
          <div className="flex justify-around text-center mb-4">
            <div>
              <p className="font-bold text-stone-700">{pet.age}</p>
              <p className="text-xs text-stone-500">Age</p>
            </div>
             <div>
              <p className="font-bold text-stone-700">{pet.size}</p>
              <p className="text-xs text-stone-500">Size</p>
            </div>
          </div>
        </div>
        <button className="w-full bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-300 transform group-hover:scale-105">
          Meet {pet.name}
        </button>
      </div>
    </div>
  );
};
