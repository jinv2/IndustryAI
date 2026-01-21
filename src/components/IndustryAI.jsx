import React, { useState } from "react";

export default function IndustryAI() {
  const [industry, setIndustry] = useState("音乐");
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/.netlify/functions/industryAI", {
        method: "POST",
        body: JSON.stringify({ industry, prompt }),
      });
      const data = await res.json();
      setOutput(data.output || data.error || "无响应");
    } catch (err) {
      setOutput(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">专属行业AI智能体</h1>
      
      <div className="mb-4">
        <label className="block mb-1 font-semibold">选择行业：</label>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="音乐">音乐</option>
          <option value="影视">影视</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">输入你的专业需求：</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows="4"
          className="w-full border p-2 rounded"
          placeholder="例如旋律、剪辑或混音风格"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "生成中..." : "生成专业建议"}
      </button>

      {output && (
        <div className="mt-4 p-4 bg-gray-100 rounded whitespace-pre-line">
          {output}
        </div>
      )}
    </div>
  );
}
