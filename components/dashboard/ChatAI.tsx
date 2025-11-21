const ChatAI = () => {
  return (
    <div className="w-96 bg-gray-800 p-4 space-y-4 flex flex-col justify-between">
      <div className="text-xl font-semibold text-gray-100">
        PeerAI
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Ask anything"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          Ask
        </button>
      </div>
    </div>
  );
};

export default ChatAI;
