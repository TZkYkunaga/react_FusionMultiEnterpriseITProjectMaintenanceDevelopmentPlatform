export const FusionLogo = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="8"
    >
      <path
        d="M20 50 C20 28, 40 20, 50 20 C60 20, 80 28, 80 50 C80 72, 60 80, 50 80"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-primary"
      />
      <path
        d="M80 50 C80 72, 60 80, 50 80 C40 80, 20 72, 20 50 C20 28, 40 20, 50 20"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent opacity-70"
        transform="rotate(180 50 50)"
      />
       <circle cx="50" cy="20" r="5" className="fill-primary stroke-none" />
       <circle cx="50" cy="80" r="5" className="fill-accent stroke-none opacity-70" />
    </svg>
  );
