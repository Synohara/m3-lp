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
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: hasIndex ? (isMobile ? "44px minmax(0, 1fr)" : "56px 1fr auto") : "1fr auto",
      alignItems: "baseline",
      gap: isMobile ? 12 : 20,
      marginBottom: isMobile ? 28 : 40,
    }}>
      {hasIndex ? <span style={{ fontSize: 11, color: C_PAL.accent, letterSpacing: 2 }}>{n}</span> : null}
      <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "baseline", flexDirection: isMobile ? "column" : "row", gap: isMobile ? 8 : 18 }}>
        <span style={{ fontSize: 13, color: C_PAL.ink, letterSpacing: 3, textTransform: "uppercase" }}>{title}</span>
        {sub && <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 1.5 }}>{sub}</span>}
      </div>
      {!isMobile && <span style={{ display: "block", height: 1, background: C_PAL.line, minWidth: 120 }} />}
    </div>
  );
}

function C_TopBar({ syncKey = 0 }) {
  const { step, sub } = useBpmClock(160, syncKey);
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: isMobile ? "14px 16px" : "16px 40px",
      background: "rgba(11,11,13,0.9)",
      backdropFilter: "blur(6px)",
      borderBottom: `1px solid ${C_PAL.line}`,
      fontSize: 11, letterSpacing: 2,
      display: "grid", gridTemplateColumns: isMobile ? "auto 1fr auto" : "1fr auto 1fr", alignItems: "center", gap: isMobile ? 12 : 24,
    }}>
      <span style={{ color: C_PAL.ink }}>MAKOTYO</span>
      <div style={{ display: "flex", gap: isMobile ? 2 : 4, justifyContent: "center", minWidth: 0, overflow: "hidden" }}>
        {Array.from({ length: 16 }, (_, i) => {
          const isDownbeat = i % 4 === 0;
          const isCurrentStep = i === step;
          const intensity = isCurrentStep ? (0.45 + (1 - sub) * 0.55) : 0;
          const isCurrentDownbeat = isDownbeat && isCurrentStep;
          return (
            <span key={i} style={{
              width: isMobile ? 7 : 10,
              height: isMobile ? 8 : 10,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <span style={{
                width: isMobile ? 4 : 6,
                height: isDownbeat ? (isMobile ? 7 : 9) : (isMobile ? 4 : 6),
                borderRadius: 999,
                background: isDownbeat
                  ? `rgba(242,148,112,${0.46 + intensity * 0.5})`
                  : `rgba(228,224,214,${0.08 + intensity * 0.2})`,
                boxShadow: isCurrentStep
                  ? `0 0 ${6 + intensity * 10}px rgba(242,148,112,${isDownbeat ? 0.4 : 0.12})`
                  : "none",
                transform: isCurrentDownbeat ? `scale(${1.22 + intensity * 0.42})` : "scale(1)",
                transition: "background 80ms linear, box-shadow 80ms linear, transform 80ms linear",
              }} />
            </span>
          );
        })}
      </div>
      <span style={{ textAlign: "right", color: C_PAL.dim, whiteSpace: "nowrap" }}>POLISHED FLAME</span>
    </div>
  );
}

