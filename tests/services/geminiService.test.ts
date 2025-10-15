import { describe, it, expect, vi } from 'vitest';
import { generatePetStory } from '../../services/geminiService';
import { GoogleGenAI } from '@google/genai';

vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn();
  const mockGoogleGenAI = vi.fn(() => ({
    models: {
      generateContent: mockGenerateContent,
    },
  }));
  return {
    GoogleGenAI: mockGoogleGenAI,
    mockGenerateContent,
  };
});

describe('geminiService', () => {
  it('should generate a pet story', async () => {
    const { mockGenerateContent } = await import('@google/genai');
    mockGenerateContent.mockResolvedValue({
      text: 'This is a test story.',
    });

    const pet = {
      id: '1',
      name: 'Test Pet',
      type: 'dog',
      breed: 'Test Breed',
      age: '2 years',
      location: 'Test City',
      image: 'test.jpg',
    };

    const story = await generatePetStory(pet);
    expect(story).toBe('This is a test story.');
  });
});
