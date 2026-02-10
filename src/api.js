import { BOT_PERSONA } from "./botPersona";

export async function sendMessageToCerebras(messages) {
  if (!Array.isArray(messages)) {
    console.error("sendMessageToCerebras called with invalid messages:", messages);
    return "Error: Invalid message format";
  }

  const formattedMessages = [
    { role: "system", content: BOT_PERSONA },
    ...messages
      .filter(msg => msg?.content)
      .map(msg => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      }))
  ];

  if (formattedMessages.length === 0) return "Error: No valid messages to send";

  try {
    const res = await fetch("https://chatbotprototype-5ym1.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: formattedMessages }),
    });

    const data = await res.json();

    if (data.error) return "Error: " + data.error.message;


    return data.choices?.[0]?.message?.content || data.assistant || "No response";
  } catch (err) {
    console.error("API error:", err);
    return "Error: Unable to reach server";
  }
}
