import React from "react";

interface VerifiedBadgeProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  tickColor?: string;
}

export default function VerifiedBadge({
  size = 16,
  color = "#0095F6",
  tickColor = "white",
  className = "",
  ...props
}: VerifiedBadgeProps) {
  const scaleFactor = size / 16;
  const tickPath = `M4.5 8L7 10.5L11.5 6`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Verified Badge"
      {...props}
    >
      <title>Verified</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0L9.99182 1.3121L12.3696 1.29622L13.3431 3.48797L15.3519 4.77336L14.9979 7.14888L16 9.32001L14.4005 11.1521L14.0717 13.5299L11.6945 14.1792L10.1176 16L8 14.6879L5.88239 16L4.30549 14.1792L1.92831 13.5299L1.59953 11.1521L0 9.32001L1.00206 7.14888L0.648112 4.77336L2.65693 3.48797L3.63039 1.29622L6.00818 1.3121L8 0Z"
        fill={color}
      />
      <path
        d={tickPath}
        stroke={tickColor}
        strokeWidth={1.5 * scaleFactor}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
