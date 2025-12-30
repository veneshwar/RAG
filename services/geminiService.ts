
import { GoogleGenAI, GenerateContentResponse, Type } from "@google/genai";
import { Document } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface AIResponse {
  answer: string;
  confidence: number;
  hallucinationRisk: number;
  source: 'document' | 'general_knowledge';
}

export const queryDocuments = async (
  prompt: string, 
  documents: Document[]
): Promise<AIResponse> => {
  const model = 'gemini-3-flash-preview';
  
  const contextStr = documents.length > 0
    ? documents
        .filter(d => d.content)
        .map(d => `Document: ${d.name}\nContent: ${d.content}`)
        .join('\n\n---\n\n')
    : "No documents available.";

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model,
      contents: { 
        parts: [
          { text: `User Query: ${prompt}\n\nAvailable Document Context:\n${contextStr}` }
        ] 
      },
      config: {
        systemInstruction: `You are an advanced RAG (Retrieval-Augmented Generation) Intelligence engine. 
Your primary task is to answer user queries based on the provided document context.
If the documents contain the answer, set source to 'document'. 
If the documents do not contain the answer, you may answer using your general knowledge but MUST set source to 'general_knowledge'.
Carefully evaluate your own certainty for 'confidence' (0-100).
Estimate 'hallucinationRisk' (0-100) based on how much you are inferring vs directly finding in text. 
Higher hallucinationRisk means you are "guessing" more or applying complex logic not explicitly stated.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: { type: Type.STRING, description: "The detailed response to the user query." },
            confidence: { type: Type.NUMBER, description: "Confidence score from 0 to 100." },
            hallucinationRisk: { type: Type.NUMBER, description: "Risk score from 0 to 100." },
            source: { type: Type.STRING, enum: ['document', 'general_knowledge'], description: "Where the information primarily came from." }
          },
          required: ["answer", "confidence", "hallucinationRisk", "source"]
        }
      },
    });

    const result = JSON.parse(response.text || '{}');
    return {
      answer: result.answer || "I could not generate an answer.",
      confidence: result.confidence ?? 0,
      hallucinationRisk: result.hallucinationRisk ?? 100,
      source: result.source || 'general_knowledge'
    };
  } catch (error) {
    console.error("Gemini RAG API Error:", error);
    return {
      answer: "Error: Failed to process request with RAG service.",
      confidence: 0,
      hallucinationRisk: 100,
      source: 'general_knowledge'
    };
  }
};

export const summarizeDocument = async (doc: Document): Promise<string> => {
  const model = 'gemini-3-flash-preview';
  try {
    const response = await ai.models.generateContent({
      model,
      contents: `Provide a structured executive summary of ${doc.name}:\n\n${doc.content}`,
    });
    return response.text || "Summary unavailable.";
  } catch (error) {
    return "Error summarizing document.";
  }
};
