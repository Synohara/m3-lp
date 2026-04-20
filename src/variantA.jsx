// Variant A — Footwork Grid
// Concept: 160BPMに同期した12x4ステップグリッドがページの骨格。
// ジャケとメタ情報が中央、トラックはステップ配置、Juke clockが常時走る。

const A_PAL = {
  bg: "#0f0d0a",
  ink: "#ece7dc",
  dim: "rgba(236,231,220,0.55)",
  line: "rgba(236,231,220,0.12)",
  accent: "var(--accent, #c24a1f)",
};

function A_StepGrid({ step }) {
  // 16 steps x 4 rows (ghost pattern, decorative)
  const rows = 4, cols = 16;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isHit =
        (r === 0 && c % 4 === 0) ||
        (r === 1 && (c === 3 || c === 5 || c === 11 || c === 13)) ||
        (r === 2 && (c === 2 || c === 6 || c === 10 || c === 14)) ||
        (r === 3 && (c === 7 || c === 15));
      const active = c === step;
      cells.push(
        <div key={`${r}-${c}`} style={{
          width: "100%", aspectRatio: "1",
          border: `1px solid ${active ? A_PAL.accent : A_PAL.line}`,
          background: isHit ? (active ? A_PAL.accent : "rgba(236,231,220,0.08)") : "transparent",
          transition: "all 80ms linear",
        }} />
      );
    }
  }
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gridTemplateRows: `repeat(${rows}, 1fr)`,
      gap: 4,
    }}>
      {cells}
    </div>
  );
}

