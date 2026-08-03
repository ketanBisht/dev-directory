'use client';

import { useState } from 'react';

interface ToolLogoProps {
  url: string;
  name: string;
  fallbackText: string;
  fallbackColor: string;
  size?: number;        // pixel size for the container
  className?: string;
}

/**
 * Shows a real company logo via Clearbit → Google Favicons → colored text fallback.
 * All three endpoints are CORS-safe and require no API key.
 */
export default function ToolLogo({
  url,
  name,
  fallbackText,
  fallbackColor,
  size = 40,
  className = '',
}: ToolLogoProps) {
  const domain = url.replace(/^https?:\/\//, '').split('/')[0];
  const clearbitUrl = `https://logo.clearbit.com/${domain}`;
  const faviconUrl  = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;

  const [src, setSrc]     = useState<string>(clearbitUrl);
  const [failed, setFailed] = useState(false);

  const style = { width: size, height: size, minWidth: size, minHeight: size };

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center rounded-xl font-black text-white text-sm ${className}`}
        style={{ ...style, backgroundColor: fallbackColor }}
        aria-label={name}
      >
        {fallbackText.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${name} logo`}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      style={style}
      onError={() => {
        if (src === clearbitUrl) {
          setSrc(faviconUrl);   // try Google fallback
        } else {
          setFailed(true);      // show colored text avatar
        }
      }}
    />
  );
}
