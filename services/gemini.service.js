import { GoogleGenerativeAI } from '@google/generative-ai';

export async function fetchGemini(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;

  console.log('=== GEMINI DEBUG ===');
  console.log(
    'API Key from env:',
    process.env.GEMINI_API_KEY ? 'EXISTS' : 'UNDEFINED'
  );
  console.log('API Key being used:', apiKey.substring(0, 20) + '...');
  console.log('API Key length:', apiKey.length);

  if (!apiKey) {
    throw new Error('No API key available');
  }

  try {
    console.log('Initializing GoogleGenerativeAI...');
    const genAI = new GoogleGenerativeAI(apiKey);

    console.log('Getting model...');
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    console.log('Generating content...');
    console.log('Prompt length:', prompt.length);

    const result = await model.generateContent(prompt);

    console.log('Got result, extracting response...');
    const response = await result.response;

    console.log('Getting text...');
    const text = response.text();

    console.log('Success! Generated', text.length, 'characters');
    return text;
  } catch (error) {
    console.error('=== GEMINI ERROR ===');
    console.error('Error type:', error.constructor.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack?.substring(0, 500));

    // Try to get more details from the error
    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', error.response.data);
    }

    if (error.cause) {
      console.error('Error cause:', error.cause);
    }

    // Check if it's a network error
    if (error.message.includes('fetch')) {
      throw new Error(
        'Network error: Cannot reach Google AI API. Check your internet connection.'
      );
    }

    // Check if it's an auth error
    if (
      error.message.includes('API_KEY_INVALID') ||
      error.message.includes('401')
    ) {
      throw new Error('Invalid API key. Please check your GEMINI_API_KEY.');
    }

    throw new Error(`Gemini API error: ${error.message}`);
  }
}
