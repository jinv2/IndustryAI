// netlify/functions/industryAI.js
const OpenAI = require("openai");

exports.handler = async function (event, context) {
  try {
    const { industry, prompt } = JSON.parse(event.body || "{}");
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("请在 Netlify 配置 OPENAI_API_KEY");

    const client = new OpenAI({ apiKey });

    let systemMsg = "";
    if (industry === "音乐") {
      systemMsg =
        "你是音乐制作专家AI，能根据用户输入生成旋律、和声、节奏、混音或母带建议。";
    } else if (industry === "影视") {
      systemMsg =
        "你是影视剪辑与导演AI，能根据用户输入生成剪辑建议、分镜或剧情优化方案。";
    }

    const response = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    const output = response.choices[0].message.content;

    return {
      statusCode: 200,
      body: JSON.stringify({ output }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
