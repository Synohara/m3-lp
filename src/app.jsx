// App shell — variant switcher + Tweaks panel

const ACCENTS = {
  ember:  "#c24a1f",   // くすんだ赤茶
  sand:   "#b88a3e",   // くすんだ黄土
  moss:   "#6a7a4a",   // くすんだ苔
  bone:   "#a8a095",   // くすんだ骨色
  ink:    "#2a2622",   // ほぼ無彩色
};

const TWEAK_DEFAULTS = JSON.parse(document.getElementById("tweak-defaults").textContent.split("/*EDITMODE-BEGIN*/")[1].split("/*EDITMODE-END*/")[0]);

function App() {
  const [variant, setVariant] = React.useState(TWEAK_DEFAULTS.variant || "A");
  const [accent, setAccent]   = React.useState(TWEAK_DEFAULTS.accent  || "ember");
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // persist scroll + variant across reloads
  React.useEffect(() => {
    const saved = localStorage.getItem("mkt_variant");
    if (saved) setVariant(saved);
    const savedA = localStorage.getItem("mkt_accent");
    if (savedA) setAccent(savedA);
  }, []);
  React.useEffect(() => { localStorage.setItem("mkt_variant", variant); }, [variant]);
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

  // Scroll to top on variant change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [variant]);

  const Variant = { A: VariantA, B: VariantB, C: VariantC }[variant] || VariantA;

  return (
    <>
      <Variant />
      {tweaksOpen && (
        <TweaksPanel
          variant={variant} setVariant={(v) => { setVariant(v); setKey({ variant: v }); }}
          accent={accent}   setAccent={(a)   => { setAccent(a);   setKey({ accent: a });  }}
          onClose={() => setTweaksOpen(false)}
        />
      )}
    </>
  );
}

function TweaksPanel({ variant, setVariant, accent, setAccent, onClose }) {
  const variants = [
    { k: "A", name: "Footwork Grid",       desc: "160BPMステップが骨格" },
    { k: "B", name: "Classical Contact",   desc: "紙・楽譜・コンタクトシート" },
    { k: "C", name: "Terminal / Crate",    desc: "ターミナル、全部コマンド" },
  ];
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
        <div style={{ opacity: 0.55, marginBottom: 8, letterSpacing: 2 }}>VARIANT</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 18 }}>
          {variants.map(v => (
            <button key={v.k} onClick={() => setVariant(v.k)} style={{
              textAlign: "left",
              padding: "10px 12px",
              background: variant === v.k ? "rgba(255,255,255,0.08)" : "transparent",
              border: `1px solid ${variant === v.k ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.14)"}`,
              color: "inherit",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: 11,
              letterSpacing: 1.2,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>[{v.k}] {v.name}</span>
                {variant === v.k && <span style={{ color: "var(--accent)" }}>●</span>}
              </div>
              <div style={{ opacity: 0.55, marginTop: 4, fontSize: 10, letterSpacing: 0.8 }}>{v.desc}</div>
            </button>
          ))}
        </div>

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
          # keyboard: 1 / 2 / 3 で案切替
        </div>
      </div>
    </div>
  );
}

// Keyboard shortcuts
window.addEventListener("keydown", (e) => {
  if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
  if (e.key === "1") localStorage.setItem("mkt_variant", "A"), location.reload();
  if (e.key === "2") localStorage.setItem("mkt_variant", "B"), location.reload();
  if (e.key === "3") localStorage.setItem("mkt_variant", "C"), location.reload();
});

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
