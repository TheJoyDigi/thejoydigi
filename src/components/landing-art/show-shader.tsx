import React, { useRef } from "react";
import { useShader } from "./shaders";

const FRAG = `#version 300 es
precision highp float;
out vec4 o;
uniform vec2 uRes, uMouse, uCenter;
uniform float uTime, uRipple, uAurora, uLight, uPoster, uFreq, uLobes, uFade;
uniform vec3 uC1, uC2, uC3;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(1.7, 9.2); a *= 0.5; }
  return v;
}
vec3 pal(float x) {
  x = fract(x) * 3.0;
  return x < 1.0 ? mix(uC1, uC2, x) : x < 2.0 ? mix(uC2, uC3, x - 1.0) : mix(uC3, uC1, x - 2.0);
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec2 c = (uCenter - 0.5) * vec2(uRes.x / uRes.y, 1.0) + uMouse * 0.04;
  float t = uTime;

  // Show mood: slow domain-warped light in the show's palette.
  vec2 w = vec2(fbm(p * 1.3 + t * 0.05), fbm(p * 1.3 - t * 0.05 + 4.0));
  float n = fbm(p * 1.7 + w * 1.5);
  if (uPoster > 0.5) n = floor(n * 6.0) / 6.0;
  float aur = smoothstep(0.42, 0.95, n) * uAurora;

  // Joy Digi signature: the logo's wavy concentric ripples, swirling out from the focal point.
  vec2 d = p - c;
  float r = length(d), a = atan(d.y, d.x);
  float rr = r * (1.0 + 0.06 * sin(uLobes * a + t * 0.35 + r * 4.0) + 0.03 * sin((uLobes - 3.0) * a - t * 0.5));
  float f = rr * uFreq - t * 0.12;
  float s = abs(fract(f) - 0.5);
  float aa = fwidth(f) * 1.2;
  float line = 1.0 - smoothstep(0.07 - aa, 0.07 + aa, s);
  if (uPoster > 0.5) line = step(s, 0.16);
  float fade = exp(-r * r * uFade * uFade) * smoothstep(0.0, 0.12, r);
  float glint = 0.45 + 0.55 * pow(0.5 + 0.5 * sin(a * 2.0 - t * 0.5 + floor(f) * 0.8), 2.0);
  float ring = line * fade * glint * uRipple;
  vec3 ringC = pal(floor(f) / 6.0 + t * 0.01);
  vec3 aurC = pal(n * 1.4 + t * 0.02);

  float edge = smoothstep(0.0, 0.22, gl_FragCoord.y / uRes.y);
  ring *= edge;
  aur *= edge;
  float g = (hash(gl_FragCoord.xy + fract(t) * 61.0) - 0.5) * 0.035;
  if (uLight > 0.5) {
    // Light grounds: pigment over the page (premultiplied, alpha = coverage).
    float A = clamp(ring * 0.9 + aur * 0.35, 0.0, 1.0);
    vec3 col = (ringC * ring * 0.9 + aurC * aur * 0.35) / max(A, 1e-4);
    o = vec4(col * A, A);
  } else {
    // Dark grounds: additive light only, so the show's own background shows through.
    vec3 col = ringC * ring + aurC * aur * 0.55 + g * (aur + ring);
    o = vec4(max(col, 0.0), 0.0);
  }
}`;

const rgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
};

export type ShowShaderProps = {
  /** Three show colours the ripples and light cycle through. */
  colors: [string, string, string];
  /** Ripple focal point in 0..1 of the box (x, y from bottom-left). */
  center?: [number, number];
  ripple?: number;
  aurora?: number;
  /** Ring density and lobes of the wavy edge. */
  freq?: number;
  lobes?: number;
  /** How fast the rings fade with distance from the focal point. */
  fade?: number;
  light?: boolean;
  /** Flat stepped bands for playful, game-like shows. */
  poster?: boolean;
  speed?: number;
  className?: string;
};

/** The Joy Digi ripple signature rendered in a show's own palette and mood. */
export function ShowShader({
  colors,
  center = [0.75, 0.6],
  ripple = 0.5,
  aurora = 0.5,
  freq = 22,
  lobes = 9,
  fade = 1.9,
  light = false,
  poster = false,
  speed = 1,
  className = "",
}: ShowShaderProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useShader(
    ref,
    FRAG,
    {
      uC1: rgb(colors[0]),
      uC2: rgb(colors[1]),
      uC3: rgb(colors[2]),
      uCenter: center,
      uRipple: ripple,
      uAurora: aurora,
      uFreq: freq,
      uLobes: lobes,
      uFade: fade,
      uLight: light ? 1 : 0,
      uPoster: poster ? 1 : 0,
      uSpeed: speed,
    },
    { maxPixels: 1.4e6, follow: true }
  );
  return <canvas ref={ref} aria-hidden style={{ opacity: 0 }} className={`pointer-events-none absolute inset-0 block h-full w-full ${className}`} />;
}
