"use client"
import { useState } from "react";

const ChatAI = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  async function handleQuery() {
    const res = await fetch("/api/rag", {
      method: "POST",
      body: JSON.stringify({ query: input }),
    });

    const data = await res.json();
    setResponse(data.answer);
  }

  return (
    <div className="w-96 bg-gray-800 p-4 space-y-4 flex flex-col justify-between">
      <div className="text-xl font-semibold text-gray-100">
        PeerAI
      </div>
      <div>
        {response && (
          <div className="mt-4 text-gray-300 bg-[#222] p-3 rounded">
            {response}
          </div>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask anything"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition" onClick={handleQuery}>
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatAI;
