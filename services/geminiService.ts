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

const recommendationSchema = {
    type: Type.OBJECT,
    properties: {
        vehicle_ids: {
            type: Type.ARRAY,
            items: { type: Type.NUMBER },
            description: "An array of vehicle IDs that are recommended for the user."
        }
    },
    required: ["vehicle_ids"]
};

const diagnosisSchema = {
    type: Type.OBJECT,
    properties: {
        potentialCauses: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of likely causes for the vehicle's issue."
        },
        suggestedSteps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "A list of actionable steps the user can take."
        },
        recommendation: {
            type: Type.STRING,
            description: "Final recommendation: 'DIY_FRIENDLY', 'CAUTION_ADVISED', or 'PROFESSIONAL_HELP_RECOMMENDED'."
        }
    },
    required: ["potentialCauses", "suggestedSteps", "recommendation"]
};

export interface Diagnosis {
    potentialCauses: string[];
    suggestedSteps: string[];
    recommendation: 'DIY_FRIENDLY' | 'CAUTION_ADVISED' | 'PROFESSIONAL_HELP_RECOMMENDED';
}

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

export const getAIRecommendations = async (favoriteVehicles: Vehicle[], candidateVehicles: Vehicle[]): Promise<number[]> => {
    if (candidateVehicles.length === 0 || favoriteVehicles.length === 0) {
        return [];
    }

    if (!process.env.API_KEY) {
        // Mock response for development
        return new Promise(resolve => {
            setTimeout(() => {
                const shuffled = [...candidateVehicles].sort(() => 0.5 - Math.random());
                resolve(shuffled.slice(0, 3).map(v => v.id));
            }, 1000);
        });
    }

    const favoritesDescription = favoriteVehicles.map(v => `- ${v.brand} ${v.name} (Type: ${v.type}, Price: ${v.price})`).join('\n');
    const candidatesDescription = candidateVehicles.map(v => `ID ${v.id}: ${v.brand} ${v.name} (Type: ${v.type}, Price: ${v.price})`).join('\n');

    const prompt = `
        You are a two-wheeler expert advising a customer.
        The customer has shown interest in the following vehicles by marking them as favorites:
        ${favoritesDescription}

        Based on these preferences (considering vehicle type, brand style, and price range), recommend up to 3 vehicles from the following list of available options that the customer might also like. Prioritize vehicles with similar characteristics.

        Available Options:
        ${candidatesDescription}

        Return ONLY the IDs of your recommended vehicles in the specified JSON format.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recommendationSchema
            },
        });

        const jsonText = response.text.trim();
        const recommendationData = JSON.parse(jsonText);

        if (recommendationData && Array.isArray(recommendationData.vehicle_ids)) {
            return recommendationData.vehicle_ids.filter((id: any): id is number => typeof id === 'number');
        } else {
            throw new Error("Invalid JSON format received from API for recommendations.");
        }

    } catch (error) {
        console.error("Error generating recommendations with Gemini API:", error);
        throw new Error("Failed to communicate with the AI service for recommendations.");
    }
};

export const diagnoseVehicleProblem = async (description: string, image?: { mimeType: string; data: string }): Promise<Diagnosis> => {
  if (!process.env.API_KEY) {
    // Mock response for development
    return new Promise(resolve => setTimeout(() => {
        const isSerious = /engine|smoke|leak/i.test(description);
        resolve({
            potentialCauses: ["Loose connection", "Worn-out component", "Low fluid level"],
            suggestedSteps: ["Check for visible loose wires.", "Inspect the component for wear and tear.", "Ensure all fluid levels are optimal."],
            recommendation: isSerious ? "PROFESSIONAL_HELP_RECOMMENDED" : "CAUTION_ADVISED"
        });
    }, 1500));
  }
  
  const prompt = `
    You are an expert two-wheeler mechanic. A user is describing a problem with their vehicle.
    Problem Description: "${description}"

    Analyze the problem based on the description and the provided image (if any).

    Provide a diagnosis in the following structured format:
    1.  **Potential Causes**: List the most likely reasons for the issue.
    2.  **Suggested Steps**: Suggest simple, safe steps the user can take to diagnose or fix the problem. Start with the easiest checks first.
    3.  **Recommendation**: Based on the severity, give a final recommendation. The value must be one of the following strings: "DIY_FRIENDLY", "CAUTION_ADVISED", "PROFESSIONAL_HELP_RECOMMENDED".

    User's description:
    ${description}

    Return the result in the specified JSON format.
  `;
  
  // FIX: Explicitly type the `parts` array to allow both text and image parts.
  // This prevents TypeScript from inferring a narrow type (`{ text: string }[]`)
  // from the initial value, which caused an error when trying to push an image part.
  const parts: ({ text: string } | { inlineData: { mimeType: string; data: string; } })[] = [
    { text: prompt },
  ];

  if (image) {
    parts.push({
      inlineData: {
        mimeType: image.mimeType,
        data: image.data,
      },
    });
  }

  const contents = { parts };

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: diagnosisSchema
      },
    });

    const jsonText = response.text.trim();
    const diagnosisData = JSON.parse(jsonText);
    
    if (diagnosisData && diagnosisData.potentialCauses && diagnosisData.suggestedSteps && diagnosisData.recommendation) {
        return diagnosisData as Diagnosis;
    } else {
        throw new Error("Invalid JSON format received from API for diagnosis.");
    }

  } catch (error) {
    console.error("Error generating diagnosis with Gemini API:", error);
    throw new Error("Failed to communicate with the AI service for diagnosis.");
  }
};