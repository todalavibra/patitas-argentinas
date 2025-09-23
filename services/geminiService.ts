
import { GoogleGenAI } from "@google/genai";
import type { Pet } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generatePetStory(pet: Pet): Promise<string> {
  const prompt = `You are a creative storyteller for an animal shelter in Argentina called "Patitas Argentinas". 
  Write a short, heartwarming, and fictional backstory for a ${pet.type} named ${pet.name}. 
  This pet is a ${pet.breed}, approximately ${pet.age} old, and was found in the beautiful city of ${pet.location}, Argentina. 
  The story should be in English, under 120 words, and written in a hopeful and touching tone to encourage adoption. 
  Focus on the pet's personality and dreams for a new home, not on past sadness.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      },
    });
    return response.text.trim();
  } catch (error) {
    console.error('Error generating story with Gemini API:', error);
    throw new Error('Failed to generate pet story.');
  }
}

export async function generateAboutUsImage(): Promise<string> {
  const prompt = `A heartwarming, photorealistic image of a diverse group of smiling volunteers in Argentina (various ages, ethnicities) caring for happy dogs and cats at a sunny, clean animal shelter. The 'Patitas Argentinas' logo is subtly visible on their T-shirts. The style should be warm, inviting, and professional.`;
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/jpeg',
        aspectRatio: '4:3',
      },
    });

    const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
    return `data:image/jpeg;base64,${base64ImageBytes}`;
  } catch (error) {
    console.error('Error generating about us image with Gemini API:', error);
    throw new Error('Failed to generate about us image.');
  }
}
