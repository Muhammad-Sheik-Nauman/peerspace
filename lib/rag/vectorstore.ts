import { Chroma } from "@langchain/community/vectorstores/chroma";
import { embeddings } from "./embeddings";

const CHROMA_URL = process.env.CHROMA_URL || "http://localhost:8000";

export const vectorstore = new Chroma(embeddings, {
  url: CHROMA_URL,
  collectionName: "peerspace_rag",
});