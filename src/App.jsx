import React, { useState } from "react";
import IndustryAI from "./components/IndustryAI";

export default function App() {
  const [industry, setIndustry] = useState("音乐");

  return (
    <div className="p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">专属行业AI智能体</h1>
      <div className="mb-4">
        <label>选择行业: </label>
        <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
          <option value="音乐">音乐</option>
          <option value="影视">影视</option>
        </select>
      </div>
      <IndustryAI industry={industry} />
    </div>
  );
}
