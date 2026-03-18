'use client';
import { useEffect, useRef } from 'react';

class Particle {
  position;
  image;

  constructor(x, y, image) {
    this.position = { x, y };
    this.image = image;
  }

  move(context) {
    context.drawImage(this.image, this.position.x, this.position.y);
  }
}

const CURSOR_SVG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='24' viewBox='0 0 16 24'%3E%3Cpolygon points='2,2 2,20 6,15 9,22 11,20 8,12 14,12' fill='%23FFAB55'/%3E%3C/svg%3E";

const TrailingCursor = ({
  element,
  particles = 15,
  rate = 0.4,
  baseImageSrc = CURSOR_SVG,
}) => {
  const canvasRef = useRef(null);
  const cursorRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef([]);
  const animationFrameRef = useRef(undefined);
  const cursorsInittedRef = useRef(false);
  const nativeCursorZoneRef = useRef(false);

  useEffect(() => {
    const baseImage = new Image();
    baseImage.src = baseImageSrc;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    );
    const hasWrapperEl = element !== undefined;
    const targetElement = hasWrapperEl ? element : document.body;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    if (!context) return;
    canvasRef.current = canvas;
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '10000';
    if (hasWrapperEl) {
      canvas.style.position = 'absolute';
      targetElement.appendChild(canvas);
      canvas.width = targetElement.clientWidth;
      canvas.height = targetElement.clientHeight;
    } else {
      canvas.style.position = 'fixed';
      document.body.appendChild(canvas);
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    const onMouseMove = (e) => {
      nativeCursorZoneRef.current = Boolean(
        e.target instanceof Element && e.target.closest('[data-native-cursor]')
      );

      if (nativeCursorZoneRef.current) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      if (hasWrapperEl && element) {
        const boundingRect = element.getBoundingClientRect();
        cursorRef.current.x = e.clientX - boundingRect.left;
        cursorRef.current.y = e.clientY - boundingRect.top;
      } else {
        cursorRef.current.x = e.clientX;
        cursorRef.current.y = e.clientY;
      }
      if (cursorsInittedRef.current === false) {
        cursorsInittedRef.current = true;
        for (let i = 0; i < particles; i++) {
          particlesRef.current.push(
            new Particle(cursorRef.current.x, cursorRef.current.y, baseImage)
          );
        }
      }
    };
    const onWindowResize = () => {
      if (hasWrapperEl && element) {
        canvas.width = element.clientWidth;
        canvas.height = element.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    const updateParticles = () => {
      if (nativeCursorZoneRef.current) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      context.clearRect(0, 0, canvas.width, canvas.height);
      let x = cursorRef.current.x;
      let y = cursorRef.current.y;
      particlesRef.current.forEach((particle, index) => {
        const nextParticle =
          particlesRef.current[index + 1] || particlesRef.current[0];
        particle.position.x = x;
        particle.position.y = y;
        particle.move(context);
        x += (nextParticle.position.x - particle.position.x) * rate;
        y += (nextParticle.position.y - particle.position.y) * rate;
      });
    };
    const loop = () => {
      updateParticles();
      animationFrameRef.current = requestAnimationFrame(loop);
    };
    if (!prefersReducedMotion.matches) {
      targetElement.addEventListener('mousemove', onMouseMove);
      window.addEventListener('resize', onWindowResize);
      loop();
    }
    return () => {
      if (canvasRef.current) {
        canvasRef.current.remove();
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      targetElement.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onWindowResize);
    };
  }, [element, particles, rate, baseImageSrc]);
  return null;
};
export default TrailingCursor;
