
import React, { useState, useMemo, useCallback } from 'react';
import { Header } from './components/Header';
import { AboutUs } from './components/AboutUs';
import { PetGrid } from './components/PetGrid';
import { PetDetailModal } from './components/PetDetailModal';
import { generatePetStory } from './services/geminiService';
import { INITIAL_PETS } from './constants';
import type { Pet, PetType } from './types';

export default function App() {
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [filter, setFilter] = useState<PetType | 'all'>('all');
  const [isStoryLoading, setIsStoryLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectPet = useCallback(async (pet: Pet) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
    if (!pet.story) {
      setIsStoryLoading(true);
      try {
        const story = await generatePetStory(pet);
        const updatedPets = pets.map(p => p.id === pet.id ? { ...p, story } : p);
        setPets(updatedPets);
        setSelectedPet(prev => prev ? { ...prev, story } : null);
      } catch (error) {
        console.error("Failed to generate pet story:", error);
        setSelectedPet(prev => prev ? { ...prev, story: "Could not generate a story at this time, but my heart is full of love!" } : null);
      } finally {
        setIsStoryLoading(false);
      }
    }
  }, [pets]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPet(null);
  };

  const filteredPets = useMemo(() => {
    if (filter === 'all') {
      return pets;
    }
    return pets.filter(pet => pet.type === filter);
  }, [pets, filter]);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-800">
      <Header activeFilter={filter} onFilterChange={setFilter} />
      <main>
        <div className="container mx-auto px-4 pt-8 pb-4 text-center">
            <h1 className="text-4xl font-extrabold text-center mb-4 text-stone-700">Find Your New Best Friend</h1>
            <p className="text-lg text-center text-stone-500 max-w-2xl mx-auto">
              Every pet deserves a loving home. Explore our adorable friends waiting for a family in Argentina.
            </p>
        </div>

        <AboutUs />

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-stone-700">Meet Our Adorable Pets</h2>
          <PetGrid pets={filteredPets} onSelectPet={handleSelectPet} />
        </div>
      </main>
      <footer className="text-center py-6 mt-8 bg-white border-t border-stone-200">
        <p className="text-stone-500">&copy; 2024 Patitas Argentinas. All rights reserved.</p>
      </footer>

      {isModalOpen && selectedPet && (
        <PetDetailModal
          pet={selectedPet}
          onClose={handleCloseModal}
          isStoryLoading={isStoryLoading}
        />
      )}
    </div>
  );
}
