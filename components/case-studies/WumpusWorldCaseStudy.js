// Long-form body for /projects/wumpus-world. Rendered by app/projects/[slug]/page.js
// in place of the generic sections, so the header, stats, lead screenshot,
// sidebar and related projects stay shared with every other case study.
//
// The chart and formula are inline SVG and styled markup. No chart or maths
// libraries.

import { ArrowRight, Check, ShieldCheck, Info } from "lucide-react";
import Screenshot from "@/components/ui/Screenshot";
import {
  INDIGO,
  Section,
  Bullets,
  Lead,
  Mono,
  Code,
  DataTable,
  OnThisPage,
  StackPanel,
  CardGrid,
  Callout,
  ListPanels,
  LiveDemoStrip,
  ChartPanel,
  ClosingCta,
} from "@/components/case-studies/shared";

/* ------------------------------------------------------------------ */
/* Results chart: mean nodes expanded per world, grouped by grid size  */
/* ------------------------------------------------------------------ */

const SOLVERS = [
  { key: "bfs", name: "BFS", fill: "#737373", label: "fill-neutral-400" },
  { key: "astar", name: "A*", fill: INDIGO, label: "fill-indigo-200" },
  { key: "greedy", name: "Greedy", fill: "#3f3f46", stroke: "#a1a1aa", label: "fill-neutral-400" },
];

const NODES = [
  { grid: "4×4", bfs: 41.1, astar: 12.2, greedy: 11.5, ratio: "3.4×" },
  { grid: "5×5", bfs: 66.2, astar: 16.1, greedy: 14.8, ratio: "4.1×" },
  { grid: "6×6", bfs: 100.4, astar: 19.8, greedy: 17.9, ratio: "5.1×" },
];

function Swatch({ solver }) {
  return (
    <span
      aria-hidden="true"
      className="inline-block w-3 h-3 rounded-[3px]"
      style={{
        backgroundColor: solver.fill,
        boxShadow: solver.stroke ? `inset 0 0 0 1px ${solver.stroke}99` : undefined,
      }}
    />
  );
}

function Legend() {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-400" aria-label="Legend">
      {SOLVERS.map((s) => (
        <li key={s.key} className={`inline-flex items-center gap-2 ${s.key === "astar" ? "text-indigo-200 font-medium" : ""}`}>
          <Swatch solver={s} />
          {s.name}
        </li>
      ))}
    </ul>
  );
}

