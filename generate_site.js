import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function run() {
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional cybersecurity profile writer."
      },
      {
        role: "user",
        content: `
Write a professional About Me section for a senior cybersecurity architect with:
- 14+ years experience
- Cloud security (Azure, AWS)
- Red teaming, pentesting
- Security architecture
- Leadership and mentoring
Tone: executive, precise, professional
`
      }
    ]
  });

  const aboutText = response.choices[0].message.content;

  const template = fs.readFileSync("templates/index.template.html", "utf8");

  const finalHtml = template
    .replace("{{NAME}}", "Jaya Kumar")
    .replace("{{NAME}}", "Jaya Kumar")
    .replace("{{YEAR}}", new Date().getFullYear())
    .replace("{{ABOUT_ME}}", `<p>${aboutText.replace(/\n/g, "</p><p>")}</p>`);

  fs.writeFileSync("index.html", finalHtml);
}

run();
