// Variant B — Classical Contact Sheet
// Concept: サンプリング元の楽譜や写真をコンタクトシートのように並べる、紙の質感。
// 左に縦書きのセクションラベル、右ページに余白多めの組み。横スクロール要素で「めくる」感覚。

const B_PAL = {
  paper: "#efece4",
  ink:   "#141210",
  dim:   "rgba(20,18,16,0.58)",
  line:  "rgba(20,18,16,0.18)",
  accent: "var(--accent, #a63a1a)",
};

function B_Staff({ seed = 1 }) {
  // Placeholder "musical staff" with simulated notes
  const lines = [];
  for (let i = 0; i < 5; i++) {
    lines.push(<line key={i} x1="0" y1={10 + i * 8} x2="280" y2={10 + i * 8} stroke={B_PAL.ink} strokeOpacity="0.45" strokeWidth="0.6" />);
  }
  const notes = [];
  const positions = [12, 32, 56, 70, 96, 120, 140, 164, 188, 210, 236, 258];
  positions.forEach((x, i) => {
    const t = Math.sin(i * seed * 0.7) * 10 + 26;
    notes.push(<ellipse key={i} cx={x} cy={t} rx="3.5" ry="2.6" fill={B_PAL.ink} />);
    notes.push(<line key={"s"+i} x1={x+3.5} y1={t} x2={x+3.5} y2={t - 18} stroke={B_PAL.ink} strokeWidth="0.8" />);
  });
  return (
    <svg viewBox="0 0 280 56" style={{ width: "100%", height: 56, display: "block" }}>
      {lines}
      {notes}
    </svg>
  );
}

