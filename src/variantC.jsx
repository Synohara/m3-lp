// Variant C — Mono / Crate (ターミナル感を削ぎ落とした版)
// モノスペース基調の静謐なレコード資料ページ。
// 装飾: 160BPMパルス、ステップドット、左端ガター、すべて等幅組。
// 削除: $プロンプト、コマンド文字列、スキャンライン、██カーソル、● REC。

const C_PAL = {
  bg:  "#0b0b0d",
  ink: "#e4e0d6",
  dim: "rgba(228,224,214,0.55)",
  sub: "rgba(228,224,214,0.35)",
  line:"rgba(228,224,214,0.12)",
  accent: "var(--accent, #c24a1f)",
};

// Monospace section label — left gutter index + tracked label + rule
function C_Label({ n, title, sub }) {
  const hasIndex = Boolean(n);
  return (
    <div style={{ display: "grid", gridTemplateColumns: hasIndex ? "56px 1fr auto" : "1fr auto", alignItems: "baseline", gap: 20, marginBottom: 40 }}>
      {hasIndex ? <span style={{ fontSize: 11, color: C_PAL.accent, letterSpacing: 2 }}>{n}</span> : null}
      <div style={{ display: "flex", alignItems: "baseline", gap: 18 }}>
        <span style={{ fontSize: 13, color: C_PAL.ink, letterSpacing: 3, textTransform: "uppercase" }}>{title}</span>
        {sub && <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 1.5 }}>{sub}</span>}
      </div>
      <span style={{ display: "block", height: 1, background: C_PAL.line, minWidth: 120 }} />
    </div>
  );
}

function C_TopBar() {
  const { step, sub } = useBpmClock(160);
  return (
    <div style={{
      position: "sticky", top: 0, zIndex: 10,
      padding: "16px 40px",
      background: "rgba(11,11,13,0.9)",
      backdropFilter: "blur(6px)",
      borderBottom: `1px solid ${C_PAL.line}`,
      fontSize: 11, letterSpacing: 2,
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", gap: 24,
    }}>
      <span style={{ color: C_PAL.ink }}>MAKOTYO</span>
      <div style={{ display: "flex", gap: 4 }}>
        {Array.from({ length: 16 }, (_, i) => {
          const isActive = i === step;
          const isDownbeat = i % 4 === 0;
          return (
            <span key={i} style={{
              width: 6,
              height: isActive && isDownbeat ? 12 : 6,
              borderRadius: 999,
              background: isActive
                ? C_PAL.accent
                : (isDownbeat ? "rgba(228,224,214,0.28)" : "rgba(228,224,214,0.08)"),
              transform: isActive && isDownbeat ? "translateY(-3px)" : "translateY(0)",
              transformOrigin: "center bottom",
              transition: "background 60ms linear, transform 80ms linear, height 80ms linear",
            }} />
          );
        })}
      </div>
      <span style={{ textAlign: "right", color: C_PAL.dim }}>
        POLISHED FLAME
        <span style={{ opacity: 0.3, marginLeft: 8 }}>{sub.toFixed(2)}</span>
      </span>
    </div>
  );
}

