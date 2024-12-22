export const LineChart = ({ data }: { data: number[] }) => {
    const maxY = Math.max(...data, 1);
    const height = 300;
    const width = 1200;
    const padding = 55;

    const points = data
        .map((value, index) => {
            const x = (index / data.length) * (width - 2 * padding) + padding;
            const y = height - (value / maxY) * (height - 2 * padding) - padding;
            return `${x},${y}`;
        })
        .join(" ");

    return (
        <svg
            className="border mt-4"
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            {/* Axes */}
            <line
                x1={padding}
                y1={height - padding}
                x2={width - padding}
                y2={height - padding}
                stroke="black"
            />
            <line
                x1={padding}
                y1={padding}
                x2={padding}
                y2={height - padding}
                stroke="black"
            />

            {/* X-Axis Label */}
            <text
                x={width / 2}
                y={height - 5}
                textAnchor="middle"
                fontSize="12"
                fill="black"
            >
                Time (15 min. int.)
            </text>

            {/* Y-Axis Label */}
            <text
                x={-height / 2}
                y={15}
                textAnchor="middle"
                fontSize="12"
                fill="black"
                transform="rotate(-90)"
            >
                Power Demand (kW)
            </text>

            {/* Chart Line */}
            <polyline fill="none" stroke="blue" strokeWidth="2" points={points} />

            {/* Points */}
            {data.map((value, index) => {
                const x = (index / data.length) * (width - 2 * padding) + padding;
                const y = height - (value / maxY) * (height - 2 * padding) - padding;
                return (
                    <g key={index}>
                        {/* Dot */}
                        <circle cx={x} cy={y} r={3} fill="blue" />
                        {/* Value Display */}
                        <text
                            x={x}
                            y={y - 10}
                            textAnchor="middle"
                            fontSize="10"
                            fill="black"
                        >
                            {value.toFixed(1)}
                        </text>
                    </g>
                );
            })}

            {/* X-Axis Ticks */}
            {data.map((_, index) => {
                const x = (index / data.length) * (width - 2 * padding) + padding;
                if (index % 8 === 0) {
                    return (
                        <text
                            key={`x-tick-${index}`}
                            x={x}
                            y={height - padding + 15}
                            textAnchor="middle"
                            fontSize="10"
                            fill="black"
                        >
                            {index}
                        </text>
                    );
                }
                return null;
            })}

            {/* Y-Axis Ticks */}
            {[0, maxY / 2, maxY].map((value, index) => {
                const y =
                    height - (value / maxY) * (height - 2 * padding) - padding;
                return (
                    <text
                        key={`y-tick-${index}`}
                        x={padding - 10}
                        y={y + 5}
                        textAnchor="end"
                        fontSize="10"
                        fill="black"
                    >
                        {value.toFixed(1)}
                    </text>
                );
            })}
        </svg>
    );
};