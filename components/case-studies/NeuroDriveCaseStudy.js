// Long-form body for /projects/neurodrive. Rendered by app/projects/[slug]/page.js
// in place of the generic sections, so the header, stats, lead screenshot,
// sidebar and related projects stay shared with every other case study.
//
// The pipeline diagram is inline SVG. No chart or diagram libraries. Facts come
// from the neurodrive repo (README, SPEC.md, js/, data/) at the time of writing.

import { ArrowRight, Check, Info } from "lucide-react";
import Screenshot from "@/components/ui/Screenshot";
import {
  BLUE,
  PURPLE,
  Section,
  Bullets,
  Lead,
  Panel,
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

const BODY_SIZES = "(min-width: 1200px) 752px, (min-width: 1024px) calc(100vw - 496px), calc(100vw - 48px)";

const ROUTE_SHOT = {
  src: "/projects/neurodrive-route.png",
  alt: "NeuroDrive overview camera: the A* route from Flinders Street Station up to Queen Victoria Market drawn in mint over the OpenStreetMap Hoddle Grid, with the CBD minimap and the live network view.",
  width: 1600,
  height: 900,
};

const PIPELINE_SHOT = {
  src: "/projects/neurodrive-pipeline.png",
  alt: "The 3D pipeline machine in NeuroDrive's How it works section, next to its five stations: Map, Router, Sensors, Brain and Evolution.",
  width: 1600,
  height: 900,
};

/* ------------------------------------------------------------------ */
/* Pipeline diagram: map -> route -> sensors -> network -> fitness     */
/* ------------------------------------------------------------------ */

// Top row runs left to right, then the loop runs right to left along the
// bottom and back up into the network for the next generation.
const TOP = [
  { title: "OpenStreetMap", lines: ["2,322 roads", "517 signals"] },
  { title: "Road graph", lines: ["directed,", "one-way aware"] },
  { title: "A* route", lines: ["waypoints", "every ~15 m"] },
  { title: "Sensors", lines: ["7 rays + 5", "= 12 inputs"] },
];
const BOTTOM = [
  { title: "Evolution", lines: ["top 5 kept,", "rest mutated"], accent: PURPLE },
  { title: "Fitness", lines: ["metres along", "route, +1000"] },
  { title: "Car physics", lines: ["4.5 × 1.9 m", "40 km/h limit"] },
  { title: "Network", lines: ["[12, 14, 2]", "steer, pedal"], accent: BLUE },
];

function PipelineDiagram() {
  const W = 720;
  const H = 330;
  const BW = 150;
  const BH = 84;
  const GAP = (W - 4 * BW) / 3;
  const col = (i) => i * (BW + GAP);
  const rows = { top: 44, bottom: 196 };

  const Box = ({ x, y, node }) => (
    <g>
      <rect
        x={x + 0.5}
        y={y + 0.5}
        width={BW - 1}
        height={BH - 1}
        rx="12"
        fill="#0a0a0a"
        stroke={node.accent ?? "#404040"}
        strokeWidth={node.accent ? 1.75 : 1}
      />
      <text x={x + 16} y={y + 28} className="fill-neutral-100" fontSize="14" fontWeight="600">
        {node.title}
      </text>
      {node.lines.map((line, i) => (
        <text key={line} x={x + 16} y={y + 50 + i * 16} className="fill-neutral-400 font-mono" fontSize="11.5">
          {line}
        </text>
      ))}
    </g>
  );

  const arrow = "url(#nd-arrow)";

  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="nd-pipe-title nd-pipe-desc" className="w-full h-auto min-w-[36rem]">
      <title id="nd-pipe-title">NeuroDrive pipeline: from OpenStreetMap data to the next generation of drivers</title>
      <desc id="nd-pipe-desc">
        Once per scenario, OpenStreetMap data becomes a directed road graph and A* plans a route with waypoints about every
        15 metres. Every frame, each car&apos;s sensors produce 12 inputs for a 12-14-2 network, which steers and works the
        pedal through metric car physics. At the end of a generation, fitness scores metres progressed along the route plus
        1000 for arriving, and evolution keeps the top five brains and mutates copies of them for the next generation.
      </desc>
      <defs>
        <marker id="nd-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 z" fill="#737373" />
        </marker>
        <linearGradient id="nd-loop" gradientUnits="userSpaceOnUse" x1={col(0)} y1="0" x2={col(3) + BW} y2="0">
          <stop offset="0" stopColor={PURPLE} />
          <stop offset="1" stopColor={BLUE} />
        </linearGradient>
      </defs>

      {/* Row labels */}
      <text x="0" y="24" className="fill-neutral-500" fontSize="12">
        Once per scenario
      </text>
      <text x={W} y="24" textAnchor="end" className="fill-neutral-500" fontSize="12">
        Every frame, 100 cars
      </text>

      {/* Top row arrows (left to right) */}
      {[0, 1, 2].map((i) => (
        <line
          key={`t${i}`}
          x1={col(i) + BW + 4}
          x2={col(i + 1) - 6}
          y1={rows.top + BH / 2}
          y2={rows.top + BH / 2}
          stroke="#737373"
          strokeWidth="1.5"
          markerEnd={arrow}
        />
      ))}

      {/* Sensors down into the network */}
      <line
        x1={col(3) + BW / 2}
        x2={col(3) + BW / 2}
        y1={rows.top + BH + 4}
        y2={rows.bottom - 6}
        stroke="#737373"
        strokeWidth="1.5"
        markerEnd={arrow}
      />

      {/* Bottom row arrows (right to left) */}
      {[3, 2, 1].map((i) => (
        <line
          key={`b${i}`}
          x1={col(i) - 4}
          x2={col(i - 1) + BW + 6}
          y1={rows.bottom + BH / 2}
          y2={rows.bottom + BH / 2}
          stroke="#737373"
          strokeWidth="1.5"
          markerEnd={arrow}
        />
      ))}

      {/* Next-generation loop: evolution back into the network */}
      <path
        d={`M${col(0) + BW / 2},${rows.bottom + BH + 4} V${H - 30} H${col(3) + BW / 2} V${rows.bottom + BH + 8}`}
        fill="none"
        stroke="url(#nd-loop)"
        strokeWidth="1.75"
        strokeDasharray="5 5"
        markerEnd={arrow}
      />
      <text x={W / 2} y={H - 8} textAnchor="middle" className="fill-neutral-400 font-mono" fontSize="12">
        new brains for the next generation
      </text>

      {TOP.map((node, i) => (
        <Box key={node.title} x={col(i)} y={rows.top} node={node} />
      ))}
      {BOTTOM.map((node, i) => (
        <Box key={node.title} x={col(i)} y={rows.bottom} node={node} />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Problem cards                                                       */
/* ------------------------------------------------------------------ */

function ProblemCard({ index, title, children, fixes }) {
  return (
    <Panel className="p-6 sm:p-7 hover:border-blue-500/30 transition-colors duration-300">
      <h3 className="flex items-baseline gap-3 font-semibold text-white text-xl mb-4">
        <span className="font-mono text-sm text-blue-400">{String(index).padStart(2, "0")}</span>
        {title}
      </h3>
      <div className="space-y-4 text-base text-neutral-300 leading-relaxed">
        {children}
        {fixes && (
          <>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-neutral-400 pt-1">The fix</p>
            <Bullets items={fixes} className="space-y-3" />
          </>
        )}
      </div>
    </Panel>
  );
}

/* ------------------------------------------------------------------ */
/* Page body                                                           */
/* ------------------------------------------------------------------ */

const SECTIONS = [
  ["summary", "Summary"],
  ["problem", "Problem and goal"],
  ["built", "What I built"],
  ["how", "How it works"],
  ["problems", "Problems I had to solve"],
  ["results", "What it showed"],
  ["shipping", "Shipping at $0"],
  ["learned", "What I learned and what's next"],
];

export default function NeuroDriveCaseStudy({ project, links }) {
  const n = Object.fromEntries(SECTIONS.map(([id], i) => [id, i + 1]));
  const title = Object.fromEntries(SECTIONS);

  return (
    <div className="space-y-20">
      <OnThisPage sections={SECTIONS} />

      <Section id="summary" index={n.summary} title={title.summary}>
        <p>
          I built a browser simulator where 100 neural-network drivers learn to drive on the real Melbourne CBD. The streets,
          one-way laneways and traffic signals come from OpenStreetMap, A* plans each route, and the cars learn lane keeping,
          turns and full routes from scratch through neuroevolution, with no gradients. It costs $0 to run: static files, no
          backend and no API keys.
        </p>
        <StackPanel
          items={[
            ["Simulation", "Plain JavaScript and HTML Canvas"],
            ["3D explainer", "three.js, lazy-loaded"],
            ["Data and hosting", "OpenStreetMap and Netlify"],
          ]}
        />
      </Section>

      <Section id="problem" index={n.problem} title={title.problem}>
        <p>
          Most self-driving demos run on a made-up track. I wanted cars to learn on streets people in Melbourne actually
          know, with the rules that make them hard: one-way Little streets, signals at real intersections and other traffic.
        </p>
        <p>
          The goal was <span className="text-white font-medium">a learning agent on real map data, running in the browser, for $0.</span>
        </p>
        <CardGrid
          items={[
            ["Real streets", "OpenStreetMap geometry projected to metres, not a hand-drawn track."],
            ["Real scale", "Car size, speed limit and braking in metric units."],
            ["No backend", "Static files only, so nothing can break or cost money."],
            ["Learns in front of you", "Training happens live in the visitor's browser."],
          ]}
        />
      </Section>

      <Section id="built" index={n.built} title={title.built}>
        <p>
          A script queries the OpenStreetMap Overpass API for the Hoddle Grid and its surrounds, projects everything to
          metres around the CBD, and writes one JSON file that the page loads.
        </p>
        <DataTable
          label="Map data in data/melbourne-cbd.json"
          columns={["Map data", "Count"]}
          rows={[
            ["Roads", <span key="r"><Mono>2,322</Mono> <span className="text-neutral-500">(1,584 one-way)</span></span>],
            ["Buildings", <Mono key="b">2,706</Mono>],
            ["Traffic signals", <Mono key="s">517</Mono>],
            ["Tram lines", <Mono key="t">244</Mono>],
            ["Landmarks", <Mono key="l">6</Mono>],
            ["File size", <span key="f"><Mono>0.64 MB</Mono> <span className="text-neutral-500">of JSON</span></span>],
          ]}
        />
        <p>The engine on top of it has five parts.</p>
        <Bullets
          items={[
            <Lead key="graph" label="Road graph">
              roads are split at junctions into a directed graph, so one-way streets only run one way.
            </Lead>,
            <Lead key="router" label="A* router">
              plans the shortest legal route between landmarks, with waypoints about every 15 m.
            </Lead>,
            <Lead key="car" label="Car physics">
              a 4.5 m by 1.9 m car with realistic acceleration and braking, steering that tightens with speed, and the 40
              km/h CBD limit.
            </Lead>,
            <Lead key="signals" label="Signals and traffic">
              signals cycle on the real signal nodes, and AI cars follow the graph at the limit with a following distance.
            </Lead>,
            <Lead key="evo" label="Evolution">
              scores every car at the end of a generation and breeds the next 100.
            </Lead>,
          ]}
        />
        <p>
          I built it with two AI coding tools working from one shared contract, <Code>SPEC.md</Code>. Claude Code wrote the
          engine (data fetch, graph, routing, physics, sensors and evolution) and Antigravity wrote the UI (page, map
          renderer, minimap and 3D explainer). Each file had exactly one owner, and any change to the interface between
          them went into the spec first.
        </p>
      </Section>

      <Section id="how" index={n.how} title={title.how}>
        <p>
          Each generation, 100 cars start on the same route. Every frame, each car reads its sensors, runs its network and
          drives. When every car has crashed, arrived or run out of time, the best brains are kept and the rest are replaced
          with mutated copies.
        </p>
        <ChartPanel
          title="How one generation runs"
          subtitle="The map and route are built once per scenario; the loop below runs every frame"
          label="NeuroDrive pipeline diagram"
        >
          <PipelineDiagram />
        </ChartPanel>
        <DataTable
          label="Driver design"
          columns={["Component", "Design"]}
          rows={[
            [
              "Inputs (12)",
              <span key="inputs" className="flex flex-col gap-1">
                <span>7 ray distances to the road edge or a traffic car</span>
                <span>Speed</span>
                <span>Sine and cosine of the bearing to the next waypoint</span>
                <span>Distance to the next signal, and its state</span>
              </span>,
            ],
            ["Network", <span key="net"><Mono>[12, 14, 2]</Mono>, tanh</span>],
            ["Outputs (2)", "Steering, and accelerate or brake"],
            ["Population", "100 cars per generation"],
          ]}
        />
        <p>
          There are no gradients. A car&apos;s fitness is the metres it progressed along its route, plus 1000 if it arrived.
          A car that breaks a rule is retired on the spot with a penalty.
        </p>
        <DataTable
          label="Ways a car is retired, with the fitness penalty"
          columns={["Retired for", "Penalty"]}
          rows={[
            ["Running a red light", <Mono key="red">−100</Mono>],
            ["Wrong way on a one-way street", <Mono key="w">−60</Mono>],
            ["Collision", <Mono key="c">−50</Mono>],
            ["Leaving the road", <Mono key="o">−30</Mono>],
            ["Stalling", <Mono key="s">−20</Mono>],
            [
              "Leaving the route",
              <span key="l">
                <Mono>−20</Mono> <span className="text-neutral-500">(more than 15 m from it)</span>
              </span>,
            ],
          ]}
        />
        <p>
          The cars work through a curriculum. When 70% of a generation arrives, the next scenario unlocks automatically, and
          the brains carry over.
        </p>
        <DataTable
          label="Curriculum scenarios"
          columns={["Scenario", "Route", "Length"]}
          minWidth="min-w-[36rem]"
          rows={[
            ["01 Swanston St straight", "One block of Swanston St, Little Collins St to Collins St", <Mono key="1">109 m</Mono>],
            ["02 First turn", "Left from Swanston St into Collins St, as far as Russell St", <Mono key="2">331 m</Mono>],
            ["03 Station to Market", "Flinders Street Station to Queen Victoria Market", <Mono key="3">1.8 km</Mono>],
            ["04 Rush hour", "The same route with traffic and live signals", <Mono key="4">1.8 km</Mono>],
            ["05 CBD loop", "Flinders Street, Southern Cross, Melbourne Central and back, in traffic", <Mono key="5">6.3 km</Mono>],
          ]}
        />
        <Screenshot image={ROUTE_SHOT} sizes={BODY_SIZES} />
        <p>
          The live page also has an interactive 3D explainer of the same pipeline, built with three.js. It loads only when
          scrolled into view, so the simulation starts straight away, and its Evolution station updates with each new
          generation.
        </p>
        <Screenshot image={PIPELINE_SHOT} sizes={BODY_SIZES} />
      </Section>

      <Section id="problems" index={n.problems} title={title.problems}>
        <p>
          Most of the work went into getting cars to drive a real route rather than game the rules. These are the four
          problems that took the longest.
        </p>
        <div className="space-y-4">
          <ProblemCard
            index={1}
            title="Standing still was the safest strategy"
            fixes={[
              "A car stopped for 3 seconds with no red light or car close ahead is retired for stalling.",
              "A car that gains no route progress for 15 seconds is retired too. The clock pauses at red lights and in queues, so waiting for a good reason is never punished.",
            ]}
          >
            <p>
              A car that does not move never crashes or breaks a rule, so early generations learned that doing very little
              was a safe score.
            </p>
          </ProblemCard>

          <ProblemCard
            index={2}
            title="Cars never learned the first turn"
            fixes={[
              <Lead key="junction" label="Roomier junctions">
                every real junction gets a disc of drivable space 3 m wider than the road, because CBD intersections are
                far roomier than two crossing ribbons with sharp inner corners.
              </Lead>,
              <Lead key="target" label="A smooth target">
                instead of jumping between 15 m waypoints, the network steers towards a point 5 m plus 0.6 seconds of
                travel ahead, so a corner shows up in time to brake.
              </Lead>,
              <Lead key="drag" label="Speed-dependent drag">
                full throttle tops out at exactly 40 km/h and cruise speed follows the pedal smoothly (80% gives about 35
                km/h), so slowing down is a small change evolution can find.
              </Lead>,
              <Lead key="parents" label="Five parents, not one">
                the top five cars breed the next generation, which keeps the population from collapsing onto one fragile
                winner.
              </Lead>,
              <Lead key="mutation" label="Gentler mutation once cars arrive">
                mutation drops to 20% of its setting, so a working driver is refined rather than wrecked.
              </Lead>,
            ]}
          >
            <p>
              Cars solved the straight block quickly, then stalled at the first turn. Braking for a corner gave no advantage over flooring
              it, so the generations that slowed down did no better and the behaviour never spread.
            </p>
          </ProblemCard>

          <ProblemCard index={3} title="Swanston Street is mostly trams-only">
            <p>
              My first scenario was meant to be a straight run up Swanston Street. OpenStreetMap tags most of it as
              trams-only, which matches reality, and the data script honours car restrictions, so those blocks are not in
              the drivable map. The first two scenarios now use the blocks cars are allowed to drive: one block of Swanston
              St from Little Collins St to Collins St, then a left turn into Collins St.
            </p>
          </ProblemCard>

          <ProblemCard index={4} title="100 cars at 60 fps">
            <p>
              Every frame, every car casts 7 rays against the road edges and checks that all four corners are still on the
              road, across thousands of road segments. Those are indexed in a spatial hash grid, so each query only looks
              at nearby cells, and the static map is pre-rendered to offscreen canvases. That keeps 100 cars at 60 fps.
            </p>
          </ProblemCard>
        </div>
      </Section>

      <Section id="results" index={n.results} title={title.results}>
        <p>
          I ran the engine headless six times, each run starting at scenario 1, to check that the curriculum is learnable.
        </p>
        <DataTable
          label="Headless test runs, 6 runs from scenario 1"
          columns={["Scenario", "Across 6 test runs"]}
          minWidth="min-w-[32rem]"
          rows={[
            ["01 Swanston St straight", "Solved within 1 to 7 generations, every run"],
            ["02 First turn", "Cars reached the destination in 5 of 6 runs, a median of about 9 generations after the scenario started"],
            ["03 Station to Market", "Reached by 3 runs"],
            ["04 Rush hour", "Reached by 1 run"],
          ]}
        />
        <p className="flex items-start gap-2.5 p-4 rounded-xl bg-neutral-900/50 border border-neutral-800 text-base text-neutral-400">
          <Info size={16} aria-hidden="true" className="mt-1 shrink-0 text-indigo-300" />
          <span>
            These are six test runs, not a benchmark. Neuroevolution is random, so results vary from run to run and in the
            browser.
          </span>
        </p>
        <Callout
          id="nd-limits"
          items={[
            <Lead key="trams" label="No trams">
              the map has the tram lines, but no tram vehicles are simulated, so the rays never detect a tram.
            </Lead>,
            <Lead key="loop" label="The CBD loop is slow">
              at 6.3 km, one generation of the last scenario takes minutes.
            </Lead>,
            <Lead key="wait" label="Learning takes a few minutes">
              every visitor starts from scratch on first load. A saved brain stays in that visitor&apos;s browser and is
              not shared.
            </Lead>,
          ]}
        />
      </Section>

      <Section id="shipping" index={n.shipping} title={title.shipping}>
        <p>
          The site is static: <Code>index.html</Code>, a stylesheet, plain JavaScript modules and the map JSON, with no build
          step. three.js comes from a pinned CDN version and is only loaded for the 3D explainer. Map data is © OpenStreetMap
          contributors under the ODbL, credited in the page footer and the README.
        </p>
        <DataTable
          label="Running costs"
          columns={["Item", "Cost"]}
          rows={[
            ["Compute", <span key="c"><Mono>$0</Mono> <span className="text-neutral-500">(the visitor&apos;s browser)</span></span>],
            ["Hosting", <span key="h"><Mono>$0</Mono> <span className="text-neutral-500">(free static hosting)</span></span>],
            ["Map data", <span key="m"><Mono>$0</Mono> <span className="text-neutral-500">(OpenStreetMap, ODbL)</span></span>],
            ["Backend and API keys", "None needed"],
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
                "Most of the work was in the rules and the physics, not the network. Cars only learned to turn once slowing down was a small change that paid off.",
                "Evolution exploits every gap in the rules, so each penalty needs a reason a car can avoid it.",
                "Real data brings real rules: Swanston Street being trams-only changed my curriculum.",
                "A written contract with strict file ownership kept two AI tools building the engine and the UI in step.",
              ],
            },
            {
              heading: "What's next",
              icon: ArrowRight,
              items: [
                "Simulate trams, so the rays have something to detect on tram streets.",
                "Commit the headless test script and report results over more runs.",
                "Ship a pre-trained brain, so visitors can watch a skilled driver without waiting.",
                "Speed up the CBD loop scenario, for example by running generations faster than real time.",
              ],
            },
          ]}
        />
      </Section>

      <ClosingCta
        title="Watch cars learn the Hoddle Grid"
        text="Run the simulation in the live demo, or read the engine on GitHub."
        links={links}
      />
    </div>
  );
}
