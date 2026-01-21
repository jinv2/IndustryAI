import OpenAI from "openai";

export async function handler(event) {
  try {
    if (!event.body) throw new Error("请求体为空");

    const { industry, prompt } = JSON.parse(event.body);

    // ⚠️ 客户必须在 Netlify 配置 DEEPSEEK_API_KEY
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) throw new Error("请在 Netlify 配置 DEEPSEEK_API_KEY");

    const openai = new OpenAI({ apiKey });

    // 根据行业设置系统提示
    let systemMsg = "";
    if (industry === "音乐") {
      systemMsg =
        "你是音乐制作专家AI，能根据用户输入生成旋律、和声、节奏、混音或母带建议。";
    } else if (industry === "影视") {
      systemMsg =
        "你是影视剪辑与导演AI，能根据用户输入生成剪辑建议、分镜或剧情优化方案。";
    }

    // 调用 OpenAI 接口
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
