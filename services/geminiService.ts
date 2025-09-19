
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
