
import { GoogleGenAI, Type } from "@google/genai";

// Fixed: Use named parameter for apiKey and strictly rely on process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAppCompatibility = async (appName: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze Android app "${appName}" for dark mode compatibility. Does it have a native dark mode? If not, what are the common UI breakage issues when using 'Force Dark'? Return JSON.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            hasNativeSupport: { type: Type.BOOLEAN },
            potentialIssues: { type: Type.STRING },
            riskLevel: { type: Type.STRING, description: 'low, medium, high' }
          },
          required: ["hasNativeSupport", "potentialIssues", "riskLevel"]
        }
      }
    });
    // Fixed: Accessed .text property directly (not as a method) and trimmed whitespace as recommended.
    const jsonStr = response.text?.trim() || '{}';
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Gemini analysis failed:", error);
    return null;
  }
};
