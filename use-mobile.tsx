import * as React from "react"

const MOBILE_BREAKPOINT = 768; // Define your mobile breakpoint here

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`); // Use MOBILE_BREAKPOINT - 1 for max-width

    mql.addEventListener("change", checkIsMobile);
    checkIsMobile(); // Initial check
    return () => mql.removeEventListener("change", checkIsMobile);
  }, []);

  return !!isMobile;
}
