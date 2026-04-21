// Shared data + primitives for all three variants
const EP = {
  artist: "makotyo",
  title: "Polished Flame",
  titleSub: "",
  bpm: 160,
  year: "2026",
  format: "5 tracks / EP",
  price: "name your price",
  tagline: "",
  taglineJa: "160の世界で、クラシックとサンプリングをビートに落とす。",
  description:
    "Chicago産のJuke / Footworkを軸に、クラシック音楽のフレーズや呼吸をサンプリングし、160BPMの網目に縫い込んだ5曲入りEP。静謐と衝動のあいだ。",
  descriptionEn:
    "A five-track EP weaving classical samples into the 160 BPM lattice of juke & footwork. Stillness meeting impulse.",
  influences: ["DJ Rashad", "Traxman", "Teklife", "classical phrasing"],
  tracks: [
    {
      n: "01",
      title: "Pootwork",
      len: "3:48",
      bpm: 160,
      sample: "sampling: Chopin — Nocturne op.9",
      audioFile: "pootwork_20260112_master.wav",
      audioLabel: "Pootwork preview",
    },
    {
      n: "02",
      title: "Scri",
      len: "4:12",
      bpm: 160,
      sample: "sampling: Ravel — Pavane",
      audioFile: "scriabin_foot.mp3",
      audioLabel: "Scri preview",
    },
    {
      n: "03",
      title: "Jureams",
      len: "4:37",
      bpm: 160,
      sample: "sampling: Debussy — Clair de Lune",
      audioFile: "Jureams.mp3",
      audioLabel: "Jureams preview",
    },
    {
      n: "04",
      title: "Salaam Foot",
      len: "5:02",
      bpm: 160,
      sample: "sampling: Bach — Partita no.2",
      audioFile: "Salaam Footwork.mp3",
      audioLabel: "Salaam Foot preview",
    },
    {
      n: "05",
      title: "Palcco",
      len: "2:57",
      bpm: 160,
      sample: "sampling: original",
      audioFile: "Palcco.mp3",
      audioLabel: "Palcco preview",
    },
  ],
  online: {
    label: "[藍-22] よっこらレコーズ",
    genre: "A03（音楽一般：テクノ・クラブ）",
    tags: ["DTM", "初参加", "エレクトロニカ"],
    note: "東京都在住。Breakbeats / Jazz / Footwork を軸に制作しています。今回は新作を1作品頒布します。試聴と詳細は下のリンクからどうぞ。",
  },
  links: [
    { label: "Bandcamp",    url: "#", primary: true,  note: "EP 試聴 / 購入 / DL" },
    { label: "SoundCloud",  url: "https://soundcloud.com/makotyo", primary: false, note: "@makotyo" },
    { label: "X / Twitter", url: "#", primary: false, note: "@makotyo" },
  ],
  profile: {
    short: "東京都在住。Breakbeats / Jazz / Footwork を軸に制作・活動しています。",
    longJa:
      "東京都在住。Breakbeats / Jazz / Footwork を軸に制作・活動しています。M3では [藍-22] よっこらレコーズ として参加し、ジャンルは A03（音楽一般：テクノ・クラブ）。今回は新作1作品を頒布します。ゆっくりしていってね！",
    facts: [
      ["booth",    "[藍-22] よっこらレコーズ"],
      ["genre",    "A03 / Techno · Club"],
      ["tags",     "DTM · 初参加 · エレクトロニカ"],
      ["link",     "soundcloud.com/makotyo"],
    ],
  },
  liner: [
    {
      n: "i.",
      head: "160の世界",
      body: "Juke / Footworkは160BPMの格子の上に、16分のスネアを撒く音楽だ。速さよりも、間(あいだ)の扱いが効く。",
    },
    {
      n: "ii.",
      head: "クラシックを食う",
      body: "ショパンやドビュッシーのフレーズを、呼吸ごと切り取って貼る。原曲の静けさが、キックの真下で別の時間を作る。",
    },
    {
      n: "iii.",
      head: "Polished Flame",
      body: "五曲は研ぎ澄まされた炎のスケッチ。それぞれの曲はひとつの灯。Footworkの足運びを、音の側から描く試み。",
    },
  ],
};

