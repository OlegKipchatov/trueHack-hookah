const React = require("react");

const DEFAULT_COLORS = [
  "#F87171",
  "#60A5FA",
  "#34D399",
  "#FBBF24",
  "#A78BFA",
  "#F472B6",
  "#38BDF8",
  "#FB7185",
];

const toRadians = (angle) => (Math.PI / 180) * angle;

const getPoint = (cx, cy, radius, angle) => {
  const rad = toRadians(angle - 90);
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
};

const formatNumber = (value) => Math.round(value * 1000) / 1000;

const createDonutSegmentPath = (cx, cy, innerRadius, outerRadius, startAngle, endAngle) => {
  if (outerRadius <= 0 || endAngle <= startAngle) {
    return "";
  }

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const startOuter = getPoint(cx, cy, outerRadius, startAngle);
  const endOuter = getPoint(cx, cy, outerRadius, endAngle);
  const outerPath = [
    "M",
    formatNumber(startOuter.x),
    formatNumber(startOuter.y),
    "A",
    formatNumber(outerRadius),
    formatNumber(outerRadius),
    0,
    largeArcFlag,
    1,
    formatNumber(endOuter.x),
    formatNumber(endOuter.y),
  ];

  if (innerRadius > 0) {
    const startInner = getPoint(cx, cy, innerRadius, endAngle);
    const endInner = getPoint(cx, cy, innerRadius, startAngle);

    return outerPath
      .concat([
        "L",
        formatNumber(startInner.x),
        formatNumber(startInner.y),
        "A",
        formatNumber(innerRadius),
        formatNumber(innerRadius),
        0,
        largeArcFlag,
        0,
        formatNumber(endInner.x),
        formatNumber(endInner.y),
        "Z",
      ])
      .join(" ");
  }

  return outerPath.concat(["L", formatNumber(cx), formatNumber(cy), "Z"]).join(" ");
};

const getValue = (entry, accessor) => {
  if (!entry || accessor == null) {
    return 0;
  }

  if (typeof accessor === "function") {
    return accessor(entry);
  }

  if (typeof accessor === "string") {
    const keys = accessor.split(".");
    return keys.reduce((acc, key) => {
      if (acc == null) {
        return undefined;
      }
      return acc[key];
    }, entry);
  }

  return 0;
};

const PieChart = ({ width = 400, height = 400, children, style, className }) => {
  const sharedSize = { width, height };

  return React.createElement(
    "svg",
    {
      width,
      height,
      viewBox: `0 0 ${width} ${height}`,
      style,
      className,
    },
    React.Children.map(children, (child) =>
      React.isValidElement(child) ? React.cloneElement(child, sharedSize) : child,
    ),
  );
};

const Pie = (props) => {
  const {
    data = [],
    dataKey = "value",
    nameKey = "name",
    innerRadius = 0,
    outerRadius,
    paddingAngle = 0,
    children,
    width = 0,
    height = 0,
    startAngle = 0,
    endAngle = 360,
    cx,
    cy,
    label,
    labelStyle,
    className,
  } = props;

  if (!width || !height) {
    return null;
  }

  const centerX = typeof cx === "number" ? cx : width / 2;
  const centerY = typeof cy === "number" ? cy : height / 2;
  const outer = typeof outerRadius === "number" ? outerRadius : Math.min(width, height) / 2;
  const inner = Math.max(0, innerRadius);
  const normalizedPadding = Math.max(0, paddingAngle);
  const total = data.reduce((sum, entry) => {
    const value = Number(getValue(entry, dataKey)) || 0;
    return value > 0 ? sum + value : sum;
  }, 0);

  if (total <= 0) {
    return React.createElement("g", null);
  }

  const cellDefinitions = [];
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type && child.type.displayName === "__RechartsCell") {
      cellDefinitions.push(child.props);
    }
  });

  let currentAngle = startAngle;
  const slices = [];
  const labels = [];

  data.forEach((entry, index) => {
    const value = Number(getValue(entry, dataKey)) || 0;
    if (value <= 0) {
      return;
    }

    const angleShare = (value / total) * (endAngle - startAngle);
    const sliceStart = currentAngle;
    const sliceEnd = currentAngle + angleShare;
    currentAngle = sliceEnd;

    const paddedStart = sliceStart + normalizedPadding / 2;
    const paddedEnd = sliceEnd - normalizedPadding / 2;

    if (paddedEnd <= paddedStart) {
      return;
    }

    const path = createDonutSegmentPath(centerX, centerY, inner, outer, paddedStart, paddedEnd);
    const fill = cellDefinitions[index]?.fill ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length];

    slices.push(
      React.createElement("path", {
        key: `slice-${index}`,
        d: path,
        fill,
        className,
      }),
    );

    if (typeof label === "function") {
      const midAngle = (paddedStart + paddedEnd) / 2;
      const labelRadius = inner + (outer - inner) / 2;
      const point = getPoint(centerX, centerY, labelRadius, midAngle);
      labels.push(
        React.createElement(
          "text",
          {
            key: `label-${index}`,
            x: formatNumber(point.x),
            y: formatNumber(point.y),
            fill: labelStyle?.fill ?? "#111827",
            textAnchor: "middle",
            dominantBaseline: "middle",
            style: labelStyle,
          },
          label({
            index,
            value,
            percent: value / total,
            name: getValue(entry, nameKey),
            payload: entry,
          }),
        ),
      );
    }
  });

  return React.createElement("g", null, [...slices, ...labels]);
};

const Cell = () => null;
Cell.displayName = "__RechartsCell";

const Tooltip = () => null;

module.exports = {
  PieChart,
  Pie,
  Cell,
  Tooltip,
};