function C_Hero() {
  return (
    <section style={{ padding: "80px 40px 96px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 72, alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: 3, color: C_PAL.dim, marginBottom: 32 }}>
            MKT-001 ／ 4 TRACKS
          </div>
          <h1 style={{
            margin: 0,
            fontSize: "clamp(56px, 8.4vw, 140px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: C_PAL.ink,
            fontWeight: 500,
          }}>
            Polished<br/>
            Flame<span style={{ color: C_PAL.accent }}>.</span>
          </h1>
          <div style={{ marginTop: 18, fontSize: 12, letterSpacing: 2, color: C_PAL.sub }}>
            {EP.titleSub}
          </div>
          {EP.tagline ? (
            <p style={{
              marginTop: 40,
              maxWidth: 560,
              fontSize: 13,
              lineHeight: 1.9,
              color: C_PAL.dim,
              letterSpacing: 1,
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {EP.tagline}
            </p>
          ) : null}

          <div style={{ marginTop: 40, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="#tracks" style={{
              padding: "14px 22px",
              background: C_PAL.accent, color: C_PAL.bg,
              fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <Icon.play size={11}/> LISTEN
            </a>
            <a href="#buy" style={{
              padding: "14px 22px",
              border: `1px solid ${C_PAL.ink}`, color: C_PAL.ink,
              fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              BANDCAMP <Icon.ext size={11}/>
            </a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", aspectRatio: "1", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}>
            <JacketPlaceholder palette="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}

function C_Tracks() {
  const { active, progresses, times, toggle, bind } = useAudioPlayer(EP.tracks.length);
  return (
    <section id="tracks" style={{ padding: "96px 40px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <C_Label n="01" title="Tracks" />

      <div style={{
        display: "grid",
        gridTemplateColumns: "56px 64px 1fr 1.4fr 90px",
        alignItems: "baseline",
        gap: 20,
        padding: "0 0 14px",
        borderBottom: `1px solid ${C_PAL.line}`,
        fontSize: 10, letterSpacing: 2, color: C_PAL.sub,
      }}>
        <span></span>
        <span>№</span>
        <span>TITLE</span>
        <span></span>
        <span style={{ textAlign: "right" }}>TIME</span>
      </div>

      {EP.tracks.map((t, i) => {
        const isActive = active === i;
        const durationLabel = formatTime(times[i]?.duration);
        const currentLabel = isActive ? formatTime(times[i]?.current) : durationLabel;
        return (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: "56px 64px 1fr 1.4fr 90px",
            alignItems: "center",
            gap: 20,
            padding: "26px 0",
            borderBottom: `1px solid ${C_PAL.line}`,
            background: isActive ? "rgba(228,224,214,0.03)" : "transparent",
            transition: "background 200ms",
          }}>
            <span style={{ color: isActive ? C_PAL.accent : C_PAL.dim, display: "inline-flex", justifyContent: "center" }}>
              {isActive ? <Icon.pause size={12}/> : <Icon.play size={12}/>}
            </span>
            <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 2 }}>{t.n}</span>
            <div style={{
              fontSize: 26, color: C_PAL.ink,
              letterSpacing: 0, fontWeight: 500,
            }}>
              {t.title}
              <button
                onClick={() => toggle(i)}
                style={{
                  marginTop: 14,
                  width: "100%",
                  display: "grid",
                  gridTemplateColumns: "28px 1fr auto",
                  alignItems: "center",
                  gap: 14,
                  padding: "10px 12px",
                  background: isActive ? "rgba(228,224,214,0.05)" : "rgba(228,224,214,0.02)",
                  border: `1px solid ${isActive ? "rgba(228,224,214,0.26)" : C_PAL.line}`,
                  color: "inherit",
                  cursor: "pointer",
                  textAlign: "left",
                  font: "inherit",
                }}
              >
                <span style={{ color: isActive ? C_PAL.accent : C_PAL.dim, display: "inline-flex", justifyContent: "center" }}>
                  {isActive ? <Icon.pause size={11}/> : <Icon.play size={11}/>}
                </span>
                <span style={{ color: isActive ? C_PAL.ink : C_PAL.dim, fontSize: 11, letterSpacing: 1.5 }}>
                  {isActive ? "PLAYING" : "PREVIEW"}
                </span>
                <span style={{ color: isActive ? C_PAL.accent : C_PAL.sub, fontSize: 11, letterSpacing: 1.5 }}>
                  {currentLabel}
                </span>
              </button>
              <audio
                {...bind(i)}
                aria-label={t.audioLabel}
                preload="metadata"
                src={t.audioSrc}
                style={{ display: "none" }}
              />
            </div>
            <div style={{ color: isActive ? C_PAL.accent : C_PAL.ink, opacity: isActive ? 1 : 0.6 }}>
              <Waveform seed={i + 5} color="currentColor" progress={progresses[i] || 0} height={22} />
            </div>
            <span style={{ textAlign: "right", fontSize: 12, color: isActive ? C_PAL.accent : C_PAL.ink, letterSpacing: 1.5 }}>
              <button
                onClick={() => toggle(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "inherit",
                  cursor: "pointer",
                  font: "inherit",
                  letterSpacing: "inherit",
                  padding: 0,
                }}
              >
                {durationLabel}
              </button>
            </span>
          </div>
        );
      })}
    </section>
  );
}

function C_Media() {
  return null;
}

function C_Video({ title, sub }) {
  return (
    <div>
      <div style={{
        width: "100%", aspectRatio: "16/9",
        background: "#16161a",
        border: `1px solid ${C_PAL.line}`,
        position: "relative", overflow: "hidden",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 64,
          border: `1px solid ${C_PAL.ink}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: C_PAL.ink,
        }}>
          <Icon.play size={18} />
        </div>
        <span style={{ position: "absolute", top: 14, left: 16, fontSize: 10, letterSpacing: 2, color: C_PAL.dim }}>
          [ VIDEO PLACEHOLDER — embed URL ]
        </span>
      </div>
      <div style={{
        display: "flex", justifyContent: "space-between",
        marginTop: 12, fontSize: 11, letterSpacing: 1.5,
      }}>
        <span style={{ color: C_PAL.ink }}>{title}</span>
        <span style={{ color: C_PAL.dim }}>{sub}</span>
      </div>
    </div>
  );
}

function C_Profile() {
  return (
    <section style={{ padding: "96px 40px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <C_Label n="02" title="About" sub="makotyo" />
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 64, alignItems: "start" }}>
        <p style={{
          fontSize: 17, lineHeight: 2, color: C_PAL.ink,
          maxWidth: 720, letterSpacing: 0,
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300,
        }}>
          {EP.profile.longJa}
        </p>
        <div>
          {EP.profile.facts.map(([k, v], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between",
              padding: "12px 0", borderBottom: `1px solid ${C_PAL.line}`,
              fontSize: 11, letterSpacing: 1.8,
            }}>
              <span style={{ color: C_PAL.dim, textTransform: "uppercase" }}>{k}</span>
              <span style={{ color: C_PAL.ink }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function C_Buy() {
  return (
    <section id="buy" style={{ padding: "96px 40px 40px" }}>
      <C_Label n="03" title="Online Booth" sub="M3-2026 / ネット出展" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 64, alignItems: "start", marginBottom: 64 }}>
        <div>
          <div style={{
            fontSize: "clamp(34px, 4.4vw, 60px)",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: C_PAL.ink,
            fontWeight: 500,
          }}>
            {EP.online.label}<br/>
            <span style={{ color: C_PAL.accent }}>{EP.online.genre}</span>
          </div>
          <div style={{
            marginTop: 18,
            fontSize: 10,
            letterSpacing: 2,
            color: C_PAL.sub,
          }}>
            {EP.online.tags.join(" / ")}
          </div>
          <p style={{
            marginTop: 20, maxWidth: 440,
            fontSize: 13, lineHeight: 2, color: C_PAL.dim,
            fontFamily: "'Noto Sans JP', sans-serif",
          }}>
            {EP.online.note}
          </p>
        </div>

        <div>
          {EP.links.map((l, i) => (
            <a key={i} href={l.url} style={{
              display: "grid",
              gridTemplateColumns: "40px 1fr auto 20px",
              alignItems: "center", gap: 20,
              padding: "22px 0",
              borderTop: i === 0 ? `1px solid ${C_PAL.line}` : `1px solid ${C_PAL.line}`,
              marginTop: -1,
              textDecoration: "none",
              color: C_PAL.ink,
            }}>
              <span style={{ fontSize: 10, letterSpacing: 2, color: C_PAL.sub }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontSize: 22, letterSpacing: 0.5,
                color: l.primary ? C_PAL.accent : C_PAL.ink,
              }}>
                {l.label}
              </span>
              <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 1.5 }}>{l.note}</span>
              <Icon.ext size={12} />
            </a>
          ))}
          <div style={{ borderTop: `1px solid ${C_PAL.line}` }} />
        </div>
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between",
        paddingTop: 24, borderTop: `1px solid ${C_PAL.line}`,
        fontSize: 10, letterSpacing: 2, color: C_PAL.sub,
      }}>
        <span>© 2026 MAKOTYO — ALL RIGHTS RESERVED</span>
        <span>POLISHED · FLAME</span>
      </div>
    </section>
  );
}

function VariantC() {
  return (
    <div style={{
      background: C_PAL.bg,
      color: C_PAL.ink,
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <C_TopBar />
      <C_Hero />
      <C_Tracks />
      <C_Profile />
      <C_Buy />
    </div>
  );
}

window.VariantC = VariantC;
