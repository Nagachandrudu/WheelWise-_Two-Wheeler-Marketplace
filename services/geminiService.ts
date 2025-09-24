
import { GoogleGenAI, Type } from "@google/genai";
import { Vehicle } from '../types';

if (!process.env.API_KEY) {
  // This is a placeholder for development. In a real environment,
  // the API key would be set.
  // console.warn("API_KEY environment variable not set. Using a mock response.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock-api-key" });

const reviewSchema = {
    type: Type.OBJECT,
    properties: {
        pros: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of positive aspects or advantages of the vehicle."
        },
        cons: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of negative aspects or disadvantages of the vehicle."
        }
    },
    required: ["pros", "cons"]
};

export const generateReview = async (vehicle: Vehicle): Promise<{ pros: string[]; cons: string[] }> => {
  
  if (!process.env.API_KEY) {
    // Mock response for development if API key is not available
    return new Promise(resolve => setTimeout(() => resolve({
        pros: [
            `Excellent fuel efficiency at ${vehicle.mileage}.`,
            `Reliable engine with ${vehicle.engine} displacement.`,
            "Low maintenance cost, ideal for daily commuting."
        ],
        cons: [
            "Basic features compared to competitors.",
            `Braking system (${vehicle.brakes}) could be improved.`,
            "Suspension might feel stiff on rough roads."
        ]
    }), 1500));
  }

  const prompt = `
    Analyze the following two-wheeler specifications and provide a balanced review.
    Vehicle Name: ${vehicle.brand} ${vehicle.name}
    Price: INR ${vehicle.price}
    Key Specs:
    - Mileage: ${vehicle.mileage}
    - Engine: ${vehicle.engine}
    - Power: ${vehicle.power}
    - Brakes: ${vehicle.brakes}
    
    Based on these specs, identify the main pros and cons for a potential buyer.
    Return the result in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: reviewSchema
      },
    });

    const jsonText = response.text.trim();
    const reviewData = JSON.parse(jsonText);
    
    // Basic validation
    if (reviewData && Array.isArray(reviewData.pros) && Array.isArray(reviewData.cons)) {
      return reviewData;
    } else {
      throw new Error("Invalid JSON format received from API.");
    }

  } catch (error) {
    console.error("Error generating review with Gemini API:", error);
    throw new Error("Failed to communicate with the AI service.");
  }
};
