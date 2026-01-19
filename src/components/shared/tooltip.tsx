import { useState, useRef, useEffect } from 'react';

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
};

const Tooltip = ({ content, children, delay = 1000 }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute z-50 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg pointer-events-none whitespace-nowrap"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '100%',
            marginBottom: '8px',
          }}
        >
          {content}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full"
            style={{
              borderLeft: '6px solid transparent',
              borderRight: '6px solid transparent',
              borderTop: '6px solid rgb(17, 24, 39)',
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
