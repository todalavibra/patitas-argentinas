import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { usePetStory } from '../../hooks/usePetStory';
import * as geminiService from '../../services/geminiService';
import { Pet } from '../../types';
import { ERROR_STORY } from '../../constants';

vi.mock('../../services/geminiService');

const mockPet: Pet = { id: 1, name: 'Fido', type: 'dog', image: '', story: '' };
const mockPets: Pet[] = [mockPet];
const setPets = vi.fn();

describe('usePetStory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should retry generating a story after a failure and update the story', async () => {
    const { result } = renderHook(() => usePetStory(mockPets, setPets));
    const generatePetStorySpy = vi.spyOn(geminiService, 'generatePetStory');

    // First call fails
    generatePetStorySpy.mockRejectedValueOnce(new Error('Failed to generate story'));
    let returnedPet;
    await act(async () => {
      returnedPet = await result.current.generateStory(mockPet);
    });
    expect(returnedPet.story).toBe(ERROR_STORY);


    // Second call succeeds
    const newStory = 'A new story';
    generatePetStorySpy.mockResolvedValueOnce(newStory);
    await act(async () => {
        returnedPet = await result.current.generateStory(returnedPet);
    });

    expect(generatePetStorySpy).toHaveBeenCalledTimes(2);
    expect(returnedPet.story).toBe(newStory);
  });

  it('should not generate a story if one already exists', async () => {
    const petWithStory = { ...mockPet, story: 'An existing story' };
    const { result } = renderHook(() => usePetStory([petWithStory], setPets));
    const generatePetStorySpy = vi.spyOn(geminiService, 'generatePetStory');

    await act(async () => {
        await result.current.generateStory(petWithStory);
    });

    expect(generatePetStorySpy).not.toHaveBeenCalled();
    });
});