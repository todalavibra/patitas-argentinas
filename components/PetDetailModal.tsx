
import React from 'react';
import type { Pet } from '../types';
import { AdoptionForm } from './AdoptionForm';
import { LoadingSpinner } from './LoadingSpinner';
import { CloseIcon, PawIcon } from './IconComponents';

interface PetDetailModalProps {
  pet: Pet;
  onClose: () => void;
  isStoryLoading: boolean;
}

export const PetDetailModal: React.FC<PetDetailModalProps> = ({ pet, onClose, isStoryLoading }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-stone-50 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-1/2 relative">
          <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover md:rounded-l-2xl" />
           <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/70 hover:bg-white p-2 rounded-full text-stone-700 transition"
            aria-label="Close"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <h2 className="text-4xl font-extrabold text-stone-800">{pet.name}</h2>
          <p className="text-stone-500 mb-4">{pet.breed}</p>
          <div className="grid grid-cols-3 gap-4 text-center mb-6 bg-stone-100 p-3 rounded-lg">
            <div>
              <p className="font-bold text-stone-700">{pet.age}</p>
              <p className="text-xs text-stone-500">Age</p>
            </div>
            <div>
              <p className="font-bold text-stone-700">{pet.size}</p>
              <p className="text-xs text-stone-500">Size</p>
            </div>
            <div>
              <p className="font-bold text-stone-700">{pet.location}</p>
              <p className="text-xs text-stone-500">Location</p>
            </div>
          </div>
          <div className="mb-6 flex-grow">
            <h3 className="font-bold text-lg mb-2 text-stone-700 flex items-center gap-2">
              <PawIcon className="w-5 h-5 text-orange-400" />
              My Story
            </h3>
            {isStoryLoading ? (
              <div className="flex items-center justify-center h-24">
                <LoadingSpinner />
              </div>
            ) : (
              <p className="text-stone-600 italic bg-orange-50 p-4 rounded-lg border-l-4 border-orange-200">
                {pet.story || "Every wag of my tail has a story to tell. Are you the one to listen?"}
              </p>
            )}
          </div>
          <AdoptionForm petName={pet.name} />
        </div>
      </div>
    </div>
  );
};
