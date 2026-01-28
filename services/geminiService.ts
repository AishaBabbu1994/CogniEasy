
import { GoogleGenAI, Type } from "@google/genai";
import { SimplificationResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function simplifyText(text: string): Promise<SimplificationResult> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analiza el siguiente texto complejo y genera una versión simplificada kawaii según las instrucciones.
    Texto a analizar: "${text}"`,
    config: {
      systemInstruction: `Eres un experto en comunicación clara y pedagogía para niños, con una personalidad "Kawaii" (linda, tierna y alegre). 
      Tu misión es transformar textos difíciles en algo que un niño de 10 años entienda perfectamente. 
      
      TONO:
      - Usa emojis lindos (🌸, ✨, 🐱, 💖, ⭐) frecuentemente.
      - Sé muy cariñoso, entusiasta y alentador.
      - Usa expresiones como "¡Wow!", "¿Sabías que?", "¡Es súper genial!".
      
      ESTRUCTURA DE RESPUESTA:
      1. Un resumen de una sola frase (la idea central).
      2. Una explicación detallada pero simple (ELI5).
      3. Una analogía de la vida real divertida y tierna (usando animalitos, dulces, juegos o amigos).
      4. Un quiz de 5 preguntas de Verdadero/Falso con explicaciones muy amables.`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          oneSentenceSummary: {
            type: Type.STRING,
            description: "Resumen de una frase de la idea central con tono kawaii."
          },
          eli5Explanation: {
            type: Type.STRING,
            description: "Explicación detallada en lenguaje de niño de 10 años, con emojis."
          },
          analogy: {
            type: Type.STRING,
            description: "Una analogía tierna de la vida cotidiana."
          },
          quiz: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                isTrue: { type: Type.BOOLEAN },
                explanation: { 
                  type: Type.STRING, 
                  description: "Explicación cariñosa y simple del porqué de la respuesta."
                }
              },
              required: ["question", "isTrue", "explanation"]
            }
          }
        },
        required: ["oneSentenceSummary", "eli5Explanation", "analogy", "quiz"]
      }
    }
  });

  const resultStr = response.text;
  if (!resultStr) throw new Error("No se recibió respuesta de la IA.");
  
  return JSON.parse(resultStr) as SimplificationResult;
}
