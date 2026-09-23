import React from 'react';

interface RollingTextProps {
  text: string;
  className?: string;
  charClassName?: string;
}

export const RollingText: React.FC<RollingTextProps> = ({
  text,
  className = '',
  charClassName = '',
}) => {
  return (
    <span className={`rolling-text ${className}`} aria-label={text}>
      {text.split('').map((char, index) => {
        if (char === ' ') {
          return (
            <span key={index} className="inline-block w-[0.3em]" aria-hidden="true">
              &nbsp;
            </span>
          );
        }
        return (
          <span
            key={index}
            className={`rolling-char-wrapper ${charClassName}`}
            style={{ '--char-index': index } as React.CSSProperties}
          >
            <span className="rolling-char-inner">
              <span className="rolling-char-top">{char}</span>
              <span className="rolling-char-bottom" aria-hidden="true">
                {char}
              </span>
            </span>
          </span>
        );
      })}
    </span>
  );
};
