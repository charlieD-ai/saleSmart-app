
import { GoogleGenAI, Type } from "@google/genai";

export class SaleSmartAI {
  private ai: GoogleGenAI;

  constructor() {
    // Initializing with direct reference to process.env.API_KEY as per SDK guidelines
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async ask(prompt: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          systemInstruction: "You are SaleSmart Assistant, a specialized AI for sales conversation intelligence. Help users analyze deals, write follow-up emails, and research customers. Be concise, professional, and data-driven.",
        },
      });
      return response.text || "Sorry, I couldn't process that request.";
    } catch (error) {
      console.error("AI Error:", error);
      return "I'm having trouble connecting right now.";
    }
  }

  async analyzeConversation(transcript: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze this sales transcript and provide a summary, key signals (like competitor mentions or budget), and an ability score (0-100) for the salesperson.\n\nTranscript: ${transcript}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              signals: { type: Type.ARRAY, items: { type: Type.STRING } },
              abilityScore: { type: Type.NUMBER },
              taskScore: { type: Type.NUMBER },
              nextStep: { type: Type.STRING }
            },
            required: ["summary", "signals", "abilityScore", "taskScore", "nextStep"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Analysis Error:", error);
      return null;
    }
  }
}