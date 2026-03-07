import { useMemo, useState, useRef, useEffect } from "react";

const harmonyModes = {
  Complementary: 2,
  Triadic: 3,
  Tetradic: 4,
  Monochromatic: 5,
};

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  const k = (n) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);

  const f = (n) => {
    const color = l - a * Math.max(Math.min(k(n) - 3, 9 - k(n), 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };

  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function generatePalette(mode, baseHue) {
  let hues = [];

  if (mode === "Complementary") {
    hues = [baseHue, (baseHue + 180) % 360];
  }

  if (mode === "Triadic") {
    hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
  }

  if (mode === "Tetradic") {
    hues = [
      baseHue,
      (baseHue + 90) % 360,
      (baseHue + 180) % 360,
      (baseHue + 270) % 360,
    ];
  }

  if (mode === "Monochromatic") {
    return [
      hslToHex(baseHue, 70, 25),
      hslToHex(baseHue, 65, 35),
      hslToHex(baseHue, 60, 50),
      hslToHex(baseHue, 55, 65),
      hslToHex(baseHue, 50, 80),
    ];
  }

  const colors = hues.map((h) => hslToHex(h, 65, 55));

  while (colors.length < 5) {
    colors.push(colors[colors.length % hues.length]);
  }

  return colors;
}

export default function App() {
  const [mode, setMode] = useState("Complementary");
  const [baseHue, setBaseHue] = useState(210);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activePage, setActivePage] = useState("landing");

  const wheelRef = useRef(null);
  const [wheelRadius, setWheelRadius] = useState(100);

  useEffect(() => {
    const updateWheelRadius = () => {
      if (wheelRef.current) {
        setWheelRadius(wheelRef.current.offsetWidth / 2);
      }
    };
    updateWheelRadius();
    window.addEventListener("resize", updateWheelRadius);
    return () => window.removeEventListener("resize", updateWheelRadius);
  }, []);

  const palette = useMemo(() => generatePalette(mode, baseHue), [mode, baseHue]);

  const ui = {
    panel: isDarkMode ? "#121212" : "#FFFFFF",
    canvas: isDarkMode ? "#000000" : "#F3F4F6",
    text: isDarkMode ? "#FFFFFF" : "#111827",
    border: isDarkMode ? "#2D2D2D" : "#E5E7EB",
    input: isDarkMode ? "#1E1E1E" : "#F9FAFB",
  };

  const project = {
    primary: palette[0],
    secondary: palette[1],
    accent: palette[2],
    bg: isDarkMode ? "#0F172A" : "#FFFFFF",
    text: isDarkMode ? "#F8FAFC" : "#0F172A",
    card: isDarkMode ? "#1E293B" : "#F1F5F9",
  };

  const handleWheelClick = (e) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const angle = Math.atan2(y, x) * (180 / Math.PI);
    const hue = (angle + 360) % 360;

    setBaseHue(Math.round(hue));
  };

  const ringRadius = Math.max(0, wheelRadius - 20);
  const pointerRadius = (baseSaturation / 100) * ringRadius;
  const pointerAngleRad = ((baseHue - 90) * Math.PI) / 180;
  const pointerX = Math.cos(pointerAngleRad) * pointerRadius;
  const pointerY = Math.sin(pointerAngleRad) * pointerRadius;

  const exportConfig = () => {
    const data = {
      palette,
      tokens: project,
    };

    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Design System copied to clipboard");
  };

  return (
    <div
      className="flex h-screen w-full overflow-hidden"
      style={{ backgroundColor: ui.canvas, color: ui.text }}
    >
      {/* LEFT PANEL */}

      <aside
        className="w-80 flex flex-col border-r"
        style={{ backgroundColor: ui.panel, borderColor: ui.border }}
      >
        <div className="p-6 flex justify-between items-center">
          <h1 className="text-xl font-black">ThemeGen</h1>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 border rounded-full"
            style={{ borderColor: ui.border }}
          >
            {isDarkMode ? "🌙" : "☀️"}
          </button>
        </div>

        <div className="p-6 space-y-10">

          {/* COLOR WHEEL */}

          <div className="space-y-4">
            <label className="text-xs font-bold opacity-50">
              Select Hue
            </label>

            <div
              ref={wheelRef}
              onClick={handleWheelClick}
              className="relative aspect-square rounded-full cursor-crosshair border-4"
              style={{
                background:
                  "conic-gradient(red, yellow, lime, aqua, blue, magenta, red)",
                borderColor: ui.border,
              }}
            >
              {/* Markers for all palette colors */}
              {palette.map((color, idx) => {
                const colorCount = palette.length;
                const step = 360 / colorCount;
                const angle = (baseHue + idx * step) % 360;
                const rad = ((angle - 90) * Math.PI) / 180;
                const markerRadius = Math.max(12, (baseSaturation / 100) * ringRadius);
                const x = Math.cos(rad) * markerRadius;
                const y = Math.sin(rad) * markerRadius;
                return (
                  <div
                    key={color}
                    className="absolute w-6 h-6 border-4 rounded-full shadow-lg cursor-pointer"
                    style={{
                      left: `calc(50% + ${x}px - 12px)`,
                      top: `calc(50% + ${y}px - 12px)`,
                      backgroundColor: color,
                      borderColor: color === palette[0] ? "#000" : "#fff",
                      zIndex: color === palette[0] ? 2 : 1,
                    }}
                    title={color}
                    onClick={(e) => {
                      e.stopPropagation();
                      setBaseHue(angle);
                    }}
                  />
                );
              })}

              {/* Pointer indicator for current hue/saturation */}
              <div
                className="absolute w-5 h-5 bg-white border-2 border-black rounded-full pointer-events-none"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `translate(-50%, -50%) rotate(${baseHue}deg) translateY(-80px)`,
                }}
              />
            </div>
          </div>

          {/* MODE SELECT */}

          <div className="space-y-4">

            <label className="text-xs font-bold opacity-50">
              Harmony Mode
            </label>

            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full p-3 rounded-lg border"
              style={{
                backgroundColor: ui.input,
                borderColor: ui.border,
                color: ui.text,
              }}
            >
              {Object.keys(harmonyModes).map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            {/* PALETTE */}

            <div
              className="flex gap-2 p-4 border rounded-xl"
              style={{
                borderColor: ui.border,
                backgroundColor: ui.input,
              }}
            >
              {palette.map((c) => (
                <div
                  key={c}
                  onClick={() => navigator.clipboard.writeText(c)}
                  className="flex-1 h-8 rounded cursor-pointer"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <button
            onClick={exportConfig}
            className="w-full py-4 rounded-xl text-white font-bold"
            style={{ backgroundColor: project.primary }}
          >
            Export Design System
          </button>
        </div>
      </aside>

      {/* MAIN PREVIEW */}

      <main className="flex-1 flex flex-col p-12 overflow-hidden">

        {/* TABS */}

        <div className="flex gap-2 mb-8 self-center">
          {["landing", "dashboard", "settings"].map((p) => (
            <button
              key={p}
              onClick={() => setActivePage(p)}
              className="px-6 py-2 rounded-lg text-xs font-bold uppercase"
              style={{
                backgroundColor:
                  activePage === p ? project.primary : "transparent",
                color: activePage === p ? "#fff" : ui.text,
              }}
            >
              {p}
            </button>
          ))}
        </div>

        {/* APP FRAME */}

        <div
          className="flex-1 rounded-3xl border overflow-hidden"
          style={{
            backgroundColor: project.bg,
            borderColor: ui.border,
          }}
        >
          <div className="p-16 overflow-y-auto">

            {/* LANDING */}

            {activePage === "landing" && (
              <div className="space-y-10 max-w-4xl">

                <h2
                  className="text-6xl font-black"
                  style={{ color: project.text }}
                >
                  Your vision
                  <br />
                  <span style={{ color: project.primary }}>
                    perfectly colored
                  </span>
                </h2>

                <p
                  className="text-xl opacity-60"
                  style={{ color: project.text }}
                >
                  Build beautiful design systems instantly with the
                  ThemeGen color harmony generator.
                </p>

                <div className="flex gap-4">
                  <button
                    className="px-10 py-4 rounded-xl text-white font-bold"
                    style={{ backgroundColor: project.primary }}
                  >
                    Start Designing
                  </button>

                  <button
                    className="px-10 py-4 border-2 rounded-xl font-bold"
                    style={{
                      borderColor: project.primary,
                      color: project.primary,
                    }}
                  >
                    View Docs
                  </button>
                </div>
              </div>
            )}

            {/* DASHBOARD */}

            {activePage === "dashboard" && (

              <div className="space-y-12">

                <h2
                  className="text-4xl font-black"
                  style={{ color: project.text }}
                >
                  Project Analytics
                </h2>

                {/* STATS */}

                <div className="grid grid-cols-4 gap-8">

                  {[
                    { name: "Users", value: "12,430" },
                    { name: "Sessions", value: "48,200" },
                    { name: "Conversion", value: "8.2%" },
                    { name: "Revenue", value: "$92k" },
                  ].map((item) => (

                    <div
                      key={item.name}
                      className="p-8 rounded-2xl border"
                      style={{
                        backgroundColor: project.card,
                        borderColor: ui.border,
                      }}
                    >
                      <p className="opacity-50">{item.name}</p>

                      <p className="text-4xl font-black">
                        {item.value}
                      </p>

                      <div className="mt-4 h-2 bg-black/10 rounded">
                        <div
                          className="h-full rounded"
                          style={{
                            width: "70%",
                            backgroundColor: project.primary,
                          }}
                        />
                      </div>
                    </div>

                  ))}
                </div>

                {/* THEME PREVIEW */}

                <div
                  className="p-10 rounded-3xl border"
                  style={{
                    backgroundColor: project.card,
                    borderColor: ui.border,
                  }}
                >
                  <h3 className="text-2xl font-black mb-6">
                    Theme Preview
                  </h3>

                  <div className="grid grid-cols-5 gap-3">

                    {palette.map((c) => (
                      <div
                        key={c}
                        className="h-16 rounded"
                        style={{ backgroundColor: c }}
                      />
                    ))}

                  </div>

                </div>

              </div>
            )}

            {/* SETTINGS */}

            {activePage === "settings" && (

              <div className="space-y-8">

                <h2 className="text-4xl font-black">
                  Preferences
                </h2>

                {[
                  "System Appearance",
                  "Notifications",
                  "Auto Save Theme",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex justify-between p-6 rounded-xl"
                    style={{
                      backgroundColor: project.card,
                    }}
                  >
                    <span>{item}</span>

                    <div
                      className="w-12 h-6 rounded-full"
                      style={{ backgroundColor: project.primary }}
                    />
                  </div>

                ))}

              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}