function C_Hero() {
  const isTablet = useMediaQuery("(max-width: 980px)");
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section style={{ padding: isMobile ? "104px 16px 56px" : isTablet ? "120px 24px 72px" : "132px 40px 96px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.3fr 1fr", gap: isMobile ? 36 : isTablet ? 48 : 72, alignItems: "center" }}>
        <div>
          <h1 style={{
            margin: 0,
            fontSize: isMobile ? "clamp(48px, 18vw, 72px)" : "clamp(56px, 8.4vw, 140px)",
            lineHeight: 0.92,
            letterSpacing: "-0.03em",
            color: C_PAL.ink,
            fontWeight: 500,
          }}>
            Polished<br/>
            Flame<span style={{ color: C_PAL.accent }}>.</span>
          </h1>
          <div style={{ marginTop: 18, fontSize: 12, letterSpacing: isMobile ? 1.5 : 2, color: C_PAL.sub }}>
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

          <div style={{ marginTop: isMobile ? 28 : 40, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="#tracks" style={{
              padding: isMobile ? "14px 18px" : "14px 22px",
              background: C_PAL.accent, color: C_PAL.bg,
              fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              <Icon.play size={11}/> LISTEN
            </a>
            <a href="#buy" style={{
              padding: isMobile ? "14px 18px" : "14px 22px",
              border: `1px solid ${C_PAL.ink}`, color: C_PAL.ink,
              fontSize: 12, letterSpacing: 2, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 10,
            }}>
              BANDCAMP <Icon.ext size={11}/>
            </a>
          </div>
        </div>

        <div style={{ position: "relative" }}>
          <div style={{ width: "100%", maxWidth: isTablet ? 520 : "none", margin: isTablet ? "0 auto" : 0, aspectRatio: "1", boxShadow: "0 40px 80px rgba(0,0,0,0.55)" }}>
            <img
              src={encodeURI(`./public/${EP.coverArt}`)}
              alt={`${EP.title} cover art`}
              style={{ width: "100%", height: "100%", display: "block", objectFit: "cover" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function C_Tracks({ onPlaybackStart }) {
  const { active, progresses, times, volume, setVolume, toggle, seek, bind } = useAudioPlayer(EP.tracks.length, {
    onStart: onPlaybackStart,
  });
  const isTablet = useMediaQuery("(max-width: 980px)");
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section id="tracks" style={{ padding: isMobile ? "56px 16px" : isTablet ? "72px 24px" : "96px 40px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <C_Label n="01" title="Tracks" />

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "auto minmax(160px, 260px)",
        alignItems: "center",
        justifyContent: isMobile ? "stretch" : "end",
        gap: isMobile ? 10 : 16,
        margin: isMobile ? "-12px 0 28px" : "-18px 0 34px",
        color: C_PAL.dim,
        fontSize: 10,
        letterSpacing: 2,
      }}>
        <span>VOLUME {Math.round(volume * 100).toString().padStart(2, "0")}</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          aria-label="Preview volume"
          onChange={(e) => setVolume(Number(e.currentTarget.value))}
          style={{
            width: "100%",
            accentColor: C_PAL.accent,
          }}
        />
      </div>

      {!isMobile && (
        <div style={{
          display: "grid",
          gridTemplateColumns: isTablet ? "56px minmax(0, 1fr) minmax(160px, 1fr) 74px" : "64px minmax(0, 1fr) minmax(220px, 1.4fr) 90px",
          alignItems: "baseline",
          gap: isTablet ? 16 : 20,
          padding: "0 0 14px",
          borderBottom: `1px solid ${C_PAL.line}`,
          fontSize: 10, letterSpacing: 2, color: C_PAL.sub,
        }}>
          <span>№</span>
          <span>TITLE</span>
          <span></span>
          <span style={{ textAlign: "right" }}>TIME</span>
        </div>
      )}

      {EP.tracks.map((t, i) => {
        const isActive = active === i;
        const durationLabel = formatTime(times[i]?.duration);
        const currentLabel = isActive ? formatTime(times[i]?.current) : durationLabel;
        const seekFromPointer = (node, clientX) => {
          const rect = node.getBoundingClientRect();
          if (!rect.width) return;
          seek(i, (clientX - rect.left) / rect.width);
        };
        const handleWaveformPointerDown = (e) => {
          seekFromPointer(e.currentTarget, e.clientX);
          if (typeof e.currentTarget.setPointerCapture === "function") {
            e.currentTarget.setPointerCapture(e.pointerId);
          }
        };
        const handleWaveformPointerMove = (e) => {
          if ((e.buttons & 1) !== 1) return;
          seekFromPointer(e.currentTarget, e.clientX);
        };
        return (
          <div key={i} style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : isTablet ? "56px minmax(0, 1fr) minmax(160px, 1fr) 74px" : "64px minmax(0, 1fr) minmax(220px, 1.4fr) 90px",
            alignItems: isMobile ? "start" : "center",
            gap: isMobile ? 14 : isTablet ? 16 : 20,
            padding: isMobile ? "22px 0" : "26px 0",
            borderBottom: `1px solid ${C_PAL.line}`,
            background: isActive ? "rgba(228,224,214,0.03)" : "transparent",
            transition: "background 200ms",
          }}>
            {isMobile ? (
              <div style={{ display: "grid", gap: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 2 }}>{t.n}</span>
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      background: "transparent",
                      border: "none",
                      color: isActive ? C_PAL.accent : C_PAL.ink,
                      cursor: "pointer",
                      font: "inherit",
                      letterSpacing: 1.2,
                      padding: 0,
                    }}
                  >
                    {currentLabel}
                  </button>
                </div>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}>
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      background: "transparent",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                      font: "inherit",
                      padding: 0,
                    }}
                  >
                    <span style={{ color: isActive ? C_PAL.accent : C_PAL.dim, display: "inline-flex", justifyContent: "center" }}>
                      {isActive ? <Icon.pause size={18}/> : <Icon.play size={18}/>}
                    </span>
                  </button>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontSize: 24, color: C_PAL.ink,
                      letterSpacing: 0, fontWeight: 500,
                    }}>
                      {t.title}
                    </div>
                    <div style={{ marginTop: 6, fontSize: 10, letterSpacing: 1.2, color: C_PAL.dim }}>
                      {t.sample}
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`${t.title} waveform seek`}
                  onPointerDown={handleWaveformPointerDown}
                  onPointerMove={handleWaveformPointerMove}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ color: isActive ? C_PAL.accent : C_PAL.ink, opacity: isActive ? 1 : 0.6 }}>
                    <Waveform seed={i + 5} color="currentColor" progress={progresses[i] || 0} height={22} />
                  </div>
                </button>
              </div>
            ) : (
              <>
                <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 2 }}>{t.n}</span>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  minWidth: 0,
                }}>
                  <button
                    onClick={() => toggle(i)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 34,
                      height: 34,
                      background: "transparent",
                      border: "none",
                      color: "inherit",
                      cursor: "pointer",
                      textAlign: "left",
                      font: "inherit",
                      padding: 0,
                    }}
                  >
                    <span style={{ color: isActive ? C_PAL.accent : C_PAL.dim, display: "inline-flex", justifyContent: "center" }}>
                      {isActive ? <Icon.pause size={18}/> : <Icon.play size={18}/>}
                    </span>
                  </button>
                  <div style={{
                    fontSize: isTablet ? 22 : 26, color: C_PAL.ink,
                    letterSpacing: 0, fontWeight: 500,
                    minWidth: 0,
                  }}>
                    {t.title}
                  </div>
                </div>
                <button
                  type="button"
                  aria-label={`${t.title} waveform seek`}
                  onPointerDown={handleWaveformPointerDown}
                  onPointerMove={handleWaveformPointerMove}
                  style={{
                    display: "block",
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                  }}
                >
                  <div style={{ color: isActive ? C_PAL.accent : C_PAL.ink, opacity: isActive ? 1 : 0.6 }}>
                    <Waveform seed={i + 5} color="currentColor" progress={progresses[i] || 0} height={22} />
                  </div>
                </button>
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
                    {currentLabel}
                  </button>
                </span>
              </>
            )}
            <audio
              {...bind(i)}
              aria-label={t.audioLabel}
              preload="metadata"
              src={t.audioSrc}
              style={{ display: "none" }}
            />
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
  const isTablet = useMediaQuery("(max-width: 980px)");
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section style={{ padding: isMobile ? "56px 16px" : isTablet ? "72px 24px" : "96px 40px", borderBottom: `1px solid ${C_PAL.line}` }}>
      <C_Label n="02" title="About" sub="makotyo" />
      <div style={{ display: "grid", gridTemplateColumns: isTablet ? "1fr" : "1.5fr 1fr", gap: isMobile ? 28 : isTablet ? 40 : 64, alignItems: "start" }}>
        <p style={{
          fontSize: isMobile ? 15 : 17, lineHeight: isMobile ? 1.9 : 2, color: C_PAL.ink,
          maxWidth: 720, letterSpacing: 0,
          fontFamily: "'Noto Sans JP', sans-serif", fontWeight: 300,
          whiteSpace: "pre-line",
        }}>
          {EP.profile.longJa}
        </p>
        <div>
          {EP.profile.facts.map(([k, v], i) => (
            <div key={i} style={{
              display: "flex", justifyContent: "space-between", alignItems: "baseline",
              gap: 16,
              padding: "12px 0", borderBottom: `1px solid ${C_PAL.line}`,
              fontSize: 11, letterSpacing: 1.8,
            }}>
              <span style={{ color: C_PAL.dim, textTransform: "uppercase" }}>{k}</span>
              <span style={{ color: C_PAL.ink, textAlign: "right" }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function C_Buy() {
  const isTablet = useMediaQuery("(max-width: 980px)");
  const isMobile = useMediaQuery("(max-width: 720px)");
  return (
    <section id="buy" style={{ padding: isMobile ? "56px 16px 32px" : isTablet ? "72px 24px 36px" : "96px 40px 40px" }}>
      <C_Label n="03" title="Links" />

      <div style={{ maxWidth: 880, marginBottom: isMobile ? 40 : 64 }}>
        {EP.links.map((l, i) => (
          <a key={i} href={l.url} target="_blank" rel="noreferrer noopener" style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "32px minmax(0, 1fr) 16px" : "40px 1fr auto 20px",
            alignItems: isMobile ? "start" : "center", gap: isMobile ? 12 : 20,
            padding: isMobile ? "18px 0" : "22px 0",
            borderTop: `1px solid ${C_PAL.line}`,
            marginTop: i === 0 ? 0 : -1,
            textDecoration: "none",
            color: C_PAL.ink,
          }}>
            <span style={{ fontSize: 10, letterSpacing: 2, color: C_PAL.sub }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{
              fontSize: isMobile ? 18 : 22, letterSpacing: 0.5,
              color: l.primary ? C_PAL.accent : C_PAL.ink,
            }}>
              {l.label}
            </span>
            {!isMobile && <span style={{ fontSize: 11, color: C_PAL.dim, letterSpacing: 1.5 }}>{l.note}</span>}
            <Icon.ext size={12} />
            {isMobile && (
              <span style={{ gridColumn: "2 / 4", fontSize: 10, color: C_PAL.dim, letterSpacing: 1.2 }}>
                {l.note}
              </span>
            )}
          </a>
        ))}
        <div style={{ borderTop: `1px solid ${C_PAL.line}` }} />
      </div>

      <div style={{
        display: "flex", justifyContent: "space-between", flexDirection: isMobile ? "column" : "row",
        gap: isMobile ? 10 : 16,
        paddingTop: 24, borderTop: `1px solid ${C_PAL.line}`,
        fontSize: 10, letterSpacing: 2, color: C_PAL.sub,
      }}>
        <span>© 2026 MAKOTYO — ALL RIGHTS RESERVED</span>
      </div>
    </section>
  );
}

function VariantC() {
  const [clockSyncKey, setClockSyncKey] = React.useState(0);
  return (
    <div style={{
      background: C_PAL.bg,
      color: C_PAL.ink,
      minHeight: "100vh",
      fontFamily: "'JetBrains Mono', monospace",
    }}>
      <C_TopBar syncKey={clockSyncKey} />
      <C_Hero />
      <C_Tracks onPlaybackStart={() => setClockSyncKey((prev) => prev + 1)} />
      <C_Profile />
      <C_Buy />
    </div>
  );
}

window.VariantC = VariantC;
