import axios from 'axios';

export default class GeminiDao {
  async callGeminiAPI(prompt) {
    const { GEMINI_API_URL, GEMINI_API_KEY } = process.env;

    if (!GEMINI_API_URL || !GEMINI_API_KEY) {
      throw new Error("Gemini API URL or API Key is missing from environment variables.");
    }

    try {
      const response = await axios.post(
        GEMINI_API_URL,
        { contents: [{ parts: [{ text: prompt }] }] },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': GEMINI_API_KEY,
          },
          timeout: 10000, // ⏱️ Prevents hanging requests
        }
      );

      const candidates = response.data?.candidates;
      if (!candidates || candidates.length === 0) {
        throw new Error("Gemini API returned no candidates.");
      }

      const text = candidates[0]?.content?.parts?.[0]?.text;
      return text || "No text response from Gemini.";
    } catch (error) {
      // Log the full error for debugging
      console.error("Gemini API call failed:", error.response?.data || error.message);

      // Throw a user-friendly error upwards
      throw new Error("Failed to fetch response from Gemini API. Please try again later.");
    }
  }
}
