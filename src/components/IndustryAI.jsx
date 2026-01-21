import { useState } from "react";

export default function IndustryAI({ industry }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const generateResult = async () => {
    const res = await fetch("/.netlify/functions/industryAI", {
      method: "POST",
      body: JSON.stringify({ industry, prompt }),
    });
    const data = await res.json();
    setResult(data.output);
  };

  return (
    <div className="p-2 border rounded">
      <textarea
        className="w-full h-32 border p-2"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`输入你的 ${industry} 专业需求，例如旋律、剪辑或混音风格`}
      />
      <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white"
        onClick={generateResult}
      >
        生成专业建议
      </button>
      <pre className="mt-4 bg-gray-100 p-2 rounded">{result}</pre>
    </div>
  );
}
