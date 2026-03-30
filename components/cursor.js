'use client';
import { useEffect } from 'react';

const buildCursorSVG = () => {
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="28" viewBox="0 0 24 32">
    <polygon 
      points="3,3 3,24 8,18 12,28 15,25 11,16 18,16"
      fill="#fe9021"
      stroke="#000000"
      stroke-width="0.8onw"
      stroke-linejoin="round"
    />
  </svg>`;

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const Cursor = () => {
  useEffect(() => {
    const cursorSVG = buildCursorSVG();
    
    // Create a style element to override all cursor styles
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: url("${cursorSVG}") 0 0, auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
};

export default Cursor;