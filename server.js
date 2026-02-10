import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "No valid messages provided" });
  }

  try {
    const response = await fetch(
      "https://router.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/Llama-3.1-8B-Instruct:featherless-ai",
          messages: messages.map(msg => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.content
          }))
        }),
      }
    );

    let data;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      console.error("Non-JSON response:", text);
      return res.status(500).json({ error: text });
    }

    const assistantMessage = data.choices?.[0]?.message?.content || "No response";
    res.json({ assistant: assistantMessage });

  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(4000, () => console.log("Server running on http://localhost:4000"));
