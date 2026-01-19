import React from "react";

const MoodGraph = ({ journals }) => {
  // if journals is null/undefined
  const safeJournals = journals || [];

  const sentimentCounts = {
    "Very Positive": 0,
    Positive: 0,
    Neutral: 0,
    Negative: 0,
    "Very Negative": 0,
  };

  safeJournals.forEach((j) => {
    const sentiment = (j.sentiment || "").replace(/[^a-zA-Z ]/g, "").trim();
    if (sentimentCounts[sentiment] !== undefined) sentimentCounts[sentiment]++;
  });

  const maxCount = Math.max(...Object.values(sentimentCounts), 1); // prevent div by zero

  const barColors = {
    "Very Positive": "#6ccf8c",
    Positive: "#9add92",
    Neutral: "#f2d27a",
    Negative: "#f08a65",
    "Very Negative": "#e06a6a",
  };

  return (
    <svg width="500" height="300">
      {Object.entries(sentimentCounts).map(([sentiment, count], index) => {
        const barHeight = (count / maxCount) * 200;
        const x = 50 + index * 80;
        const y = 250 - barHeight;
        return (
          <g key={sentiment}>
            <rect
              x={x}
              y={y}
              width="50"
              height={barHeight}
              fill={barColors[sentiment]}
            />
            <text x={x + 25} y={265} fontSize="12" textAnchor="middle">
              {sentiment}
            </text>
            <text x={x + 25} y={y - 5} fontSize="12" textAnchor="middle">
              {count}
            </text>
          </g>
        );
      })}
      <line x1="40" y1="250" x2="460" y2="250" stroke="#333" />
    </svg>
  );
};

export default MoodGraph;
