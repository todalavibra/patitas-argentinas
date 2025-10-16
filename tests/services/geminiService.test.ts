import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generatePetStory, generateAboutUsImage } from '../../services/geminiService';
import { GoogleGenAI } from '@google/genai';

vi.mock('@google/genai', () => {
  const mockGenerateContent = vi.fn();
  const mockGenerateImages = vi.fn();
  const mockGoogleGenAI = vi.fn(() => ({
    models: {
      generateContent: mockGenerateContent,
      generateImages: mockGenerateImages,
    },
  }));
  return {
    GoogleGenAI: mockGoogleGenAI,
    mockGenerateContent,
    mockGenerateImages,
  };
});

describe('geminiService', () => {
  beforeEach(async () => {
    const { mockGenerateContent, mockGenerateImages } = await import('@google/genai');
    mockGenerateContent.mockClear();
    mockGenerateImages.mockClear();
  });

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

  it('should generate an about us image', async () => {
    const { mockGenerateImages } = await import('@google/genai');
    const mockBase64Image = 'dGVzdGltYWdl';
    mockGenerateImages.mockResolvedValue({
      generatedImages: [
        {
          image: {
            imageBytes: mockBase64Image,
          },
        },
      ],
    });

    const imageUrl = await generateAboutUsImage();
    expect(imageUrl).toBe(`data:image/jpeg;base64,${mockBase64Image}`);
  });

  it('should throw an error if pet story generation fails', async () => {
    const { mockGenerateContent } = await import('@google/genai');
    mockGenerateContent.mockRejectedValue(new Error('API Error'));

    const pet = {
      id: '1',
      name: 'Test Pet',
      type: 'dog',
      breed: 'Test Breed',
      age: '2 years',
      location: 'Test City',
      image: 'test.jpg',
    };

    await expect(generatePetStory(pet)).rejects.toThrow('Failed to generate pet story.');
  });

  it('should throw an error if about us image generation fails', async () => {
    const { mockGenerateImages } = await import('@google/genai');
    mockGenerateImages.mockRejectedValue(new Error('API Error'));

    await expect(generateAboutUsImage()).rejects.toThrow('Failed to generate about us image.');
  });
});
