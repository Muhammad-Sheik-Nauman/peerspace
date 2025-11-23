import { ragChain } from "@/lib/rag/rag";
import { NextResponse } from "next/server";

const MAX_QUERY_LENGTH = 1000; // safeguard for excessively long queries

export async function POST(req: Request) {
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const query = body?.query;

  if (!query || typeof query !== "string" || query.trim().length === 0) {
    return NextResponse.json({ error: "`query` must be a non-empty string" }, { status: 400 });
  }

  if (query.length > MAX_QUERY_LENGTH) {
    return NextResponse.json({ error: `Query too long (max ${MAX_QUERY_LENGTH} chars)` }, { status: 413 });
  }

  try {
    // Basic timeout using Promise.race so we don't rely on passing AbortSignals into the runnable
    const resultPromise = ragChain.invoke({ question: query });
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("RAG_TIMEOUT")), 25_000)
    );

    const result = await Promise.race([resultPromise, timeoutPromise]);

    const r: any = result;
    const answer = typeof result === "string" ? result : r?.content ?? r?.text ?? "";

    return NextResponse.json({ answer }, { status: 200 });
  } catch (err: any) {
    if (err?.message === "RAG_TIMEOUT") {
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }

    console.error("RAG pipeline error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}