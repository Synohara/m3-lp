// App shell — single deployed variant + accent tweaks

const ACCENTS = {
  ember:  "#c24a1f",   // くすんだ赤茶
  sand:   "#b88a3e",   // くすんだ黄土
  moss:   "#6a7a4a",   // くすんだ苔
  bone:   "#a8a095",   // くすんだ骨色
  ink:    "#2a2622",   // ほぼ無彩色
};

const TWEAK_DEFAULTS = JSON.parse(document.getElementById("tweak-defaults").textContent.split("/*EDITMODE-BEGIN*/")[1].split("/*EDITMODE-END*/")[0]);

function App() {
  const [accent, setAccent]   = React.useState(TWEAK_DEFAULTS.accent  || "ember");
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // persist accent across reloads
  React.useEffect(() => {
    const savedA = localStorage.getItem("mkt_accent");
    if (savedA) setAccent(savedA);
  }, []);
  React.useEffect(() => { localStorage.setItem("mkt_accent",  accent);  }, [accent]);

  // Tweak mode host protocol
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setTweaksOpen(true);
      if (d.type === "__deactivate_edit_mode") setTweaksOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const setKey = (patch) => {
    window.parent.postMessage({ type: "__edit_mode_set_keys", edits: patch }, "*");
  };

  // Apply accent CSS var
  React.useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENTS[accent] || ACCENTS.ember);
  }, [accent]);

  return (
    <>
      <VariantC />
      {tweaksOpen && (
        <TweaksPanel
          accent={accent}   setAccent={(a)   => { setAccent(a);   setKey({ accent: a });  }}
          onClose={() => setTweaksOpen(false)}
        />
      )}
    </>
  );
}

function TweaksPanel({ accent, setAccent, onClose }) {
  return (
    <div style={{
      position: "fixed",
      right: 20, bottom: 20,
      width: 320,
      background: "#0a0a0c",
      color: "#e8e6e1",
      border: "1px solid rgba(255,255,255,0.18)",
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 11,
      letterSpacing: 1.2,
      boxShadow: "0 30px 80px rgba(0,0,0,0.55)",
      zIndex: 9999,
    }}>
      <div style={{ padding: "10px 14px", borderBottom: "1px solid rgba(255,255,255,0.14)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ letterSpacing: 2.5 }}>TWEAKS</span>
        <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#e8e6e1", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>×</button>
      </div>
      <div style={{ padding: "14px" }}>
        <div style={{ opacity: 0.55, marginBottom: 8, letterSpacing: 2 }}>ACCENT</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 6, marginBottom: 12 }}>
          {Object.entries(ACCENTS).map(([k, v]) => (
            <button key={k} onClick={() => setAccent(k)}
              title={k}
              style={{
                height: 28,
                background: v,
                border: `1.5px solid ${accent === k ? "#fff" : "transparent"}`,
                cursor: "pointer",
              }} />
          ))}
        </div>
        <div style={{ opacity: 0.55, fontSize: 10, letterSpacing: 1, marginTop: 12, borderTop: "1px solid rgba(255,255,255,0.14)", paddingTop: 10, lineHeight: 1.6 }}>
          # deployed variant: C
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
