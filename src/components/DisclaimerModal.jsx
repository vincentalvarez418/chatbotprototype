export default function DisclaimerModal({ onAgree }) {
  const handleDisagree = () => {
    window.close();
    window.location.href = "about:blank";
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.6)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}>
      <div style={{
        backgroundColor: "#444654",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        color: "#E5E5E5",
        fontFamily: "Roboto, Arial, sans-serif"
      }}>
        <h2 style={{ marginBottom: "1rem", textTransform: "uppercase" }}>DISCLAIMER</h2>
        <p style={{ lineHeight: 1.5, fontSize: "14px", textTransform: "uppercase" }}>
          THIS CHATBOT IS A WORK OF FICTION AND IS NOT AFFILIATED WITH 
          ANY REAL INSTITUTION. BY CONTINUING, YOU ACKNOWLEDGE THIS.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <button 
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "1px solid #555",
              backgroundColor: "#343541",
              color: "#E5E5E5",
              cursor: "pointer",
              flex: 1,
              marginRight: "0.5rem",
              textTransform: "uppercase",
              fontWeight: "600"
            }}
            onClick={handleDisagree}
          >
            DISAGREE
          </button>
          <button 
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "20px",
              border: "none",
              backgroundColor: "#ffffff",
              color: "black",
              cursor: "pointer",
              flex: 1,
              marginLeft: "0.5rem",
              textTransform: "uppercase",
              fontWeight: "600"
            }}
            onClick={onAgree}
          >
            AGREE
          </button>
        </div>
      </div>
    </div>
  );
}
