import { vectorstore } from "./vectorstore";

export const retriever = vectorstore.asRetriever({
  k: 4, // number of relevant chunks to return
});