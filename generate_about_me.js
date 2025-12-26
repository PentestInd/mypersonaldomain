import OpenAI from "openai";
import fs from "fs";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

async function generatePage() {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "You are a professional cybersecurity profile writer."
      },
      {
        role: "user",
        content: "Write a professional About Me page for a senior cybersecurity professional with experience in cloud security, red teaming, and security architecture."
      }
    ]
  });

  const content = response.choices[0].message.content;

  const html = `
  <html>
    <head><title>About Me</title></head>
    <body>
      <h1>About Me</h1>
      <p>${content}</p>
    </body>
  </html>
  `;

  fs.writeFileSync("index.html", html);
}

generatePage();