function NodesChart() {
  const W = 640;
  const H = 340;
  const m = { t: 40, r: 12, b: 70, l: 48 };
  const pw = W - m.l - m.r;
  const ph = H - m.t - m.b;
  const yMax = 110;
  const y = (v) => m.t + ph - (v / yMax) * ph;
  const base = m.t + ph;
  const groupW = pw / NODES.length;
  const barW = 46;
  const gap = 8;
  const blockW = SOLVERS.length * barW + (SOLVERS.length - 1) * gap;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="ww-chart-title ww-chart-desc" className="w-full h-auto min-w-[30rem]">
      <title id="ww-chart-title">Average nodes expanded per world, by solver and grid size</title>
      <desc id="ww-chart-desc">
        {`Grouped bar chart. ${NODES.map(
          (d) => `${d.grid}: BFS ${d.bfs}, A* ${d.astar}, Greedy ${d.greedy}, BFS divided by A* equals ${d.ratio}`
        ).join(". ")}.`}
      </desc>

      <text x="0" y="16" className="fill-neutral-500" fontSize="12">
        Nodes expanded (mean)
      </text>

      {/* Grid + y ticks */}
      {[0, 25, 50, 75, 100].map((v) => (
        <g key={v}>
          <line x1={m.l} x2={W - m.r} y1={y(v)} y2={y(v)} className="stroke-neutral-800" strokeDasharray={v ? "3 5" : undefined} />
          <text x={m.l - 10} y={y(v) + 4} textAnchor="end" className="fill-neutral-500 font-mono" fontSize="12">
            {v}
          </text>
        </g>
      ))}

      {NODES.map((d, gi) => {
        const cx = m.l + groupW * gi + groupW / 2;
        const x0 = cx - blockW / 2;
        return (
          <g key={d.grid}>
            {SOLVERS.map((s, si) => {
              const v = d[s.key];
              const bx = x0 + si * (barW + gap);
              const top = y(v);
              return (
                <g key={s.key}>
                  <rect
                    x={bx}
                    y={top}
                    width={barW}
                    height={base - top}
                    rx="4"
                    fill={s.fill}
                    stroke={s.stroke}
                    strokeOpacity={s.stroke ? 0.6 : undefined}
                    className="transition-opacity duration-300 hover:opacity-80"
                  >
                    <title>{`${d.grid} · ${s.name}: ${v} nodes expanded (mean)`}</title>
                  </rect>
                  <text
                    x={bx + barW / 2}
                    y={top - 8}
                    textAnchor="middle"
                    className={`${s.label} font-mono`}
                    fontSize="12"
                    fontWeight={s.key === "astar" ? 600 : 400}
                  >
                    {v}
                  </text>
                </g>
              );
            })}
            <text x={cx} y={base + 24} textAnchor="middle" className="fill-neutral-200" fontSize="14" fontWeight="600">
              {d.grid}
            </text>
            <text x={cx} y={base + 46} textAnchor="middle" className="fill-indigo-300 font-mono" fontSize="12">
              {`BFS ÷ A* = ${d.ratio}`}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Heuristic formula                                                   */
/* ------------------------------------------------------------------ */

const V = ({ children }) => <i className="text-white">{children}</i>;
const F = ({ children }) => <span className="text-indigo-300">{children}</span>;

function HeuristicFormula() {
  const rows = [
    {
      when: "before taking the gold",
      expr: (
        <>
          <V>h</V>(<V>s</V>) = <F>d</F>(<V>p</V>, gold) + 1 + <F>d</F>(gold, start)
        </>
      ),
    },
    {
      when: "after taking it",
      expr: (
        <>
          <V>h</V>(<V>s</V>) = <F>d</F>(<V>p</V>, start)
        </>
      ),
    },
  ];

  return (
    <figure className="p-5 sm:p-6 rounded-2xl bg-neutral-950/70 border border-neutral-800 hover:border-blue-500/30 transition-colors duration-300">
      <figcaption className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
        A* heuristic · <span className="normal-case tracking-normal font-normal text-neutral-500">d = Manhattan distance, p = agent&apos;s square</span>
      </figcaption>
      <p className="sr-only">
        Before taking the gold, h of s equals the Manhattan distance from p to the gold, plus 1, plus the distance from the
        gold to the start. After taking it, h of s equals the distance from p to the start.
      </p>
      <div aria-hidden="true" className="overflow-x-auto">
        <div className="grid gap-y-1 sm:gap-y-4 min-w-max sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-x-10">
          {rows.map((r) => (
            <div key={r.when} className="contents">
              <span className="font-serif text-xl sm:text-2xl text-neutral-100 whitespace-nowrap">{r.expr}</span>
              <span className="text-sm text-neutral-500 mb-3 last:mb-0 sm:mb-0">{r.when}</span>
            </div>
          ))}
        </div>
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Page body                                                           */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  ["summary", "Summary"],
  ["problem", "Problem and goal"],
  ["assignment", "The assignment"],
  ["approach", "Approach"],
  ["product", "Product and UI"],
  ["results", "Results"],
  ["limitations", "Limitations"],
  ["shipping", "Shipping at $0"],
  ["learned", "What I learned and what's next"],
];

const ACTIONS = [
  ["move", "Step to an adjacent square that is not a pit."],
  ["take", "Pick up the gold when standing on it."],
  ["shoot", "Fire the arrow at a living Wumpus on an adjacent square."],
];

export default function WumpusWorldCaseStudy({ project, links }) {
  const n = Object.fromEntries(SECTIONS.map(([id], i) => [id, i + 1]));
  const title = Object.fromEntries(SECTIONS);
  const screenshot = project.images?.[0];

  return (
    <div className="space-y-20">
      <OnThisPage sections={SECTIONS} />

      <Section id="summary" index={n.summary} title={title.summary}>
        <p>
          I turned my SIT215 Wumpus World planning assignment into a live demo: a planner that solves a fresh Wumpus World
          in the browser every few seconds, with no input needed. Over 1,200 random worlds, A* expands a median{" "}
          <span className="text-white font-medium">3.9 to 5.8 times fewer nodes</span> than breadth-first search (BFS)
          while finding the same optimal plan. It costs $0 to host and lets visitors watch three search algorithms compete
          on the same world.
        </p>
        <StackPanel
          items={[
            ["Original assignment", "PDDL, BFWS and LAMA-First (Fast Downward)"],
            ["Demo", "Plain JavaScript and canvas"],
            ["Deployment", "GitHub and Netlify"],
          ]}
        />
      </Section>

      <Section id="problem" index={n.problem} title={title.problem}>
        <p>
          A notebook full of solver timings proves the assignment ran, but it does not show a recruiter that the planner
          works or why one algorithm beats another. I wanted a link that a visitor understands in under a minute, built on
          work I had already done.
        </p>
        <p>The constraints were deliberate:</p>
        <CardGrid
          items={[
            ["Keep the PDDL visible", "The demo shows the real move, take and shoot actions from my domain as the agent executes them."],
            ["No backend", "Static files only, so nothing can break or cost money."],
            ["No dependencies at runtime", "The planner is plain JavaScript."],
            ["Self-running", "A visitor sees something happening without clicking anything."],
          ]}
        />
      </Section>

      <Section id="assignment" index={n.assignment} title={title.assignment}>
        <p>
          The starting point was SIT215 Assignment 3: model Wumpus World in PDDL and compare two planners on it. The world
          is a 4×4 grid with an agent, an arrow, gold, a Wumpus and pits. The domain has three actions,{" "}
          <Code>move</Code>, <Code>take</Code> and <Code>shoot</Code>. A corrected version adds guards: a dead agent cannot
          act, an arrow can only be used once, and a flag records whether the Wumpus is alive.
        </p>
        <DataTable
          label="Problem file"
          columns={["Problem file", "Value"]}
          rows={[
            ["Agent starts", <span key="a"><Mono>sq-1-1</Mono>, with the arrow</span>],
            ["Gold", <Mono key="g">sq-2-3</Mono>],
            ["Wumpus", <Mono key="w">sq-1-3</Mono>],
            ["Goal", <span key="goal">Hold the gold and be back at <Mono>sq-1-1</Mono></span>],
          ]}
        />
        <p>My notebook compared two solvers on it.</p>
        <DataTable
          label="Notebook results for the assignment problem"
          columns={["Solver", "Planning time (s)", "Nodes generated", "Nodes expanded", "Plan length", "Peak memory (KB)"]}
          minWidth="min-w-[40rem]"
          wrapHeaders
          rows={[
            [
              "BFWS (FF parser)",
              <Mono key="t">0.000456</Mono>,
              <Mono key="g">89</Mono>,
              <Mono key="e">58</Mono>,
              <Mono key="l">10</Mono>,
              <span key="m" className="text-neutral-500">not recorded</span>,
            ],
            [
              "LAMA-First (Fast Downward)",
              <Mono key="t">0.027971</Mono>,
              <Mono key="g">52</Mono>,
              <Mono key="e">12</Mono>,
              <Mono key="l">10</Mono>,
              <Mono key="m">12,500</Mono>,
            ],
          ]}
        />
        <p>
          LAMA-First expanded about 5 times fewer nodes (12 against 58) but took about 60 times longer. On a problem this
          small that likely reflects fixed startup cost rather than search effort, which is why the demo reports{" "}
          <span className="text-white font-medium">expanded nodes</span>.
        </p>
      </Section>

      <Section id="approach" index={n.approach} title={title.approach}>
        <p>
          The demo re-implements the domain&apos;s three actions as a search problem and runs it in the browser. A state is
          four facts: the agent&apos;s square, whether it holds the gold, whether it still has the arrow, and whether the
          Wumpus is alive. That gives <span className="text-white font-medium">128 states</span> on a 4×4 grid and{" "}
          <span className="text-white font-medium">288</span> on a 6×6.
        </p>
        <ul className="grid sm:grid-cols-3 gap-3 text-base">
          {ACTIONS.map(([name, text]) => (
            <li
              key={name}
              className="p-5 rounded-xl bg-neutral-900/50 border border-neutral-800 hover:border-blue-500/30 hover:bg-neutral-900/80 transition-colors duration-300"
            >
              <span className="block font-mono text-cyan-300 mb-1.5">{name}</span>
              <span className="text-neutral-400 leading-relaxed">{text}</span>
            </li>
          ))}
        </ul>
        <p>The goal matches the assignment: hold the gold and be back at the start.</p>
        <p>
          One rule is my addition, behind a toggle. The PDDL domain lets the agent walk straight through the Wumpus&apos;s
          square, but the classic game does not. With the rule on, the Wumpus blocks its square, so shooting becomes worth
          using.
        </p>
        <p>Three algorithms search the same state space.</p>
        <DataTable
          label="Search algorithms compared"
          columns={["Solver", "Frontier ordered by", "Finds the shortest plan?"]}
          minWidth="min-w-[36rem]"
          rows={[
            ["BFS", "Steps taken", "Yes"],
            ["A*", "Steps taken plus a heuristic", "Yes, because the heuristic never overestimates"],
            ["Greedy best-first", "Heuristic only", <span key="n" className="text-amber-200">No</span>],
          ]}
        />
        <p>
          The heuristic is the Manhattan distance to the gold, one step to take it, then the distance back to the start. It
          ignores pits and the Wumpus, so it never overestimates.
        </p>
        <HeuristicFormula />
        <p>
          Each episode builds a random world that is guaranteed solvable. The gold sits at least <i>n</i>−1 squares from
          the start, and the Wumpus is placed next to the gold in 60% of worlds so that shooting is sometimes the only way
          through. Pits number 2 or 3 on 4×4, 4 on 5×5 and 6 on 6×6, and BFS rejects any world with no plan.
        </p>
      </Section>

      <Section id="product" index={n.product} title={title.product}>
        <p>
          The demo is designed to show the planner thinking, not just a final answer. It uses a dark, minimal interface
          with a near-black background, hairline borders and an indigo accent, matching my Snake project.
        </p>
        {screenshot && (
          <Screenshot
            image={screenshot}
            sizes="(min-width: 1200px) 752px, (min-width: 1024px) calc(100vw - 496px), calc(100vw - 48px)"
          />
        )}
        <Bullets
          items={[
            <Lead key="world" label="Live world">
              the agent, gold, Wumpus and pits, with breeze and stench markers. An indigo glow shows where the search spent
              its effort, then the agent walks the plan.
            </Lead>,
            <Lead key="plan" label="Plan steps">
              the plan as a row of chips, with the current step highlighted.
            </Lead>,
            <Lead key="table" label="Solver table">
              all three solvers run on every world, showing nodes generated, nodes expanded, plan length and time. The best
              value in each column turns green.
            </Lead>,
            <Lead key="pddl" label="PDDL panel">
              the move, take or shoot action being executed lights up in the domain text, beside the grounded step, for
              example <Code>(move agent sq-1-1 sq-2-1)</Code>.
            </Lead>,
            <Lead key="chart" label="Chart">
              nodes expanded per world for the three solvers, with hover tooltips.
            </Lead>,
            <Lead key="controls" label="Controls">
              solver switch, 4×4, 5×5 or 6×6 grid, speed from 0.5× to 4×, the Wumpus-blocking toggle, pause on the space
              bar and next world on the right arrow. The layout works on a phone.
            </Lead>,
          ]}
        />
        <p>
          A world takes a few seconds at normal speed, then a new one loads. The first world uses the layout from my{" "}
          <Code>wumpus.pddl</Code> file.
        </p>
      </Section>

      <Section id="results" index={n.results} title={title.results}>
        <p>A* beats BFS by a margin that grows with the grid, while finding the same shortest plan.</p>
        <ChartPanel
          title="A* expands about 5× fewer nodes than BFS on a 6×6 grid"
          subtitle="Average nodes expanded per world, 400 random worlds per grid size"
          label="Nodes expanded chart"
          legend={<Legend />}
          footer={
            <div className="mt-4 px-1 space-y-3 text-sm leading-relaxed">
              <p className="text-neutral-500">
                Mean of 400 random worlds per grid size (seeds 1 to 400), Wumpus blocks its square, run with the
                demo&apos;s <code className="font-mono text-neutral-400">planner.js</code>.
              </p>
              <p className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950/60 border border-neutral-800 text-neutral-400">
                <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-indigo-300" />
                <span>
                  The chart shows the ratio of mean nodes (3.4, 4.1, 5.1×) while the text below uses the median per-world
                  ratio (3.9, 4.6, 5.8×). Both are correct; they are different statistics.
                </span>
              </p>
            </div>
          }
        >
          <NodesChart />
        </ChartPanel>
        <p>
          A* and BFS always return plans of equal length, because both find the shortest one. Greedy search expands 6 to
          10% fewer nodes than A* but returns a longer plan in 25 of 400 worlds on 4×4, 55 on 5×5 and 76 on 6×6. The
          median BFS-to-A* ratio of expanded nodes is <span className="text-white font-medium">3.9</span> on 4×4,{" "}
          <span className="text-white font-medium">4.6</span> on 5×5 and{" "}
          <span className="text-white font-medium">5.8</span> on 6×6. Shooting the Wumpus was part of the shortest plan
          in 82, 74 and 57 of the 400 worlds respectively.
        </p>
        <DataTable
          label="Per-world results by grid size, 400 worlds each"
          columns={["Grid", "Median BFS ÷ A*", "Greedy plan longer", "Shot in shortest plan"]}
          minWidth="min-w-[36rem]"
          rows={[
            ["4×4", <Mono key="r">3.9×</Mono>, <span key="g"><Mono>25</Mono> of 400</span>, <span key="s"><Mono>82</Mono> of 400</span>],
            ["5×5", <Mono key="r">4.6×</Mono>, <span key="g"><Mono>55</Mono> of 400</span>, <span key="s"><Mono>74</Mono> of 400</span>],
            ["6×6", <Mono key="r">5.8×</Mono>, <span key="g"><Mono>76</Mono> of 400</span>, <span key="s"><Mono>57</Mono> of 400</span>],
          ]}
        />
        <p>
          On the first world, which uses the layout from <Code>wumpus.pddl</Code>, BFS expands 44 nodes and A* and greedy
          expand 8, all finding a 7-step plan.
        </p>
        <aside aria-labelledby="ww-testing" className="p-6 rounded-2xl bg-emerald-400/[0.04] border border-emerald-400/20 text-base">
          <h3 id="ww-testing" className="flex items-center gap-2.5 font-semibold text-emerald-200 mb-3">
            <ShieldCheck size={18} aria-hidden="true" className="text-emerald-300" />
            Testing
          </h3>
          <p className="text-neutral-300 leading-relaxed">
            A separate checker replays every plan against the action rules. Across{" "}
            <span className="text-white font-medium">900 test worlds</span> (150 seeds at each grid size, with the Wumpus
            rule on and off), every plan from all three solvers was valid and A* matched the shortest length every time.
          </p>
        </aside>
      </Section>

      <Section id="limitations" index={n.limitations} title={title.limitations}>
        <Callout
          id="ww-limits"
          title="Full knowledge, not fog of war"
          intro="The demo plans with full knowledge of the world, because PDDL assumes it. Classic Wumpus World hides the pits, so the breeze and stench markers here are for display and do not drive the plan."
          items={[
            <Lead key="rule" label="Added rule">
              the Wumpus blocking its square is my addition and is not in the PDDL domain. A toggle turns it off.
            </Lead>,
            <Lead key="solvers" label="Different solvers">
              the browser uses my own JavaScript search, not BFWS or LAMA-First, so its numbers are not comparable to the
              notebook table. The repo&apos;s <Code>wumpus.pddl</Code> lists only two example pits, and its best plan in my
              model is 7 steps against 10 in the notebook, so the notebook likely used a different pit layout.
            </Lead>,
            <Lead key="verify" label="Not yet checked against a real planner">
              an independent checker replays every plan against the action rules, but I have not yet run the PDDL files
              through Fast Downward on the same worlds.
            </Lead>,
            <Lead key="sample" label="Heuristic and sample size">
              the Manhattan heuristic ignores obstacles, so A*&apos;s advantage depends on how many detours lie between
              start and gold. Results use seeds 1 to 400 per grid size and will shift slightly with other seeds.
            </Lead>,
          ]}
        />
      </Section>

      <Section id="shipping" index={n.shipping} title={title.shipping}>
        <p>
          Everything runs in the browser, so the site is a folder of static files: <Code>index.html</Code> and{" "}
          <Code>planner.js</Code> in the repo&apos;s <Code>web</Code> folder. Netlify deploys from the main branch with the
          publish directory set to <Code>web</Code> and no build command.
        </p>
        <DataTable
          label="Running costs"
          columns={["Item", "Cost"]}
          rows={[
            ["Compute", <span key="c"><Mono>$0</Mono> <span className="text-neutral-500">(the visitor&apos;s browser)</span></span>],
            ["Hosting", <span key="h"><Mono>$0</Mono> <span className="text-neutral-500">(free static hosting)</span></span>],
            ["Domain", <span key="d"><Mono>$0</Mono> <span className="text-neutral-500">(default netlify.app subdomain)</span></span>],
            ["Backend and database", "None needed"],
          ]}
        />
        <LiveDemoStrip href={project.demo} links={links} />
      </Section>

      <Section id="learned" index={n.learned} title={title.learned}>
        <ListPanels
          panels={[
            {
              heading: "What I learned",
              icon: Check,
              items: [
                "Heuristic quality sets the cost of search: A* expands a median 3.9 to 5.8 times fewer nodes than BFS, and the gap grows with the grid.",
                "Greedy search's small saving costs plan quality. It expands 6 to 10% fewer nodes than A* but returns a longer plan in 6% of 4×4 worlds and 19% of 6×6 worlds.",
                "Implementing a domain exposes rules it leaves out. My PDDL never stops the agent walking into the Wumpus, which I only noticed when writing the search.",
                "Showing the search as a heat map explains more than a table of counts.",
              ],
            },
            {
              heading: "What's next",
              icon: ArrowRight,
              items: [
                "Run the PDDL files through Fast Downward on the same worlds to verify the browser plans.",
                "Add fog of war, where the agent senses breeze and stench and replans, as in the classic game.",
                "Let visitors click to place pits and the Wumpus.",
                "Commit the benchmark script so the results can be reproduced.",
              ],
            },
          ]}
        />
      </Section>

      <ClosingCta
        title="Watch three search algorithms compete"
        text={
          project.demo
            ? "Watch a fresh world solve in the live demo, or read the planner and PDDL files on GitHub."
            : "Read the planner and the PDDL files on GitHub."
        }
        links={links}
      />
    </div>
  );
}
