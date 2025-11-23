import "dotenv/config";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { embeddings } from "./embeddings";
import { Chroma } from "@langchain/community/vectorstores/chroma";

async function ingest() {
  const rawText = `
  PeerSpace is a college community interaction platform.
  Students can discuss, post and everything.
  Sahydri is a college located in Mangalore, India.
  Full name is Sahydri College of Engineering and Management.
  `;

  // 1. Split into chunks
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 50,
  });

  const docs = await splitter.createDocuments([rawText]);

  // 2. Push into Chroma vector DB
  await Chroma.fromDocuments(docs, embeddings, {
    url: "http://localhost:8000",
    collectionName: "peerspace_rag",
  });

  console.log("Data successfully ingested into Chroma!");
}

ingest();