function toAudioUrl(filename) {
  return encodeURI(`./public/audio/${filename}`);
}

EP.tracks.forEach((track) => {
  track.audioSrc = toAudioUrl(track.audioFile);
});

// --- Inline icon set (geometric) ---
const Icon = {
  play: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="currentColor" aria-hidden>
      <path d="M6 4l14 8-14 8z" />
    </svg>
  ),
  pause: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="currentColor" aria-hidden>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||14} height={p.size||14} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M5 12h14M13 5l7 7-7 7" />
    </svg>
  ),
  ext: (p) => (
    <svg viewBox="0 0 24 24" width={p.size||12} height={p.size||12} fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
};

// --- Waveform (deterministic per seed) ---
function Waveform({ seed = 1, color = "currentColor", progress = 0, height = 40 }) {
  const n = 96;
  const bars = [];
  for (let i = 0; i < n; i++) {
    const t = (i + 1) * (seed * 0.7 + 3);
    const h =
      0.25 +
      0.35 * Math.abs(Math.sin(t * 0.41 + seed)) +
      0.4  * Math.abs(Math.sin(t * 0.11 + seed * 1.3));
    const played = i / n < progress;
    bars.push(
      <rect key={i}
        x={i * 3}
        y={(height - h * height) / 2}
        width="1.5"
        height={Math.max(1, h * height)}
        fill={color}
        opacity={played ? 1 : 0.28}
      />
    );
  }
  return (
    <svg viewBox={`0 0 ${n * 3} ${height}`} preserveAspectRatio="none" style={{ width: "100%", height, display: "block" }}>
      {bars}
    </svg>
  );
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "--:--";
  const totalSeconds = Math.round(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}

// --- Real audio player coordinator: keeps one preview playing at a time ---
function useAudioPlayer(trackCount) {
  const refs = React.useRef([]);
  const [active, setActive] = React.useState(null);
  const [progresses, setProgresses] = React.useState(() => Array(trackCount).fill(0));
  const [times, setTimes] = React.useState(() => Array.from({ length: trackCount }, () => ({
    current: 0,
    duration: NaN,
  })));

  React.useEffect(() => {
    refs.current = refs.current.slice(0, trackCount);
    setProgresses((prev) => {
      if (prev.length === trackCount) return prev;
      return Array.from({ length: trackCount }, (_, i) => prev[i] || 0);
    });
    setTimes((prev) => {
      if (prev.length === trackCount) return prev;
      return Array.from({ length: trackCount }, (_, i) => prev[i] || { current: 0, duration: NaN });
    });
  }, [trackCount]);

  const updateTimeState = (index, patch) => {
    setTimes((prev) => {
      const current = prev[index] || { current: 0, duration: NaN };
      const nextEntry = { ...current, ...patch };
      if (current.current === nextEntry.current && current.duration === nextEntry.duration) return prev;
      const next = [...prev];
      next[index] = nextEntry;
      return next;
    });
  };

  const bind = (index) => ({
    ref: (node) => {
      refs.current[index] = node;
    },
    onPlay: () => {
      refs.current.forEach((audio, i) => {
        if (i !== index && audio && !audio.paused) audio.pause();
      });
      setActive(index);
    },
    onPause: () => {
      setActive((prev) => (prev === index ? null : prev));
    },
    onEnded: () => {
      setActive((prev) => (prev === index ? null : prev));
      setProgresses((prev) => {
        const next = [...prev];
        next[index] = 0;
        return next;
      });
      updateTimeState(index, { current: 0 });
    },
    onLoadedMetadata: (e) => {
      updateTimeState(index, { duration: e.currentTarget.duration });
    },
    onTimeUpdate: (e) => {
      const audio = e.currentTarget;
      const nextProgress = audio.duration ? audio.currentTime / audio.duration : 0;
      setProgresses((prev) => {
        if (Math.abs((prev[index] || 0) - nextProgress) < 0.01) return prev;
        const next = [...prev];
        next[index] = nextProgress;
        return next;
      });
      updateTimeState(index, {
        current: audio.currentTime,
        duration: audio.duration,
      });
    },
  });

  const toggle = (index) => {
    const audio = refs.current[index];
    if (!audio) return;
    if (audio.paused) {
      const playResult = audio.play();
      if (playResult && typeof playResult.catch === "function") {
        playResult.catch(() => {});
      }
      return;
    }
    audio.pause();
  };

  const seek = (index, progress) => {
    const audio = refs.current[index];
    if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) return;
    const clamped = Math.max(0, Math.min(1, progress));
    audio.currentTime = audio.duration * clamped;
    updateTimeState(index, {
      current: audio.currentTime,
      duration: audio.duration,
    });
    setProgresses((prev) => {
      const next = [...prev];
      next[index] = clamped;
      return next;
    });
  };

  return {
    active,
    progresses,
    times,
    toggle,
    seek,
    bind,
  };
}

