// Long-form body for /projects/snake-nn. Rendered by app/projects/[slug]/page.js
// in place of the generic sections, so the header, stats, lead screenshot,
// sidebar and related projects stay shared with every other case study.
//
// Charts and diagrams are inline SVG; the code block is highlighted with a tiny
// tokenizer below. No chart, maths or highlighting libraries.

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, TriangleAlert } from "lucide-react";
import Screenshot from "@/components/ui/Screenshot";

const BLUE = "#60a5fa"; // blue-400
const PURPLE = "#a855f7"; // purple-500

/* ------------------------------------------------------------------ */
/* Shared building blocks                                              */
/* ------------------------------------------------------------------ */

function Section({ id, index, title, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-28">
      <div className="flex items-baseline gap-4 mb-6">
        <span className="font-mono text-sm text-blue-400">{String(index).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="text-2xl md:text-3xl font-bold text-white tracking-tight">
          {title}
        </h2>
      </div>
      <div className="space-y-6 text-neutral-300 text-lg leading-relaxed">{children}</div>
    </section>
  );
}

function Bullets({ items }) {
  return (
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Lead({ label, children }) {
  return (
    <>
      <strong className="font-semibold text-white">{label}:</strong> {children}
    </>
  );
}

function Panel({ className = "", children }) {
  return (
    <div className={`rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm ${className}`}>{children}</div>
  );
}

// Key/value or multi-column table. Key/value tables wrap; wide ones pass a
// `minWidth` and scroll sideways on narrow screens. The wrapper is focusable
// so keyboard users can scroll it too.
function DataTable({ label, columns, rows, minWidth = "" }) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className="overflow-x-auto rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
    >
      <table className={`w-full text-left text-[15px] ${minWidth}`}>
        <caption className="sr-only">{label}</caption>
        <thead>
          <tr className="border-b border-neutral-800 bg-neutral-950/40">
            {columns.map((col) => (
              <th
                key={col}
                scope="col"
                className="px-4 sm:px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 whitespace-nowrap"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(([head, ...cells]) => (
            <tr key={head} className="border-t border-neutral-800/70 first:border-t-0 hover:bg-neutral-800/30 transition-colors">
              <th scope="row" className="px-4 sm:px-5 py-3.5 align-top font-medium text-neutral-100 sm:whitespace-nowrap">
                {head}
              </th>
              {cells.map((cell, i) => (
                <td key={i} className="px-4 sm:px-5 py-3.5 align-top text-neutral-300 leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Mono({ children }) {
  return <span className="font-mono text-cyan-300">{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Architecture diagram: 11 -> 64 -> 3                                 */
/* ------------------------------------------------------------------ */

const INPUT_GROUPS = [
  { label: "Danger", n: 3 },
  { label: "Heading", n: 4 },
  { label: "Food", n: 4 },
];
const OUTPUTS = ["Straight", "Turn right", "Turn left"];

// Inputs sit 28px apart, with an extra 16px between the three groups.
const GROUP_LAYOUT = INPUT_GROUPS.map((g, gi) => {
  const before = INPUT_GROUPS.slice(0, gi).reduce((sum, prev) => sum + prev.n, 0);
  const start = 72 + before * 28 + gi * 16;
  return { ...g, ys: Array.from({ length: g.n }, (_, i) => start + i * 28) };
});

function ArchitectureDiagram() {
  const W = 470;
  const H = 430;
  const X = { input: 160, hidden: 270, output: 370 };
  const groups = GROUP_LAYOUT;
  const inputs = groups.flatMap((g) => g.ys);

  // Hidden layer: 6 + 6 of the 64 neurons, split by an ellipsis.
  const hidden = [...Array.from({ length: 6 }, (_, i) => 72 + i * 26), ...Array.from({ length: 6 }, (_, i) => 254 + i * 26)];
  const outputs = [172, 228, 284];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="snn-arch-title snn-arch-desc"
      className="w-full h-auto min-w-[20rem]"
    >
      <title id="snn-arch-title">Network architecture: 11 inputs, 64 hidden neurons, 3 outputs</title>
      <desc id="snn-arch-desc">
        Eleven input signals in three groups (danger 3, heading 4, food 4) connect to 64 ReLU hidden neurons, which connect to
        three Q-value outputs: straight, turn right and turn left. 963 weights in total.
      </desc>
      <defs>
        <linearGradient id="snn-edge" gradientUnits="userSpaceOnUse" x1={X.input} y1="0" x2={X.output} y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor={PURPLE} />
        </linearGradient>
        <radialGradient id="snn-glow">
          <stop offset="0" stopColor={PURPLE} stopOpacity="0.45" />
          <stop offset="1" stopColor={PURPLE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Column headers */}
      {[
        ["Input", "11", X.input],
        ["Hidden", "64 · ReLU", X.hidden],
        ["Output", "3", X.output],
      ].map(([name, size, x]) => (
        <text key={name} x={x} y="22" textAnchor="middle" fontSize="12">
          <tspan className="fill-neutral-300">{name}</tspan>
          <tspan x={x} dy="16" className="fill-neutral-500 font-mono" fontSize="11">
            {size}
          </tspan>
        </text>
      ))}

      {/* Edges */}
      <g stroke="url(#snn-edge)" strokeWidth="0.75">
        {inputs.map((iy) =>
          hidden.map((hy) => <line key={`${iy}-${hy}`} x1={X.input} y1={iy} x2={X.hidden} y2={hy} strokeOpacity="0.16" />)
        )}
        {hidden.map((hy) =>
          outputs.map((oy) => <line key={`${hy}-${oy}`} x1={X.hidden} y1={hy} x2={X.output} y2={oy} strokeOpacity="0.32" />)
        )}
      </g>

      {/* Input groups */}
      {groups.map((g) => {
        const top = g.ys[0];
        const bottom = g.ys[g.ys.length - 1];
        const mid = (top + bottom) / 2;
        return (
          <g key={g.label}>
            <line x1="140" y1={top - 8} x2="140" y2={bottom + 8} className="stroke-neutral-700" strokeWidth="1" />
            <text x="128" y={mid - 2} textAnchor="end" className="fill-neutral-200" fontSize="14">
              {g.label}
            </text>
            <text x="128" y={mid + 15} textAnchor="end" className="fill-neutral-500 font-mono" fontSize="11">
              {g.n} signals
            </text>
            {g.ys.map((iy) => (
              <circle key={iy} cx={X.input} cy={iy} r="6" fill="#0a0a0a" stroke={BLUE} strokeWidth="1.75" />
            ))}
          </g>
        );
      })}

      {/* Hidden neurons */}
      {hidden.map((hy) => (
        <circle key={hy} cx={X.hidden} cy={hy} r="4.5" fill="#c4b5fd" fillOpacity="0.85" />
      ))}
      {[220, 228, 236].map((dy) => (
        <circle key={dy} cx={X.hidden} cy={dy} r="1.6" className="fill-neutral-500" />
      ))}

      {/* Outputs */}
      {outputs.map((oy, i) => (
        <g key={oy}>
          <circle cx={X.output} cy={oy} r="18" fill="url(#snn-glow)" />
          <circle cx={X.output} cy={oy} r="9" fill="#0a0a0a" stroke={PURPLE} strokeWidth="2" />
          <text x={X.output + 18} y={oy - 1} className="fill-neutral-100" fontSize="13">
            {OUTPUTS[i]}
          </text>
          <text x={X.output + 18} y={oy + 14} className="fill-neutral-500 font-mono" fontSize="11">
            Q-value
          </text>
        </g>
      ))}

      <text x={W / 2} y={H - 10} textAnchor="middle" className="fill-neutral-400 font-mono" fontSize="12">
        11×64 + 64 + 64×3 + 3 = 963 weights
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Training curve                                                      */
/* ------------------------------------------------------------------ */

const CURVE = [
  { game: 25, avg: 0.1 },
  { game: 75, avg: 0.6 },
  { game: 100, avg: 8.8 },
  { game: 125, avg: 25.9 },
  { game: 250, avg: 31.7 },
  { game: 400, avg: 30.0 },
];
const EXPLORATION_ENDS = 90;

function ResultsChart() {
  const W = 600;
  const H = 300;
  const m = { t: 24, r: 24, b: 44, l: 44 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const xMax = 400;
  const yMax = 35;
  const x = (g) => m.l + (g / xMax) * pw;
  const y = (v) => m.t + ph - (v / yMax) * ph;
  const base = m.t + ph;

  const line = CURVE.map((p, i) => `${i ? "L" : "M"}${x(p.game).toFixed(1)},${y(p.avg).toFixed(1)}`).join(" ");
  const area = `${line} L${x(CURVE.at(-1).game)},${base} L${x(CURVE[0].game)},${base} Z`;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-labelledby="snn-chart-title snn-chart-desc"
      className="w-full h-auto min-w-[30rem]"
    >
      <title id="snn-chart-title">Average score over the last 25 games during training</title>
      <desc id="snn-chart-desc">
        {`Line chart. ${CURVE.map((p) => `Game ${p.game}: ${p.avg.toFixed(1)}`).join(", ")}. Exploration ends at game ${EXPLORATION_ENDS}.`}
      </desc>
      <defs>
        <linearGradient id="snn-line" gradientUnits="userSpaceOnUse" x1={m.l} y1="0" x2={W - m.r} y2="0">
          <stop offset="0" stopColor={BLUE} />
          <stop offset="1" stopColor={PURPLE} />
        </linearGradient>
        <linearGradient id="snn-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={BLUE} stopOpacity="0.22" />
          <stop offset="1" stopColor={BLUE} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Exploration phase */}
      <rect x={x(0)} y={m.t} width={x(EXPLORATION_ENDS) - x(0)} height={ph} fill="#ffffff" fillOpacity="0.025" />

      {/* Grid + y ticks */}
      {[0, 10, 20, 30].map((v) => (
        <g key={v}>
          <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} className="stroke-neutral-800" strokeDasharray={v ? "3 5" : undefined} />
          <text x={m.l - 10} y={y(v) + 4} textAnchor="end" className="fill-neutral-500 font-mono" fontSize="12">
            {v}
          </text>
        </g>
      ))}

      {/* x ticks */}
      {[0, 100, 200, 300, 400].map((g) => (
        <text key={g} x={x(g)} y={base + 22} textAnchor="middle" className="fill-neutral-500 font-mono" fontSize="12">
          {g}
        </text>
      ))}
      <text x={W - m.r} y={H - 4} textAnchor="end" className="fill-neutral-500" fontSize="12">
        Game
      </text>

      {/* Exploration marker */}
      <line x1={x(EXPLORATION_ENDS)} x2={x(EXPLORATION_ENDS)} y1={m.t} y2={base} className="stroke-neutral-500" strokeDasharray="4 4" />
      <text x={x(EXPLORATION_ENDS) + 8} y={m.t + 12} className="fill-neutral-400 font-mono" fontSize="12">
        exploration ends
      </text>

      {/* Series */}
      <path d={area} fill="url(#snn-area)" />
      <path d={line} fill="none" stroke="url(#snn-line)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {CURVE.map((p) => {
        // Nudge labels that would otherwise sit on the exploration marker or the chart edge.
        const [dx, dy, anchor] =
          p.game === 75 ? [-8, -8, "end"] : p.game === 100 ? [10, 4, "start"] : p.game === 400 ? [4, -12, "end"] : [0, -12, "middle"];
        return (
          <g key={p.game}>
            <circle cx={x(p.game)} cy={y(p.avg)} r="4.5" fill="#0a0a0a" stroke={BLUE} strokeWidth="2" />
            <text
              x={x(p.game) + dx}
              y={y(p.avg) + dy}
              textAnchor={anchor}
              className="fill-neutral-100 font-mono"
              fontSize="12"
            >
              {p.avg.toFixed(1)}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Formulas and code                                                   */
/* ------------------------------------------------------------------ */

function Formula({ label, spoken, children }) {
  return (
    <figure className="p-5 sm:p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-blue-500/30 transition-colors duration-300">
      <figcaption className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">{label}</figcaption>
      <p className="sr-only">{spoken}</p>
      <p aria-hidden="true" className="font-serif text-xl sm:text-2xl text-neutral-100 whitespace-nowrap overflow-x-auto">
        {children}
      </p>
    </figure>
  );
}

const V = ({ children }) => <i className="text-white">{children}</i>;

// Minimal Python highlighter: comments, numbers, the .T transpose, names,
// operators and punctuation. Enough for short excerpts.
const TOKEN = /(#.*$)|(\b\d+(?:\.\d+)?\b)|(\.T\b)|([A-Za-z_]\w*)|([@*/=+\-<>]+)|([()[\],.])/g;
const TOKEN_CLASSES = [
  "text-neutral-400 italic",
  "text-cyan-300",
  "text-blue-300",
  "text-neutral-100",
  "text-purple-400",
  "text-neutral-400",
];

function highlight(line) {
  const out = [];
  let last = 0;
  for (const match of line.matchAll(TOKEN)) {
    if (match.index > last) out.push(line.slice(last, match.index));
    const kind = match.slice(1).findIndex(Boolean);
    out.push(
      <span key={match.index} className={TOKEN_CLASSES[kind]}>
        {match[0]}
      </span>
    );
    last = match.index + match[0].length;
  }
  if (last < line.length) out.push(line.slice(last));
  return out;
}

function CodeBlock({ code, filename, language }) {
  const lines = code.trim().split("\n");
  return (
    <figure className="rounded-2xl bg-neutral-950/80 border border-neutral-800 overflow-hidden">
      <figcaption className="flex items-center gap-3 px-4 py-2.5 border-b border-neutral-800 bg-neutral-900/60">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
          <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
        </span>
        <span className="font-mono text-xs text-neutral-400">{filename}</span>
        <span className="ml-auto text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-500">{language}</span>
      </figcaption>
      <pre
        tabIndex={0}
        className="overflow-x-auto py-5 pr-5 text-[13px] sm:text-sm leading-7 font-mono text-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-400"
      >
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block min-w-max">
              <span aria-hidden="true" className="inline-block w-12 pr-5 text-right text-neutral-600 select-none">
                {i + 1}
              </span>
              {highlight(line)}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

const BACKPROP = `
dq[idx, a] = 2 * (q[idx, a] - y) / n
dW2 = h.T @ dq
dh = (dq @ W2.T) * (h > 0)   # through ReLU
dW1 = x.T @ dh
`;

/* ------------------------------------------------------------------ */
/* Page body                                                           */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  ["summary", "Summary"],
  ["problem", "Problem and goal"],
  ["approach", "Approach"],
  ["training", "Training"],
  ["results", "Results"],
  ["product", "Product and UI"],
  ["shipping", "Shipping at $0"],
  ["learned", "What I learned and what's next"],
];

export default function SnakeNNCaseStudy({ project, links }) {
  const n = Object.fromEntries(SECTIONS.map(([id], i) => [id, i + 1]));
  const title = Object.fromEntries(SECTIONS);
  const screenshot = project.images?.[0];

  return (
    <div className="space-y-20">
      {/* On this page */}
      <nav aria-label="On this page">
        <ol className="flex flex-wrap gap-2">
          {SECTIONS.map(([id, label], i) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-900/50 border border-neutral-800 text-sm text-neutral-400 hover:text-white hover:border-blue-500/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
              >
                <span className="font-mono text-xs text-blue-400">{String(i + 1).padStart(2, "0")}</span>
                {label}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="summary" index={n.summary} title={title.summary}>
        <p>
          I built a neural network that teaches itself to play Snake using only NumPy: the forward pass, loss,
          backpropagation and optimiser are all written by hand. After 400 games and about 25 seconds of CPU training it
          averages 32.5 apples in greedy play, with a best training game of 65. It runs live in the browser, costs $0 to
          host, and lets visitors watch the agent go from random to competent.
        </p>
        <Panel className="p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">Stack</h3>
          <dl className="grid sm:grid-cols-3 gap-5 text-base">
            {[
              ["Training", "Python and NumPy"],
              ["Demo", "Plain JavaScript and canvas"],
              ["Deployment", "GitHub and a free static host (Netlify)"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-[11px] font-semibold uppercase tracking-[0.15em] text-blue-400 mb-1">{k}</dt>
                <dd className="text-neutral-200 leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </Section>

      <Section id="problem" index={n.problem} title={title.problem}>
        <p>
          Most computer science portfolios carry the same Titanic and house-price notebooks, which show that someone can
          call a library. I wanted a project that shows I understand how a model actually learns, and that a recruiter can
          open and understand in under a minute.
        </p>
        <p>
          The goal was a learning agent built with{" "}
          <span className="text-white font-medium">no ML framework, published as a live link, for $0.</span>
        </p>
        <ul className="grid sm:grid-cols-2 gap-3 text-base">
          {[
            ["No framework", "No PyTorch, TensorFlow or autograd."],
            ["No compute spend", "Trained on a laptop CPU, no GPU."],
            ["No hosting spend", "Static files only, no backend or database."],
            ["No dependencies at runtime", "Inference is two matrix multiplies in the browser."],
          ].map(([k, v]) => (
            <li
              key={k}
              className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-900/80 transition-colors duration-300"
            >
              <span className="flex items-center gap-2.5 font-semibold text-white mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
                {k}
              </span>
              <span className="text-neutral-400 leading-relaxed">{v}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="approach" index={n.approach} title={title.approach}>
        <p>
          The agent sees 11 yes/no signals instead of raw pixels, and picks one of 3 moves. A tiny state keeps the network
          small enough to train in seconds on a CPU.
        </p>
        <Panel className="p-4 sm:p-6 overflow-x-auto">
          <div className="max-w-xl mx-auto">
            <ArchitectureDiagram />
          </div>
        </Panel>
        <DataTable
            label="Agent design"
            columns={["Component", "Design"]}
            rows={[
              [
                "Inputs (11)",
                <span key="inputs" className="flex flex-col gap-1">
                  <span>Danger ahead, right, left (3)</span>
                  <span>Heading right, down, left, up (4)</span>
                  <span>Food left, right, up, down (4)</span>
                </span>,
              ],
              ["Actions (3)", "Go straight, turn right, turn left"],
              ["Reward", "+10 for eating, -10 for crashing or starving (step limit of 100 times the snake length)"],
              ["Network", "11 inputs, 64 hidden neurons (ReLU), 3 outputs, 963 weights"],
              ["Board", "20 by 20 grid"],
            ]}
          />
        <p>
          The network outputs a <span className="text-white font-medium">Q-value</span> for each move, meaning how good
          that move is expected to be, and the agent plays the highest. NumPy only was a deliberate constraint: writing
          every gradient by hand forces a real understanding of backprop.
        </p>
      </Section>

      <Section id="training" index={n.training} title={title.training}>
        <p>
          The agent learns with Q-learning: after each move it nudges its prediction for that move toward the reward it
          got plus the best value it expects next. The error then flows backwards through both layers, which is backprop.
        </p>
        <div className="grid gap-3 sm:grid-cols-2">
          <Formula label="Q-learning target" spoken="y equals r plus gamma times the max over a prime of Q of s prime, a prime.">
            <V>y</V> = <V>r</V> + <span className="text-purple-300">γ</span> · max
            <sub className="text-sm">
              <V>a′</V>
            </sub>{" "}
            <V>Q</V>(<V>s′</V>, <V>a′</V>)
          </Formula>
          <Formula label="Loss gradient" spoken="The partial derivative of L with respect to Q equals 2 times Q of s, a minus y.">
            ∂<V>L</V>/∂<V>Q</V> = 2 · (<V>Q</V>(<V>s</V>, <V>a</V>) − <V>y</V>)
          </Formula>
        </div>
        <p>The gradients are written by hand, then updated with a hand-written Adam optimiser.</p>
        <CodeBlock code={BACKPROP} filename="train.py · backward pass" language="Python" />
        <DataTable
          label="Training settings"
          columns={["Setting", "Value"]}
          rows={[
            ["Discount (gamma)", <Mono key="g">0.9</Mono>],
            [
              "Optimiser",
              <span key="opt">
                Adam, learning rate <Mono>0.001</Mono>
              </span>,
            ],
            [
              "Replay memory",
              <span key="mem">
                <Mono>100,000</Mono> transitions
              </span>,
            ],
            ["Updates", "One per move, plus 4 batches of 512 after every game"],
            ["Exploration", "Random moves start at 80% and fall to 0% over 90 games"],
            ["Games", "400, about 25 seconds on a CPU"],
          ]}
        />
        <p>
          I kept the method deliberately simple, with no target network, so every moving part can be explained in an
          interview.
        </p>
      </Section>

      <Section id="results" index={n.results} title={title.results}>
        <p>
          The agent stays near zero while it explores, then jumps once exploration ends: the average goes from 0.6 apples
          at game 75 to 25.9 by game 125, and settles around 30.
        </p>
        <Panel className="p-4 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
            <h3 className="text-base font-semibold text-white">Average score, last 25 games</h3>
            <span className="inline-flex items-center gap-2 text-xs text-neutral-400">
              <span aria-hidden="true" className="w-6 h-0.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500" />
              Training run, 400 games
            </span>
          </div>
          <div
            role="region"
            aria-label="Training curve chart"
            tabIndex={0}
            className="overflow-x-auto rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
          >
            <ResultsChart />
          </div>
        </Panel>
        <DataTable
          label="Average score over the last 25 games, by game"
          columns={["Game", ...CURVE.map((p) => String(p.game))]}
          minWidth="min-w-[32rem]"
          rows={[["Avg score", ...CURVE.map((p) => <Mono key={p.game}>{p.avg.toFixed(1)}</Mono>)]]}
        />
        <p>
          The best game during training scored <span className="text-white font-medium">65</span>. Over 30 greedy games
          with the final weights (no random moves), the mean was <span className="text-white font-medium">32.5</span> and
          the maximum was <span className="text-white font-medium">55</span>.
        </p>
        <aside
          aria-labelledby="snn-limits"
          className="p-6 rounded-2xl bg-amber-400/[0.04] border border-amber-400/20 text-base"
        >
          <h3 id="snn-limits" className="flex items-center gap-2.5 font-semibold text-amber-200 mb-4">
            <TriangleAlert size={18} aria-hidden="true" className="text-amber-300" />
            Limitations
          </h3>
          <ul className="space-y-3 text-neutral-300 leading-relaxed">
            {[
              "Results come from one training run with one seed, so the exact numbers will vary between runs.",
              "Performance plateaus near 30. The agent only sees the cells next to its head, so at longer lengths it likely traps itself in its own body.",
              "Early games are almost random by design, which is why the first 75 games score close to zero.",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-amber-300/80 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </aside>
      </Section>

      <Section id="product" index={n.product} title={title.product}>
        <p>
          The demo is designed to show learning, not just a final score. It uses a dark, minimal interface inspired by
          Linear, with a near-black background, hairline borders and an indigo accent.
        </p>
        {screenshot && <Screenshot image={screenshot} sizes="(min-width: 1200px) 752px, (min-width: 1024px) calc(100vw - 496px), calc(100vw - 48px)" />}
        <Bullets
          items={[
            <Lead key="ckpt" label="Checkpoint switcher">
              visitors can play the untrained network, the game 25 and game 80 versions, and the final one, and see the
              behaviour change.
            </Lead>,
            <Lead key="net" label="Network view">
              input neurons light up as the snake senses danger and food, and the three outputs show the live Q-value for
              each move.
            </Lead>,
            <Lead key="chart" label="Training chart">
              score per game with a moving average and hover tooltips.
            </Lead>,
            <Lead key="speed" label="Speed and pause controls">
              with the space bar to pause.
            </Lead>,
            <Lead key="resp" label="Responsive layout">
              works on a phone as well as a desktop.
            </Lead>,
          ]}
        />
        <p>
          The trained weights are embedded in a single <code className="font-mono text-base text-cyan-300">index.html</code>{" "}
          of about 100 KB, so there is no server, no API and nothing to break.
        </p>
      </Section>

      <Section id="shipping" index={n.shipping} title={title.shipping}>
        <p>
          Training runs once on a laptop and writes the weights to JSON. A small build script embeds them in the page, so
          the finished site is plain static files. The code lives in a public GitHub repo, and a free static host
          (Netlify) deploys it from the main branch with no build command.
        </p>
        <DataTable
          label="Running costs"
          columns={["Item", "Cost"]}
          rows={[
            ["Training compute", <span key="c"><Mono>$0</Mono> <span className="text-neutral-500">(laptop CPU)</span></span>],
            ["Hosting", <span key="h"><Mono>$0</Mono> <span className="text-neutral-500">(free static hosting)</span></span>],
            ["Domain", <span key="d"><Mono>$0</Mono> <span className="text-neutral-500">(default subdomain)</span></span>],
            ["Backend and database", "None needed"],
          ]}
        />
        <div className="relative rounded-2xl p-px bg-gradient-to-br from-blue-500/50 via-neutral-800 to-purple-500/40">
          <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5 p-6 rounded-[calc(1rem-1px)] bg-neutral-950/90 overflow-hidden">
            <span className="absolute -top-16 -left-10 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-1">Live demo</p>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-lg text-white hover:text-blue-300 transition-colors break-all"
              >
                snake-nn.netlify.app
              </a>
            </div>
            <div className="relative">{links}</div>
          </div>
        </div>
      </Section>

      <Section id="learned" index={n.learned} title={title.learned}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 text-base">
          {[
            {
              heading: "What I learned",
              icon: Check,
              items: [
                "Replay memory is what makes learning stable: training on one move at a time alone was too noisy.",
                "Checkpoints tell the story better than a final score, so the demo lets visitors replay each stage.",
                "A small, well-chosen state (11 signals) can beat a complex one when compute is limited.",
              ],
            },
            {
              heading: "What's next",
              icon: ArrowRight,
              items: [
                "Add a target network and compare results across several seeds.",
                "Add features that see the snake's own body, such as free space and distance to the tail, to break the plateau near 30.",
                "Let visitors train the network live in the browser.",
                "Add a simple rule-based baseline to show how much the network adds.",
              ],
            },
          ].map(({ heading, icon: Icon, items }) => (
            <Panel key={heading} className="p-6 hover:border-blue-500/30 transition-colors duration-300">
              <h3 className="flex items-center gap-2.5 font-semibold text-white text-lg mb-4">
                <span className="grid place-items-center w-7 h-7 rounded-lg bg-neutral-950 border border-neutral-800 text-blue-400">
                  <Icon size={15} aria-hidden="true" />
                </span>
                {heading}
              </h3>
              <ul className="space-y-3 text-neutral-300 leading-relaxed">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
      </Section>

      {/* Closing CTA */}
      <div className="relative p-8 sm:p-10 rounded-3xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm overflow-hidden text-center">
        <span className="absolute -top-24 left-1/4 w-72 h-72 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none" />
        <span className="absolute -bottom-24 right-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="relative">
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight mb-3">Watch it go from random to competent</h2>
          <p className="text-neutral-400 mb-8">Switch checkpoints in the live demo, or read the code on GitHub.</p>
          <div className="flex flex-col items-center gap-5">
            <div className="flex justify-center">{links}</div>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              Back to projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
