import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("The OPENAI_API_KEY environment variable is missing or empty; please provide it.");
}

export const openai = new OpenAI({ apiKey });
