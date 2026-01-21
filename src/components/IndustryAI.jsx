import { useState } from "react";

export default function IndustryAI({ industry }) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const generateResult = async () => {
    setLoading(true);
    setResult("");
    try {
      const res = await fetch("/.netlify/functions/industryAI", {
        method: "POST",
        body: JSON.stringify({ industry, prompt }),
      });
      if (!res.ok) throw new Error("Function 调用失败");
      const data = await res.json();
      setResult(data.output || "AI 没有返回结果");
    } catch (err) {
      setResult("出错：" + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-lg">
      <textarea
        className="w-full h-36 border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={`输入你的 ${industry} 专业需求，例如旋律、剪辑或混音风格`}
      />
      <button
        className="mt-4 w-full py-2 bg-purple-600 text-white font-bold rounded hover:bg-purple-700 transition"
        onClick={generateResult}
        disabled={loading}
      >
        {loading ? "生成中..." : "生成专业建议"}
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded min-h-[150px] whitespace-pre-wrap">
        {result}
      </pre>
    </div>
  );
}
