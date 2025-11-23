import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { retriever } from "./retriever";
import { RunnableSequence } from "@langchain/core/runnables";
import { PromptTemplate } from "@langchain/core/prompts";

const prompt = PromptTemplate.fromTemplate(`
Use the context below to answer the question:

Context:
{context}

Question:
{question}
`);

const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY!,
  model: "gemini-2.5-pro",
  temperature: 0.2,
});

export const ragChain = RunnableSequence.from([
  // Retrieve docs
  async (input: { question: string }) => {
    const docs = await retriever.invoke(input.question);

    // Safeguard: handle undefined or empty results
    if (!docs || !Array.isArray(docs) || docs.length === 0) {
      return {
        context: "",
        question: input.question,
      };
    }

    return {
      context: docs.map(d => d.pageContent || "").join("\n\n"),
      question: input.question,
    };
  },
  // Run the prompt + llm
  prompt,
  llm,
]);

// Now you can invoke:
(async () => {
const results = await ragChain.invoke({ question: "what is peerspace?" });
console.log(results);
})();