// --- 160 BPM pulse (global clock for Juke time) ---
// Returns beat index, 16th-note step (0..15 within bar), and sub-beat progress.
function useBpmClock(bpm = 160) {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    let raf, start = performance.now();
    const tick = (now) => {
      setT((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const beatsPerSec = bpm / 60;
  const stepsPerSec = beatsPerSec * 4;
  const beat = Math.floor(t * beatsPerSec);
  const step = Math.floor(t * stepsPerSec) % 16;
  const sub = (t * beatsPerSec) % 1;
  return { t, beat, step, sub };
}

// --- Jacket art (monochrome grid-noise cover) ---
function JacketPlaceholder({ label = "", palette = "dark" }) {
  const bg = palette === "light" ? "#efece5" : "#16130f";
  const fg = palette === "light" ? "#16130f" : "#efece5";
  const dots = [];
  // deterministic noise grid
  for (let y = 0; y < 40; y++) {
    for (let x = 0; x < 40; x++) {
      const s = Math.sin(x * 12.9 + y * 78.2) * 43758.5453;
      const n = s - Math.floor(s);
      if (n > 0.86) {
        dots.push(
          <rect key={`${x}-${y}`} x={x * 10} y={y * 10} width="10" height="10" fill={fg} opacity={0.06 + n * 0.25} />
        );
      }
    }
  }
  return (
    <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%", display: "block" }}>
      <rect width="400" height="400" fill={bg} />
      {dots}
      {/* Tight frame */}
      <rect x="14" y="14" width="372" height="372" fill="none" stroke={fg} strokeOpacity="0.15" />
      {/* Center mark: polished / flame */}
      <g fill="none" stroke={fg} strokeOpacity="0.85" strokeWidth="1.25">
        <circle cx="160" cy="200" r="42" />
        <circle cx="240" cy="200" r="42" />
      </g>
      <text x="160" y="204" fill={fg} fontFamily="JetBrains Mono, monospace" fontSize="10" textAnchor="middle" letterSpacing="2">POLISHED</text>
      <text x="240" y="204" fill={fg} fontFamily="JetBrains Mono, monospace" fontSize="11" textAnchor="middle" letterSpacing="2">FLAME</text>
      <text x="20" y="30" fill={fg} fontFamily="JetBrains Mono, monospace" fontSize="10" opacity="0.55" letterSpacing="1.5">makotyo</text>
      {label ? (
        <text x="380" y="386" fill={fg} fontFamily="JetBrains Mono, monospace" fontSize="9" textAnchor="end" opacity="0.45" letterSpacing="1.5">[ {label} ]</text>
      ) : null}
    </svg>
  );
}

// --- Section scaffolding helper ---
function Labelled({ children, n, label, style }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 12, ...style }}>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, opacity: 0.55, letterSpacing: 2 }}>
        {n}
      </span>
      <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, opacity: 0.85, letterSpacing: 2, textTransform: "uppercase" }}>
        {label}
      </span>
      <span style={{ flex: 1, borderBottom: "1px solid currentColor", opacity: 0.15 }} />
      {children}
    </div>
  );
}

Object.assign(window, {
  EP,
  Icon,
  Waveform,
  formatTime,
  useAudioPlayer,
  useBpmClock,
  JacketPlaceholder,
  Labelled,
});
