import OpenAI from "openai";

export async function handler(event) {
  try {
    if (!event.body) throw new Error("请求体为空");
    const { industry, prompt } = JSON.parse(event.body);

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) throw new Error("请在 Netlify 配置 OPENAI_API_KEY");

    const openai = new OpenAI({ apiKey: openaiKey });

    let systemMsg = "";
    if (industry === "音乐") {
      systemMsg =
        "你是音乐制作专家AI，能根据用户输入生成旋律、和声、节奏、混音或母带建议。";
    } else if (industry === "影视") {
      systemMsg =
        "你是影视剪辑与导演AI，能根据用户输入生成剪辑建议、分镜或剧情优化方案。";
    } else {
      systemMsg = "你是一个专业AI助手，根据用户输入提供专业建议。";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        { role: "system", content: systemMsg },
        { role: "user", content: prompt },
      ],
      temperature: 0.2,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ output: response.choices[0].message.content }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}
