import { useState } from "react";
import ChatBox from "./components/ChatBox";
import DisclaimerModal from "./components/DisclaimerModal";

export default function App() {
  const [agreed, setAgreed] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      {!agreed && <DisclaimerModal onAgree={() => setAgreed(true)} />}
      {agreed && <ChatBox />}
    </div>
  );
}
