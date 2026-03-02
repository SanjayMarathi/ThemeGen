import { useMemo, useState } from 'react'

const harmonyModes = {
    Complementary: 2,
    Triadic: 3,
    Tetradic: 4,
    Monochromatic: 5,
}

function hslToHex(hue, saturation, lightness) {
    const s = saturation / 100
    const l = lightness / 100
    const k = (value) => (value + hue / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (value) => l - a * Math.max(-1, Math.min(k(value) - 3, Math.min(9 - k(value), 1)))
    const toHex = (value) => Math.round(255 * value).toString(16).padStart(2, '0')
    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`.toUpperCase()
}

function generatePalette(mode, baseHue) {
    const colorCount = harmonyModes[mode]
    if (mode === 'Monochromatic') {
        return Array.from({ length: colorCount }, (_, index) => {
            const lightness = 30 + index * 12
            return hslToHex(baseHue, 58, Math.min(lightness, 90))
        })
    }

    const step = Math.floor(360 / colorCount)
    return Array.from({ length: colorCount }, (_, index) => hslToHex((baseHue + index * step) % 360, 46, 50))
}

export default function App() {
    const [mode, setMode] = useState('Complementary')
    const [baseHue, setBaseHue] = useState(173)

    const palette = useMemo(() => generatePalette(mode, baseHue), [mode, baseHue])

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900">
            <section className="bg-gradient-to-br from-teal-500 to-teal-300">
                <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-2 md:items-center">
                    <div>
                        <p className="mb-4 text-sm font-medium text-white/80">Colors &gt; Color wheel</p>
                        <h1 className="mb-4 text-5xl font-bold tracking-tight text-white">Color wheel</h1>
                        <p className="max-w-md text-2xl leading-relaxed text-white/90">
                            Generate simple color palettes and design system starting points.
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <div className="mx-auto mb-6 aspect-square w-full max-w-sm rounded-full border-[14px] border-slate-200 bg-[conic-gradient(red,yellow,lime,aqua,blue,magenta,red)]" />

                        <label className="mb-2 block text-sm font-medium text-slate-700">Palette mode</label>
                        <select
                            className="mb-4 w-full rounded-md border border-slate-300 bg-white px-3 py-2 outline-none ring-violet-500 focus:ring-2"
                            value={mode}
                            onChange={(event) => setMode(event.target.value)}
                        >
                            {Object.keys(harmonyModes).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>

                        <label className="mb-2 block text-sm font-medium text-slate-700">Base hue: {baseHue}</label>
                        <input
                            type="range"
                            min="0"
                            max="359"
                            value={baseHue}
                            onChange={(event) => setBaseHue(Number(event.target.value))}
                            className="mb-5 w-full accent-violet-600"
                        />

                        <div className="overflow-hidden rounded-md border border-slate-200">
                            <div className="grid" style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}>
                                {palette.map((color) => (
                                    <div key={color} className="h-16" style={{ backgroundColor: color }} />
                                ))}
                            </div>
                            <div className="grid bg-white text-center text-xs text-slate-600" style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}>
                                {palette.map((color) => (
                                    <p key={`${color}-label`} className="py-2 font-medium">
                                        {color}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 py-14">
                <h2 className="mb-4 text-4xl font-semibold">Color theory and design system starter</h2>
                <p className="max-w-3xl text-lg leading-8 text-slate-700">
                    Pick a harmony mode, adjust hue, and use the generated swatches as your brand primary and accent tokens.
                    This is a minimal frontend baseline that can be expanded with export, copy, and accessibility checks.
                </p>
            </section>
        </main>
    )
}