function B_Hero() {
  const { sub } = useBpmClock(160);
  return (
    <section style={{
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "64px 1fr 1fr",
      borderBottom: `1px solid ${B_PAL.line}`,
    }}>
      {/* Side rail */}
      <div style={{ borderRight: `1px solid ${B_PAL.line}`, padding: "24px 0 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.dim, writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
          MAKOTYO — POLISHED FLAME
        </span>
        <div style={{ width: 1, flex: 1, background: B_PAL.line, margin: "20px 0" }} />
        <span style={{
          display: "inline-block",
          width: 10, height: 10, borderRadius: 10,
          background: B_PAL.accent,
          opacity: 0.35 + (1 - sub) * 0.65,
        }} />
      </div>

      {/* Left column: heading */}
      <div style={{ padding: "72px 48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 3, color: B_PAL.dim, marginBottom: 28 }}>
            № 001 ／ 4 PIECES ／ 160 BPM
          </div>
          <h1 style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 300,
            fontSize: "clamp(60px, 8.5vw, 136px)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: B_PAL.ink,
          }}>
            Polished<br/>Flame
          </h1>
          <div style={{ marginTop: 18, fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 18, color: B_PAL.dim }}>
            — 160の世界で、クラシックを踏む。
          </div>
        </div>

        <div style={{ maxWidth: 440, marginTop: 48 }}>
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 15, lineHeight: 2, color: B_PAL.ink }}>
            {EP.description}
          </p>
          <div style={{ marginTop: 28, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, color: B_PAL.dim }}>
            INFLUENCES: {EP.influences.join(" · ")}
          </div>
        </div>
      </div>

      {/* Right column: jacket */}
      <div style={{ padding: "72px 64px 40px 0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div style={{ position: "absolute", top: 24, right: 24, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, color: B_PAL.dim }}>
          PL. I
        </div>
        <div style={{ width: "85%", maxWidth: 520, aspectRatio: "1", boxShadow: "0 30px 60px rgba(0,0,0,0.12)", background: "#efece4", border: `1px solid ${B_PAL.line}` }}>
          <JacketPlaceholder palette="light" />
        </div>
      </div>
    </section>
  );
}

function B_Index() {
  const { active, progresses, toggle, bind } = useAudioPlayer(EP.tracks.length);
  return (
    <section id="tracks" style={{ padding: "96px 64px", borderBottom: `1px solid ${B_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div style={{ position: "sticky", top: 40, alignSelf: "start" }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ I</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>目次</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>Index of Pieces</div>
        </div>
        <div>
          {EP.tracks.map((t, i) => {
            const isActive = active === i;
            return (
              <div key={i} style={{
                padding: "32px 0",
                borderTop: i === 0 ? `1px solid ${B_PAL.ink}` : `1px solid ${B_PAL.line}`,
              }}>
                <div style={{ display: "grid", gridTemplateColumns: "64px 1fr 100px", alignItems: "baseline", gap: 24 }}>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: B_PAL.dim, letterSpacing: 2 }}>№ {t.n}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
                      <span style={{ fontFamily: "'Noto Serif JP', serif", fontWeight: 400, fontSize: 40, color: B_PAL.ink, letterSpacing: "-0.01em" }}>
                        {t.title}
                      </span>
                      <span style={{ color: isActive ? B_PAL.accent : B_PAL.dim, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, display: "inline-flex", alignItems: "center", gap: 6 }}>
                        {isActive ? <Icon.pause size={9}/> : <Icon.play size={9}/>} {isActive ? "NOW PLAYING" : "PREVIEW"}
                      </span>
                    </div>
                    <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 8 }}>
                      {t.sample}
                    </div>
                    <div style={{ marginTop: 14, color: isActive ? B_PAL.accent : B_PAL.ink, opacity: isActive ? 1 : 0.7 }}>
                      <Waveform seed={i + 2} color="currentColor" progress={progresses[i] || 0} height={32} />
                    </div>
                    <div style={{ marginTop: 14 }}>
                      <audio
                        {...bind(i)}
                        aria-label={t.audioLabel}
                        controls
                        preload="none"
                        src={t.audioSrc}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </div>
                  <div style={{ textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: B_PAL.dim, letterSpacing: 2 }}>
                    <button
                      onClick={() => toggle(i)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: isActive ? B_PAL.accent : B_PAL.dim,
                        cursor: "pointer",
                        font: "inherit",
                        letterSpacing: "inherit",
                        padding: 0,
                      }}
                    >
                      {t.len}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function B_Plates() {
  // "Contact sheet" — sampling元の欠片
  return (
    <section style={{ padding: "96px 64px", borderBottom: `1px solid ${B_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ II</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>素材集</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>Contact Sheet</div>
          <p style={{ marginTop: 24, fontFamily: "'Noto Serif JP', serif", fontSize: 13, lineHeight: 2, color: B_PAL.dim }}>
            各曲に織り込まれたサンプリング元の断片。原曲の呼吸を、そのまま置いている。
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {EP.tracks.map((t, i) => (
            <div key={i} style={{ background: "#e4e0d6", border: `1px solid ${B_PAL.line}`, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: B_PAL.dim, letterSpacing: 2, marginBottom: 12 }}>
                <span>PL. {["II","III","IV","V"][i]}</span>
                <span>{t.n} — {t.title}</span>
              </div>
              <B_Staff seed={i + 1} />
              <div style={{ marginTop: 14, fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 13, color: B_PAL.ink }}>
                {t.sample.replace("sampling: ", "")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function B_Essay() {
  return (
    <section style={{ padding: "96px 64px", borderBottom: `1px solid ${B_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div style={{ position: "sticky", top: 40, alignSelf: "start" }}>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ III</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>解題</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>Liner Notes</div>
        </div>
        <div style={{ maxWidth: 680, columnCount: 1 }}>
          {EP.liner.map((ln, i) => (
            <div key={i} style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 16, color: B_PAL.accent, marginBottom: 8 }}>
                {ln.n} {ln.head}
              </div>
              <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 17, lineHeight: 2.1, color: B_PAL.ink }}>
                {ln.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function B_Media() {
  return (
    <section style={{ padding: "96px 64px", borderBottom: `1px solid ${B_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ IV</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>動画</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>Moving Image</div>
        </div>
        <div style={{ display: "grid", gap: 32 }}>
          <B_VideoPanel title="Crossfade Demo" sub="4曲のクロスフェード ／ 約4:30" />
          <B_VideoPanel title="Music Video — Pootwork" sub="dir. [—] ／ 2026" />
        </div>
      </div>
    </section>
  );
}

function B_VideoPanel({ title, sub }) {
  return (
    <div>
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "#dbd6cb",
        border: `1px solid ${B_PAL.line}`,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ width: 72, height: 72, borderRadius: 72, border: `1.5px solid ${B_PAL.ink}`, display: "flex", alignItems: "center", justifyContent: "center", color: B_PAL.ink }}>
          <Icon.play size={20} />
        </div>
        <span style={{ position: "absolute", top: 14, left: 16, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, color: B_PAL.dim }}>
          [ VIDEO PLACEHOLDER ]
        </span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: B_PAL.dim, letterSpacing: 1.5 }}>
        <span style={{ color: B_PAL.ink }}>{title}</span>
        <span>{sub}</span>
      </div>
    </div>
  );
}

function B_Profile() {
  return (
    <section style={{ padding: "96px 64px", borderBottom: `1px solid ${B_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ V</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>作家について</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>About makotyo</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 48, maxWidth: 900 }}>
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 17, lineHeight: 2.1, color: B_PAL.ink }}>
            {EP.profile.longJa}
          </p>
          <div>
            {EP.profile.facts.map(([k, v], i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${B_PAL.line}`, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1.5 }}>
                <span style={{ color: B_PAL.dim, textTransform: "uppercase" }}>{k}</span>
                <span style={{ color: B_PAL.ink }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function B_Buy() {
  return (
    <section id="buy" style={{ padding: "120px 64px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "180px 1fr", gap: 64 }}>
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 3, color: B_PAL.accent, marginBottom: 10 }}>§ VI</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 28, lineHeight: 1.2, color: B_PAL.ink }}>頒布</div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontStyle: "italic", fontSize: 14, color: B_PAL.dim, marginTop: 4 }}>Online Booth / M3-2026</div>
        </div>
        <div>
          <div style={{ fontFamily: "'Noto Serif JP', serif", fontSize: "clamp(40px, 5vw, 72px)", lineHeight: 1.15, color: B_PAL.ink, letterSpacing: "-0.01em", marginBottom: 32 }}>
            {EP.online.label}<br/><span style={{ fontStyle: "italic", color: B_PAL.accent }}>{EP.online.genre}</span>
          </div>
          <p style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 15, lineHeight: 2, color: B_PAL.dim, marginBottom: 28, maxWidth: 680 }}>
            {EP.online.tags.join(" / ")}<br/>
            {EP.online.note}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 0, maxWidth: 720 }}>
            {EP.links.map((l, i) => (
              <a key={i} href={l.url} style={{
                padding: "24px 0",
                borderTop: `1px solid ${B_PAL.line}`,
                borderBottom: `1px solid ${B_PAL.line}`,
                marginTop: -1,
                textDecoration: "none",
                color: B_PAL.ink,
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                paddingRight: 24,
              }}>
                <span style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 22, color: l.primary ? B_PAL.accent : B_PAL.ink }}>{l.label}</span>
                <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: B_PAL.dim, letterSpacing: 2 }}>{l.note} <Icon.ext size={10}/></span>
              </a>
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 80, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: B_PAL.dim, letterSpacing: 2, display: "flex", justifyContent: "space-between" }}>
        <span>© MAKOTYO 2026</span>
        <span>POLISHED · FLAME · POLISHED · FLAME</span>
      </div>
    </section>
  );
}

function VariantB() {
  return (
    <div style={{ background: B_PAL.paper, color: B_PAL.ink, minHeight: "100vh" }}>
      <B_Hero />
      <B_Index />
      <B_Plates />
      <B_Essay />
      <B_Media />
      <B_Profile />
      <B_Buy />
    </div>
  );
}

window.VariantB = VariantB;
