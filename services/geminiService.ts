import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFoodImage = async (base64Image: string): Promise<AIAnalysisResult> => {
  // Remove data URL prefix if present
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: base64Data,
            },
          },
          {
            text: "Analyze this food image. Identify the main dish, estimate total calories, and estimate macronutrients (protein, carbs, fat in grams). Return a JSON object."
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            foodName: { type: Type.STRING, description: "Name of the identified food" },
            calories: { type: Type.NUMBER, description: "Estimated total calories" },
            macros: {
              type: Type.OBJECT,
              properties: {
                protein: { type: Type.NUMBER, description: "Grams of protein" },
                carbs: { type: Type.NUMBER, description: "Grams of carbohydrates" },
                fat: { type: Type.NUMBER, description: "Grams of fat" },
              },
              required: ["protein", "carbs", "fat"]
            },
            confidence: { type: Type.STRING, description: "High, Medium, or Low confidence in analysis" }
          },
          required: ["foodName", "calories", "macros"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AIAnalysisResult;
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw new Error("Could not analyze food image. Please try again.");
  }
};
