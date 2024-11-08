export const Logo = () => (
  <div className="flex items-center space-x-2">
    <svg
      width="50"
      height="40"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0"
    >
      <rect width="120" height="120" rx="24" fill="#0A66C2" />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="90"
        fontWeight="bold"
        fill="white"
        className=" animate-pulse"
        fontFamily="Arial, sans-serif"
      >
        R
      </text>
      <defs>
        <linearGradient
          id="gradient"
          x1="0"
          y1="0"
          x2="120"
          y2="120"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#10B981" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
    </svg>
    {/* Optional: You can uncomment the following if you want to display text next to the logo */}
    <div>
      <h1 className="text-xl hidden md:block   font-bold text-gray-800">
        Ranius
      </h1>
      <p className="text-xs  hidden md:block text-gray-600">
        Share Your Moments, Share Your Thoughts
      </p>
    </div>
  </div>
);

{
  /* */
}