function A_Hero() {
  const { step, sub } = useBpmClock(160);
  const pulse = 1 - sub;
  return (
    <section style={{
      minHeight: "100vh",
      padding: "28px 40px 48px",
      display: "grid",
      gridTemplateRows: "auto 1fr auto",
      gap: 28,
      borderBottom: `1px solid ${A_PAL.line}`,
    }}>
      {/* Top bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 2, color: A_PAL.dim }}>
        <div style={{ display: "flex", gap: 20, alignItems: "baseline" }}>
          <span style={{ color: A_PAL.ink, letterSpacing: 3 }}>MAKOTYO</span>
          <span>— EP / {EP.year}</span>
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <span>160 BPM</span>
          <span style={{
            display: "inline-block",
            width: 8, height: 8, borderRadius: 8,
            background: A_PAL.accent,
            opacity: 0.4 + pulse * 0.6,
            transform: `scale(${0.8 + pulse * 0.4})`,
          }} />
          <span>JUKE · FOOTWORK</span>
        </div>
      </div>

      {/* Main hero */}
      <div style={{ display: "grid", gridTemplateColumns: "minmax(280px, 42%) 1fr", gap: 56, alignItems: "center" }}>
        {/* Jacket */}
        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "1", background: "#1a1714", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}>
            <JacketPlaceholder palette="dark" />
          </div>
          <div style={{ position: "absolute", top: -8, left: -8, right: 8, bottom: 8, border: `1px solid ${A_PAL.line}`, pointerEvents: "none" }} />
        </div>
        {/* Title block */}
        <div>
          <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 3, color: A_PAL.dim, marginBottom: 18 }}>
            CAT · MKT-001 ／ 4 TRACKS ／ 2026
          </div>
          <h1 style={{
            fontFamily: "'Noto Serif JP', serif",
            fontWeight: 900,
            fontSize: "clamp(72px, 11vw, 176px)",
            lineHeight: 0.88,
            letterSpacing: "-0.02em",
            color: A_PAL.ink,
          }}>
            Polished<br/>Flame<span style={{ color: A_PAL.accent }}>.</span>
          </h1>
          <div style={{ marginTop: 18, fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: 1.5, color: A_PAL.dim }}>
            {EP.titleSub}
          </div>
          <p style={{
            marginTop: 32,
            maxWidth: 520,
            fontFamily: "'Noto Sans JP', sans-serif",
            fontSize: 15,
            lineHeight: 1.9,
            color: A_PAL.ink,
            opacity: 0.85,
          }}>
            {EP.taglineJa}<br/>
            <span style={{ color: A_PAL.dim, fontSize: 13, letterSpacing: 0.5 }}>{EP.tagline}</span>
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a href="#tracks" style={{
              padding: "14px 22px",
              background: A_PAL.accent, color: "#0f0d0a",
              fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <Icon.play size={11} /> LISTEN
            </a>
            <a href="#buy" style={{
              padding: "14px 22px",
              border: `1px solid ${A_PAL.ink}`, color: A_PAL.ink,
              fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              BANDCAMP <Icon.ext size={11} />
            </a>
          </div>
        </div>
      </div>

      {/* Step grid */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 10, letterSpacing: 2, color: A_PAL.dim }}>
          <span>16 STEPS / BAR @ 160 BPM</span>
          <span>STEP {String(step+1).padStart(2,"0")} / 16</span>
        </div>
        <A_StepGrid step={step} />
      </div>
    </section>
  );
}

function A_TrackList() {
  const { active, progresses, toggle, bind } = useAudioPlayer(EP.tracks.length);
  return (
    <section id="tracks" style={{ padding: "96px 40px", borderBottom: `1px solid ${A_PAL.line}` }}>
      <Labelled n="01" label="TRACKS" style={{ color: A_PAL.ink, marginBottom: 40 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {EP.tracks.map((t, i) => {
          const isActive = active === i;
          return (
            <div key={i}
              style={{
                display: "grid",
                gridTemplateColumns: "72px 1.2fr 2fr 120px 96px",
                alignItems: "center",
                gap: 24,
                padding: "22px 8px",
                borderTop: `1px solid ${A_PAL.line}`,
                background: isActive ? "rgba(236,231,220,0.04)" : "transparent",
                transition: "background 200ms",
              }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: A_PAL.dim, letterSpacing: 2, alignSelf: "start", paddingTop: 10 }}>
                {t.n}
              </span>
              <div>
                <span style={{
                  fontFamily: "'Noto Serif JP', serif",
                  fontWeight: 600,
                  fontSize: 28,
                  color: A_PAL.ink,
                  letterSpacing: "-0.01em",
                }}>
                  {t.title}
                </span>
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
              <span style={{ color: A_PAL.dim, fontFamily: "JetBrains Mono, monospace", fontSize: 11, letterSpacing: 1.5, alignSelf: "start", paddingTop: 12 }}>
                {t.sample}
              </span>
              <div style={{ color: isActive ? A_PAL.accent : A_PAL.dim, alignSelf: "start", paddingTop: 12 }}>
                <Waveform seed={i + 3} color="currentColor" progress={progresses[i] || 0} height={28} />
              </div>
              <span style={{ textAlign: "right", fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: A_PAL.dim, alignSelf: "start", paddingTop: 10 }}>
                <button
                  onClick={() => toggle(i)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    color: isActive ? A_PAL.accent : A_PAL.ink,
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    font: "inherit",
                    padding: 0,
                  }}
                >
                  {isActive ? <Icon.pause size={10}/> : <Icon.play size={10}/>}
                  {t.len}
                </button>
              </span>
            </div>
          );
        })}
        <div style={{ borderTop: `1px solid ${A_PAL.line}` }} />
      </div>
    </section>
  );
}

function A_Liner() {
  return (
    <section style={{ padding: "96px 40px", borderBottom: `1px solid ${A_PAL.line}` }}>
      <Labelled n="02" label="LINER NOTES" style={{ color: A_PAL.ink, marginBottom: 56 }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 48 }}>
        {EP.liner.map((ln, i) => (
          <div key={i}>
            <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: A_PAL.accent, letterSpacing: 2, marginBottom: 12 }}>
              {ln.n}
            </div>
            <h3 style={{ fontFamily: "'Noto Serif JP', serif", fontSize: 26, fontWeight: 600, color: A_PAL.ink, marginBottom: 14, letterSpacing: "-0.01em" }}>
              {ln.head}
            </h3>
            <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, lineHeight: 1.9, color: A_PAL.dim }}>
              {ln.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function A_Video() {
  return (
    <section style={{ padding: "96px 40px", borderBottom: `1px solid ${A_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        <div>
          <Labelled n="03" label="CROSSFADE DEMO" style={{ color: A_PAL.ink, marginBottom: 20 }} />
          <VideoCard caption="4 tracks / continuous mix / 4:30" />
        </div>
        <div>
          <Labelled n="04" label="MUSIC VIDEO / PootWORK" style={{ color: A_PAL.ink, marginBottom: 20 }} />
          <VideoCard caption="dir. [—] / 2026" />
        </div>
      </div>
    </section>
  );
}

function VideoCard({ caption }) {
  return (
    <div>
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "#1a1714",
        border: `1px solid ${A_PAL.line}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        position: "relative", overflow: "hidden",
      }}>
        {/* scanlines */}
        <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg, transparent 0, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 4px)" }} />
        <div style={{ width: 64, height: 64, borderRadius: 64, border: `1px solid ${A_PAL.ink}`, display: "flex", alignItems: "center", justifyContent: "center", color: A_PAL.ink }}>
          <Icon.play size={18} />
        </div>
        <span style={{ position: "absolute", top: 12, left: 14, fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: A_PAL.dim, letterSpacing: 2 }}>
          [ VIDEO PLACEHOLDER — embed URL ]
        </span>
      </div>
      <div style={{ marginTop: 10, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: A_PAL.dim, letterSpacing: 1.5 }}>
        {caption}
      </div>
    </div>
  );
}

function A_Profile() {
  return (
    <section style={{ padding: "96px 40px", borderBottom: `1px solid ${A_PAL.line}` }}>
      <Labelled n="05" label="ABOUT MAKOTYO" style={{ color: A_PAL.ink, marginBottom: 40 }} />
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 64 }}>
        <p style={{
          fontFamily: "'Noto Serif JP', serif",
          fontSize: 22, lineHeight: 1.9, color: A_PAL.ink, letterSpacing: "-0.005em", maxWidth: 720,
        }}>
          {EP.profile.longJa}
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {EP.profile.facts.map(([k, v], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "10px 0", borderBottom: `1px solid ${A_PAL.line}`,
              fontFamily: "JetBrains Mono, monospace", fontSize: 12, letterSpacing: 1.5,
            }}>
              <span style={{ color: A_PAL.dim, textTransform: "uppercase" }}>{k}</span>
              <span style={{ color: A_PAL.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function A_Buy() {
  return (
    <section id="buy" style={{ padding: "96px 40px", borderBottom: `1px solid ${A_PAL.line}` }}>
      <Labelled n="06" label="ONLINE BOOTH / M3-2026" style={{ color: A_PAL.ink, marginBottom: 40 }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start" }}>
        <div>
          <div style={{
            fontFamily: "'Noto Serif JP', serif",
            fontSize: 44, lineHeight: 1.2, color: A_PAL.ink, marginBottom: 18, letterSpacing: "-0.01em",
          }}>
            ネット出展。<br/>お会計はBandcampで。
          </div>
          <p style={{ fontFamily: "'Noto Sans JP', sans-serif", fontSize: 14, lineHeight: 1.9, color: A_PAL.dim, maxWidth: 480 }}>
            今回のM3はオンラインでの参加です。下のリンクから試聴・購入できます。name-your-priceで公開しているので、気に入ったら値段を付けてもらえると嬉しいです。
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {EP.links.map((l, i) => (
            <a key={i} href={l.url} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto",
              alignItems: "center", gap: 16,
              padding: "20px 0",
              borderTop: `1px solid ${A_PAL.line}`,
              textDecoration: "none",
              color: A_PAL.ink,
              fontFamily: "JetBrains Mono, monospace",
              letterSpacing: 1.5,
            }}>
              <span style={{ fontSize: 22, letterSpacing: 2, color: l.primary ? A_PAL.accent : A_PAL.ink }}>{l.label}</span>
              <span style={{ fontSize: 11, color: A_PAL.dim }}>{l.note}</span>
              <Icon.ext size={14} />
            </a>
          ))}
          <div style={{ borderTop: `1px solid ${A_PAL.line}` }} />
        </div>
      </div>
    </section>
  );
}

function A_Footer() {
  return (
    <footer style={{ padding: "40px 40px", display: "flex", justifyContent: "space-between", fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: A_PAL.dim, letterSpacing: 2 }}>
      <span>© MAKOTYO 2026 — ALL RIGHTS RESERVED</span>
      <span>POLISHED · FLAME · POLISHED · FLAME</span>
    </footer>
  );
}

function VariantA() {
  return (
    <div style={{
      background: A_PAL.bg,
      color: A_PAL.ink,
      minHeight: "100vh",
      fontFamily: "'Noto Sans JP', sans-serif",
    }}>
      <A_Hero />
      <A_TrackList />
      <A_Liner />
      <A_Video />
      <A_Profile />
      <A_Buy />
      <A_Footer />
    </div>
  );
}

window.VariantA = VariantA;
