const { useState, useEffect, useMemo } = React;

/** ---------- Utilities ---------- */
function useLocalState(key, initial) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(state)); } catch {}
  }, [key, state]);
  return [state, setState];
}

function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function Card({ children, className="" }) {
  return (
    <div className={`rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}>
      <div className="p-4">{children}</div>
    </div>
  );
}

/** ---------- Data: Exercises (from your content) ---------- */
const EXERCISES = [
  // Tailbone (Coccyx)
  {
    id: "pelvic-tilt",
    name: "Pelvic Tilts",
    category: "Tailbone",
    defaultDuration: 45,
    blurb: "Helps stretch lower back and strengthen core.",
    steps: [
      "Lie on your back with knees bent, feet flat.",
      "Tighten abs, press lower back into floor for 3–4s.",
      "Release and repeat 10–15 times."
    ]
  },
  {
    id: "child-pose",
    name: "Child’s Pose",
    category: "Tailbone",
    defaultDuration: 30,
    blurb: "Great stretch for the back and hips.",
    steps: [
      "On hands and knees, sit back onto heels, arms forward.",
      "Hold 30s, breathe slowly; repeat 3×."
    ]
  },
  {
    id: "coccyx-massage",
    name: "Coccyx Self-Massage",
    category: "Tailbone",
    defaultDuration: 60,
    blurb: "Gentle pressure around tailbone to release tension.",
    steps: [
      "Lie on your side.",
      "Use gentle circular motions around tailbone area.",
      "Stop if painful or uncomfortable."
    ]
  },
  // General Back
  {
    id: "cat-cow",
    name: "Cat–Cow",
    category: "Back",
    defaultDuration: 60,
    blurb: "Improves flexibility and relieves spinal stiffness.",
    steps: [
      "On all fours.",
      "Arch (Cow) then round (Cat) with breath.",
      "Repeat 10–15 times."
    ]
  },
  {
    id: "bridge",
    name: "Bridge Pose",
    category: "Back",
    defaultDuration: 45,
    blurb: "Strengthens glutes, hamstrings, and lower back.",
    steps: [
      "Lie on back, knees bent, feet flat.",
      "Push through heels to lift hips; hold 3–5s.",
      "Lower with control; repeat 10–15 times."
    ]
  },
  {
    id: "knee-to-chest",
    name: "Knee to Chest",
    category: "Back",
    defaultDuration: 30,
    blurb: "Stretches lower back and eases pressure.",
    steps: [
      "Lie on back; pull one knee to chest 20–30s.",
      "Switch sides; repeat."
    ]
  },
  {
    id: "bird-dog",
    name: "Bird-Dog",
    category: "Back",
    defaultDuration: 45,
    blurb: "Improves stability; strengthens back.",
    steps: [
      "On hands and knees, extend opposite arm & leg.",
      "Hold 3–5s; alternate sides for 10–15 reps."
    ]
  },
  // Core Strength
  {
    id: "plank",
    name: "Plank",
    category: "Core",
    defaultDuration: 20,
    blurb: "Strengthens core and spine stabilizers.",
    steps: [
      "On elbows or hands, body in straight line.",
      "Engage core; start 15–20s and increase."
    ]
  },
  {
    id: "side-plank",
    name: "Side Plank",
    category: "Core",
    defaultDuration: 20,
    blurb: "Strengthens obliques; supports spine.",
    steps: [
      "Lie on side; lift hips to straight line.",
      "Hold 15–20s; progress gradually."
    ]
  }
];

/** ---------- GIF Map ---------- */
function useGifMap() {
  const [map, setMap] = useLocalState("bt_gif_map", {
    // paste real GIF URLs later in Settings
    "pelvic-tilt": "",
    "child-pose": "",
    "coccyx-massage": "",
    "cat-cow": "",
    "bridge": "",
    "knee-to-chest": "",
    "bird-dog": "",
    "plank": "",
    "side-plank": ""
  });
  const setOne = (id, url) => setMap({ ...(map || {}), [id]: url });
  return { map: map || {}, setOne };
}

function Gif({ src, alt }) {
  if (!src) {
    return (
      <div className="w-24 h-24 rounded-xl border bg-gray-100 flex items-center justify-center text-[10px] text-gray-500">
        GIF
      </div>
    );
  }
  return (
    <img src={src} alt={alt} className="w-24 h-24 rounded-xl object-cover border" loading="lazy" />
  );
}

/** ---------- Root App ---------- */
function App() {
  const [tab, setTab] = useLocalState("bt_tab", "home");
  return (
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <header className="px-4 pt-10 pb-4 bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
        <div className="text-2xl font-bold flex items-center gap-2">
          Back & Tailbone Care <span className="text-gray-400 text-lg"></span>
        </div>
        <div className="text-sm text-gray-500">PWA • Internet GIFs • Daily plan</div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        {tab === "home" && <HomeTab onStartPlan={() => setTab("plan")} />}
        {tab === "exercises" && <ExercisesTab />}
        {tab === "plan" && <PlanTab />}
        {tab === "tips" && <TipsTab />}
        {tab === "track" && <TrackTab />}
        {tab === "settings" && <SettingsTab />}
      </main>

      <nav className="flex justify-around border-t bg-white py-1.5">
        {["home","exercises","plan","tips","track","settings"].map(id => (
          <button key={id}
            onClick={() => setTab(id)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 text-xs ${tab === id ? "text-blue-600" : "text-gray-500"}`}>
            <span className="text-lg">
              {id==="home" && "🏠"}
              {id==="exercises" && "🏋️"}
              {id==="plan" && "🗓️"}
              {id==="tips" && "💡"}
              {id==="track" && "📈"}
              {id==="settings" && "⚙️"}
            </span>
            <span className="capitalize">{id}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

/** ---------- Home ---------- */
function HomeTab({ onStartPlan }) {
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-3">
          <div className="text-blue-600 text-xl">⏰</div>
          <div>
            <div className="font-semibold">Today’s Focus</div>
            <div className="text-sm text-gray-600">Gentle mobility • Cushion sitting • Posture checks</div>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center gap-3">
          <div className="text-amber-500 text-xl">⚠️</div>
          <div className="text-sm text-gray-700">
            If you have new numbness/weakness, loss of bladder/bowel control, fever, or recent trauma, seek urgent care.
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold mb-1">Quick Start Plan</div>
              <div className="text-sm text-gray-600">Build and track today’s workout</div>
            </div>
            <button onClick={onStartPlan} className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm">Start</button>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold mb-1">Set Reminders</div>
              <div className="text-sm text-gray-600">Hourly posture breaks</div>
            </div>
            <ReminderToggler />
          </div>
        </Card>
      </div>
    </div>
  );
}

/** ---------- Exercises ---------- */
function ExercisesTab() {
  const [active, setActive] = useState(null);
  const [q, setQ] = useState("");
  const cats = ["All", "Tailbone", "Back", "Core"];
  const [cat, setCat] = useLocalState("bt_ex_cat", "All");
  const gifMap = useGifMap();

  const filtered = EXERCISES.filter((e) =>
    (cat === "All" || e.category === cat) &&
    (q.trim() === "" || e.name.toLowerCase().includes(q.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <div className="relative flex-1">
          <span className="absolute left-2 top-2.5 text-gray-400 text-sm">🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search exercises"
            className="w-full border rounded-xl pl-8 pr-3 py-2 text-sm"
          />
        </div>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="border rounded-xl px-3 py-2 text-sm"
        >
          {cats.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {filtered.map((ex) => (
        <Card key={ex.id}>
          <div className="flex items-center gap-4">
            <Gif src={gifMap.map[ex.id]} alt={ex.name} />
            <div className="flex-1">
              <div className="font-semibold">{ex.name}</div>
              <div className="text-xs text-gray-500">{ex.category}</div>
              <div className="text-sm text-gray-600">{ex.blurb}</div>
            </div>
            <button onClick={() => setActive(ex.id)} className="rounded-full border px-3 py-2 text-sm">
              Details
            </button>
          </div>
          {active === ex.id && (
            <div className="mt-4 border-t pt-3">
              <ExerciseDetails ex={ex} />
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}

function ExerciseDetails({ ex }) {
  const [time, setTime] = useState(ex.defaultDuration);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setTime((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);

  useEffect(() => {
    if (time === 0) setRunning(false);
  }, [time]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          {ex.steps.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
          <li><span className="font-medium">Stop if</span> pain is sharp, radiating, or causes numbness.</li>
        </ul>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div>
            <div className="text-xs text-gray-500">Timer</div>
            <div className="text-3xl font-semibold tabular-nums">{time}s</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setRunning(true)} className="rounded-full bg-blue-600 text-white p-2">▶️</button>
            <button onClick={() => setRunning(false)} className="rounded-full border p-2">⏸️</button>
            <button onClick={() => { setTime(ex.defaultDuration); setRunning(false); }} className="rounded-full border p-2">↩️</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ---------- Plan (today) ---------- */
function PlanTab() {
  const key = `bt_plan_${todayKey()}`;
  const [plan, setPlan] = useLocalState(key, []);
  const [sel, setSel] = useState(EXERCISES[0].id);
  const [dur, setDur] = useState(EXERCISES[0].defaultDuration);

  useEffect(() => {
    const found = EXERCISES.find((e) => e.id === sel);
    if (found) setDur(found.defaultDuration);
  }, [sel]);

  const add = () => {
    const ex = EXERCISES.find((e) => e.id === sel);
    if (!ex) return;
    const item = { id: `${sel}-${Date.now()}`, exId: sel, name: ex.name, duration: Number(dur), completed: false };
    setPlan([...(plan || []), item]);
  };

  const toggle = (id) => setPlan((p) => p.map((it) => (it.id === id ? { ...it, completed: !it.completed } : it)));
  const remove = (id) => setPlan((p) => p.filter((it) => it.id !== id));
  const reset = () => setPlan([]);

  const completed = (plan || []).filter((p) => p.completed).length;
  const total = (plan || []).length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
          <div className="md:col-span-2 grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-gray-500">Choose exercise</div>
              <select value={sel} onChange={(e) => setSel(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm">
                {EXERCISES.map((e) => (
                  <option key={e.id} value={e.id}>{e.name} • {e.category}</option>
                ))}
              </select>
            </div>
            <div>
              <div className="text-xs text-gray-500">Time (seconds)</div>
              <input type="number" value={dur} onChange={(e) => setDur(e.target.value)} className="w-full border rounded-xl px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={add} className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm">＋ Add to Today</button>
            <button onClick={reset} className="rounded-full border px-4 py-2 text-sm">⟲ Clear</button>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="font-semibold">Today’s Plan</div>
            <div className="text-xs text-gray-500">{todayKey()} • {total} items</div>
          </div>
          <ProgressCircle pct={pct} />
        </div>
        <div className="mt-3 space-y-2">
          {(plan || []).length === 0 ? (
            <div className="text-sm text-gray-500">No items yet. Add exercises above.</div>
          ) : (
            (plan || []).map((it) => (
              <div key={it.id} className="flex items-center justify-between p-3 rounded-xl border">
                <div>
                  <div className="font-medium">{it.name}</div>
                  <div className="text-xs text-gray-500">{it.duration}s</div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggle(it.id)} className="rounded-full bg-emerald-600 text-white p-2">✔</button>
                  <button onClick={() => remove(it.id)} className="rounded-full border p-2">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      <Card>
        <div className="text-xs text-gray-600">
          This plan is saved locally for <b>today</b>. Tomorrow starts fresh.
        </div>
      </Card>
    </div>
  );
}

function ProgressCircle({ pct }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={r} stroke="#e5e7eb" strokeWidth="8" fill="none" />
      <circle cx="36" cy="36" r={r} stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round" />
      <text x="36" y="40" textAnchor="middle" fontSize="14" className="font-semibold">{pct}%</text>
    </svg>
  );
}

/** ---------- Tips ---------- */
function TipsTab() {
  return (
    <div className="space-y-3">
      <Card>
        <div className="flex items-start gap-3">
          <div className="text-emerald-600 text-xl">✔️</div>
          <div>
            <div className="font-semibold">Do</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-1">
              <li>Use supportive cushions with a tailbone cut-out.</li>
              <li>Maintain straight posture; consider a lumbar pillow.</li>
              <li>Stand and walk every 30 minutes.</li>
              <li>Stretch regularly to relieve tight muscles.</li>
              <li>Sleep on a firm, supportive mattress.</li>
              <li>Use heat to relax muscles; ice in the first 48 hours of acute pain.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="flex items-start gap-3">
          <div className="text-rose-600 text-xl">❌</div>
          <div>
            <div className="font-semibold">Don’t</div>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mt-1">
              <li>Avoid long sitting without breaks or cushion support.</li>
              <li>Don’t overstretch aggressively; listen to your body.</li>
              <li>Avoid high heels; they strain your back.</li>
              <li>Don’t lift with a rounded back; use your legs.</li>
              <li>Avoid twisting or sudden movements during a flare.</li>
              <li>Don’t stay in one position too long.</li>
            </ul>
          </div>
        </div>
      </Card>

      <Card>
        <div className="text-sm text-gray-700">
          <div className="font-semibold mb-1">Tips for Relief</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Maintain a healthy weight to reduce spine pressure.</li>
            <li>Make ergonomic adjustments: chair with lumbar support; feet flat.</li>
            <li>Stay hydrated to reduce stiffness.</li>
            <li>Sleep with proper support: pillow between knees (side) or under knees (back).</li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="text-sm text-gray-700">
          <div className="font-semibold mb-1">What to Eat</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Anti-inflammatory: turmeric, ginger, green tea, berries, nuts, seeds.</li>
            <li>Bone & joint health: calcium (dairy/greens/fortified) + vitamin D (salmon, eggs, fortified cereals).</li>
            <li>Magnesium: leafy greens, bananas, nuts, seeds, whole grains.</li>
            <li>Omega‑3s: fatty fish, flax, chia, walnuts, olive oil.</li>
          </ul>
          <div className="font-semibold mt-3 mb-1">What to Avoid</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Processed foods, refined carbs, sugary snacks.</li>
            <li>Excess salt; fried and fatty foods.</li>
            <li>Excess dairy if you’re sensitive.</li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="text-sm text-gray-700 space-y-1">
          <div className="font-semibold">Other Recommendations</div>
          <ul className="list-disc pl-5 space-y-1">
            <li>Posture focus while sitting, standing, and walking.</li>
            <li>Sitting: use tailbone cut‑out cushion or lumbar pillow.</li>
            <li>Standing/Walking: spine tall; shift weight periodically.</li>
            <li>Sleep: pillow under knees (back) or between knees (side).</li>
            <li>Hydration & nutrition as above.</li>
            <li>Foam rolling for lower back/thighs after sessions.</li>
            <li>Massage can relieve tightness around lower back and tailbone.</li>
            <li>Yoga (back & hips focus) once weekly to improve flexibility.</li>
          </ul>
        </div>
      </Card>

      <Card>
        <div className="text-xs text-gray-600">
          Educational content only; not a substitute for medical care. Seek professional guidance for diagnosis or medications.
        </div>
      </Card>
    </div>
  );
}

/** ---------- Track ---------- */
function TrackTab() {
  const [entries, setEntries] = useLocalState("bt_entries", []);
  const [pain, setPain] = useState(3);
  const [sit, setSit] = useState(20);

  const add = () => {
    const e = { date: new Date().toISOString(), pain: Number(pain), sit: Number(sit) };
    setEntries([...(entries || []), e]);
  };

  const summary = useMemo(() => {
    if (!entries || entries.length === 0) return null;
    const avgPain = (entries.reduce((a, b) => a + b.pain, 0) / entries.length).toFixed(1);
    const avgSit = Math.round(entries.reduce((a, b) => a + b.sit, 0) / entries.length);
    return { avgPain, avgSit };
  }, [entries]);

  return (
    <div className="space-y-4">
      <Card>
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <div className="text-sm font-medium">Pain (0–10)</div>
            <input type="range" min={0} max={10} value={pain} onChange={(e) => setPain(e.target.value)} className="w-full" />
            <div className="text-xs text-gray-500">Current: {pain}</div>
          </div>
          <div>
            <div className="text-sm font-medium">Sitting tolerance (min)</div>
            <input type="number" value={sit} onChange={(e) => setSit(e.target.value)} className="w-full border rounded px-2 py-1" />
          </div>
          <div className="col-span-2">
            <button onClick={add} className="w-full rounded-full bg-blue-600 text-white py-2">Add Entry</button>
          </div>
        </div>
      </Card>

      <Card>
        {(!entries || entries.length === 0) ? (
          <div className="text-sm text-gray-500">No data yet. Add your first entry above.</div>
        ) : (
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="flex-1 p-3 rounded-xl bg-blue-50 border border-blue-100 text-sm">
                <div className="text-xs text-gray-500">Average Pain</div>
                <div className="text-xl font-semibold">{summary.avgPain}</div>
              </div>
              <div className="flex-1 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-sm">
                <div className="text-xs text-gray-500">Avg Sitting (min)</div>
                <div className="text-xl font-semibold">{summary.avgSit}</div>
              </div>
            </div>
            <div className="text-xs text-gray-500">Entries: {entries.length}</div>
          </div>
        )}
      </Card>
    </div>
  );
}

/** ---------- Settings (reminders + GIF manager) ---------- */
function SettingsTab() {
  const { map, setOne } = useGifMap();
  const [temp, setTemp] = useState(map);

  useEffect(() => setTemp(map), [map]);

  const save = () => {
    Object.entries(temp || {}).forEach(([id, url]) => setOne(id, url));
    alert("Saved GIF URLs.");
  };

  return (
    <div className="space-y-3">
      <Card>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Hourly posture reminder</div>
            <div className="text-sm text-gray-600">In-app nudges while this app is open</div>
          </div>
          <ReminderToggler />
        </div>
      </Card>

      <Card>
        <div className="text-sm font-semibold mb-2">Exercise GIFs (paste internet URLs)</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {EXERCISES.map((e) => (
            <div key={e.id} className="p-3 rounded-xl border">
              <div className="text-sm font-medium mb-1">{e.name}</div>
              <input
                value={temp?.[e.id] || ""}
                onChange={(ev) => setTemp({ ...(temp || {}), [e.id]: ev.target.value })}
                placeholder="https://.../your-exercise.gif"
                className="w-full border rounded-xl px-3 py-2 text-xs"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-3">
          <button onClick={save} className="rounded-full bg-blue-600 text-white px-4 py-2 text-sm">Save GIF URLs</button>
        </div>
        <div className="text-xs text-gray-500 mt-2">Tip: Use clear, looped GIFs from reputable sources. Your links are stored locally.</div>
      </Card>

      <Card>
        <div className="text-xs text-gray-600">
          Background notifications require installing as a PWA/APK. This version stores data locally on your device.
        </div>
      </Card>
    </div>
  );
}

function ReminderToggler() {
  const [on, setOn] = useLocalState("bt_reminders", false);

  useEffect(() => {
    let intervalId;
    if (on) {
      intervalId = setInterval(() => {
        if (document.hasFocus()) {
          alert("Posture check: relax shoulders, neutral spine, feet flat. Take a 60s micro-break.");
        }
      }, 60 * 60 * 1000); // hourly
    }
    return () => intervalId && clearInterval(intervalId);
  }, [on]);

  return (
    <button onClick={() => setOn(!on)} className={`rounded-full px-4 py-2 text-sm ${on ? "bg-blue-600 text-white" : "border"}`}>
      🔔 {on ? "On" : "Off"}
    </button>
  );
}

/** ---------- Mount ---------- */
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
