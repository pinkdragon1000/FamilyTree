/**
 * Shared SVG icons for the family tree app
 */
export default function Icon({ name, className, size = 24 }) {
  const props = {
    className,
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true,
  };

  switch (name) {
    case 'tree':
      return (
        <svg {...props}>
          <circle cx="12" cy="4" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <path d="M12 6.5V9M12 9L6 14M12 9L18 14" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          <circle cx="6" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        </svg>
      );

    case 'search':
      return (
        <svg {...props}>
          <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );

    case 'info':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
          <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );

    case 'cards':
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
          <rect x="14" y="14" width="7" height="7" rx="1" fill="currentColor"/>
        </svg>
      );

    default:
      return null;
  }
}
