import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function fetchGemini(prompt) {
  try {
    // fetch gemini api and wait for reponse
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    console.log(response.text);

    // return the generated text
    return response.text;
  } catch (error) {
    console.error('Gemini API Error:', error.reponse?.data || error.message);
    throw new Error('Failed to generate text');
  }
}
