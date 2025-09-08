import GeminiDao from "../dao/geminiDao.js";

export default class GeminiController {
  async generateContent(prompt) {
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      throw new Error("Prompt cannot be null, undefined, or blank.");
    }

    if (prompt.length > 1000) {
      throw new Error("Prompt cannot exceed 1000 characters.");
    }

    const dao = new GeminiDao();
    return await dao.callGeminiAPI(prompt);
  }
}
