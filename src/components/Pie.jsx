import * as d3 from "d3";

function Pie({ data, title, titleColor }) {
  const WIDTH = 500;
  const HEIGHT = 500;
  const MARGIN = 30;
  const RADIUS = Math.min(WIDTH, HEIGHT) / 2 - MARGIN;
  const colours = ["--red-color", "--blue-color"];
  const pieGenerator = d3.pie().value((d) => d.value);

  const pie = pieGenerator(data);

  const arcPathGenerator = d3.arc();

  const arcs = pie.map((p) => ({
    name: p.data.name,
    arc: arcPathGenerator({
      innerRadius: 0,
      outerRadius: RADIUS,
      startAngle: p.startAngle,
      endAngle: p.endAngle,
    }),
  }));

  console.log(arcs);

  return (
    <svg className="pieChart" width={WIDTH} height={HEIGHT}>
      <g transform={`translate(${WIDTH / 2}, ${HEIGHT / 2})`}>
        {arcs.map((arc, i) => {
          return (
            <path id={arc.name} key={i} d={arc.arc} fill={`var(${colours[i]})`} stroke={`var(--${titleColor}-color)`} strokeDasharray={0} strokeWidth={4} strokeLinecap="round"/>
          );
        })}
      </g>
      <text
        transform={`translate(${WIDTH / 2.75}, ${HEIGHT})`}
        fill={`var(--${titleColor}-color)`}
        fontSize={`1.5rem`}
      >
        {title}
      </text>
    </svg>
  );
}

export default Pie;
