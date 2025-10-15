import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { generatePetStory } from '../services/geminiService';
import type { Pet } from '../types';

export function usePetStory(pets: Pet[], setPets: React.Dispatch<React.SetStateAction<Pet[]>>) {
  const [isStoryLoading, setIsStoryLoading] = useState(false);

  const generateStory = useCallback(async (pet: Pet) => {
    if (!pet.story) {
      setIsStoryLoading(true);
      try {
        const story = await generatePetStory(pet);
        const updatedPets = pets.map(p => p.id === pet.id ? { ...p, story } : p);
        setPets(updatedPets);
        return { ...pet, story };
      } catch (error) {
        console.error("Failed to generate pet story:", error);
        toast.error("Failed to generate pet story. Please try again later.");
        const errorStory = "Could not generate a story at this time, but my heart is full of love!";
        const updatedPets = pets.map(p => p.id === pet.id ? { ...p, story: errorStory } : p);
        setPets(updatedPets);
        return { ...pet, story: errorStory };
      } finally {
        setIsStoryLoading(false);
      }
    }
    return pet;
  }, [pets, setPets]);

  return { isStoryLoading, generateStory };
}
