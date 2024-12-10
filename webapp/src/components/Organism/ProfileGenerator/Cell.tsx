import * as React from "react";

const Cell = (props) => {
  const normedSize = props.size * 0.12;
  return (
    <svg width="8" height="8">
      <rect
        x={4 - normedSize / 2}
        y={4 - normedSize / 2}
        width={normedSize}
        height={normedSize}
        fill={props.color}
        rx={(props.borderRadius * normedSize) / 100}
      />
    </svg>
  );
};

export default Cell;
