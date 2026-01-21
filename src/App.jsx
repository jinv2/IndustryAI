import React, { useState } from "react";
import IndustryAI from "./components/IndustryAI";

export default function App() {
  const [industry, setIndustry] = useState("音乐");

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
        专属行业AI智能体
      </h1>
      <div className="mb-4">
        <label className="text-white mr-2 font-semibold">选择行业:</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="p-2 rounded border border-gray-300 focus:outline-none"
        >
          <option value="音乐">音乐</option>
          <option value="影视">影视</option>
        </select>
      </div>
      <IndustryAI industry={industry} />
    </div>
  );
}
