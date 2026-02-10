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
        backgroundColor: "white",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "400px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
      }}>
        <h2>Disclaimer</h2>
        <p>
          This chatbot is a work of fiction and is not affiliated with 
          any real institution. By continuing, you acknowledge this.
        </p>
        <div style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between" }}>
          <button 
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#ccc",
              cursor: "pointer"
            }}
            onClick={handleDisagree}
          >
            DISAGREE
          </button>
          <button 
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#006214",
              color: "white",
              cursor: "pointer"
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