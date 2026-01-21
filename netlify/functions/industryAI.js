import OpenAI from "openai";

export async function handler(event) {
  try {
    const { industry, prompt } = JSON.parse(event.body);

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    let systemMsg = "";
    if (industry === "音乐") {
      systemMsg =
        "你是一个音乐制作专家AI，能根据用户输入生成旋律、和声、节奏、混音或母带建议。";
    } else if (industry === "影视") {
      systemMsg =
        "你是一个影视剪辑与导演AI，能根据用户输入生成剪辑建议、分镜或剧情优化方案。";
    }

    const response = await openai.chat.completions.create({
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
}
