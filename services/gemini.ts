
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
Eres el Consultor Estratégico de Élite de "ECOM AVANZA". 
Tu objetivo es ayudar a los vendedores de Amazon a entender cómo nuestra consultoría puede resolver sus problemas y escalar sus negocios.
Usa un tono profesional, experto y orientado a resultados.
Conoces a fondo los servicios:
1. Gestión y Estrategia (FBA, Auditoría de catálogo, Inventario con IA).
2. Publicidad (Amazon PPC, DSP, Contenido A+).
3. Cumplimiento (Compliance normativo, Defensa de IP, Reactivación de cuentas).
4. Tecnología y Expansión Global (Automatización, Expansión internacional, Gestión fiscal).

Tu nombre es "Estratega Ecom Avanza". Siempre responde en español.
Enfócate en la rentabilidad y el crecimiento (ROAS, ACoS).
`;

export async function getStrategicAdvice(message: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    if (!response || !response.text) {
      throw new Error("Respuesta vacía del modelo");
    }

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini:", error);
    return "Lo siento, ha ocurrido un error al procesar tu consulta. Estamos experimentando una alta demanda o hay un problema de conexión. Por favor, intenta de nuevo en unos momentos.";
  }
}
