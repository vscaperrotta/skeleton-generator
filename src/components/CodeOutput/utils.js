/**
 * Funzione per schiarire un colore (usata anche nell'export).
 */
function lightenColor(hex, amount) {
  let color = hex.replace(/^#/, '');
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;

  r = Math.min(255, Math.round(r + (255 - r) * amount));
  g = Math.min(255, Math.round(g + (255 - g) * amount));
  b = Math.min(255, Math.round(b + (255 - b) * amount));

  return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).toUpperCase()}`;
}


function generateHTMLCSS(blocks, settings) {
  const markup = `
<div class="skeleton-container">
  ${blocks.map(block => {
    // Se animation attivo, usiamo classe "shimmer" + gradient inline
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    const shimmerClass = settings.animation ? 'shimmer' : '';

    return `
  <div
    class="skeleton-block ${shimmerClass}"
    style="
      left: ${block.x}px;
      top: ${block.y}px;
      width: ${block.width}px;
      height: ${block.height}px;
      border-radius: ${block.rx ?? 0}px;
      ${settings.animation
        ? 'background: ' + gradient + '; background-size: 1000px 100%;'
        : 'background-color: ' + block.color + ';'
      }
    "
  ></div>`;
  }).join('\n')}
</div>
`;

  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;

  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
}
`;
  }

  return { markup, css };
}

function generateReact(blocks, settings) {
  // Creiamo il "markup" = file React
  const blockDivs = blocks.map(block => {
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    const shimmerClass = settings.animation ? 'shimmer' : '';
    const styleCode = settings.animation
      ? `background: '${gradient}', backgroundSize: '1000px 100%'`
      : `backgroundColor: '${block.color}'`;

    return `
        <div
          key={${block.id}}
          className={\`skeleton-block ${shimmerClass}\`}
          style={{
            left: ${block.x},
            top: ${block.y},
            width: ${block.width},
            height: ${block.height},
            borderRadius: '${block.rx ?? 0}px',
            ${styleCode}
          }}
        />`;
  }).join('\n');

  const markup = `
import React from 'react';
import './Skeleton.css';

export default function Skeleton() {
  return (
    <div className="skeleton-container">
${blockDivs}
    </div>
  );
}
`;

  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;
  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
  /* Non definisco background qui, perché lo definiamo inline con gradient personalizzato per ogni blocco */
}
`;
  }

  return { markup, css };
}

function generateAngular(blocks, settings) {
  const markup = `
<div class="skeleton-container">
${blocks.map(block => {
    // Calcoliamo la sfumatura “shimmer”
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    // Se animazione attiva, aggiungiamo la classe "shimmer" e il gradient inline
    const shimmerClass = settings.animation ? 'shimmer' : '';
    const styleStr = settings.animation
      ? `background: ${gradient}; background-size: 1000px 100%;`
      : `background-color: ${block.color};`;

    return `
  <div
    class="skeleton-block ${shimmerClass}"
    style="
      left: ${block.x}px;
      top: ${block.y}px;
      width: ${block.width}px;
      height: ${block.height}px;
      border-radius: ${block.rx ?? 0}px;
      ${styleStr}
    "
  ></div>`;
  }).join('\n')}
</div>

<!--
@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent {}
-->
`;

  // CSS di base
  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;

  // Se animazione attiva, aggiungiamo la keyframe e la classe shimmer
  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
}
`;
  }

  return { markup, css };
}

function generateVue(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    const shimmerClass = settings.animation ? 'shimmer' : '';
    return `
    <div
      class="skeleton-block ${shimmerClass}"
      style="
        left: ${block.x}px;
        top: ${block.y}px;
        width: ${block.width}px;
        height: ${block.height}px;
        border-radius: ${block.rx ?? 0}px;
        ${settings.animation
        ? 'background: ' + gradient + '; background-size: 1000px 100%;'
        : 'background-color: ' + block.color + ';'
      }
      "
    ></div>`;
  }).join('\n');

  const markup = `
<template>
  <div class="skeleton-container">
${blockDivs}
  </div>
</template>

<script>
export default {
  name: 'Skeleton',
};
</script>
`;

  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;
  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
}
`;
  }

  return { markup, css };
}

function generateQwik(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    const shimmerClass = settings.animation ? 'shimmer' : '';
    return `
      <div
        class="skeleton-block ${shimmerClass}"
        style="
          left: ${block.x}px;
          top: ${block.y}px;
          width: ${block.width}px;
          height: ${block.height}px;
          border-radius: ${block.rx ?? 0}px;
          ${settings.animation
        ? 'background: ' + gradient + '; background-size: 1000px 100%;'
        : 'background-color: ' + block.color + ';'
      }
        "
      ></div>`;
  }).join('\n');

  const markup = `
import { component$ } from '@builder.io/qwik';

export const Skeleton = component$(() => {
  return (
    <div class="skeleton-container">
${blockDivs}
    </div>
  );
});
`;

  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;
  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
}
`;
  }

  return { markup, css };
}

function generateSvelte(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const sideColor = lightenColor(block.color, 0.2);
    const gradient = `linear-gradient(to right, ${sideColor} 8%, ${block.color} 18%, ${sideColor} 33%)`;
    const shimmerClass = settings.animation ? 'shimmer' : '';
    return `
    <div
      class="skeleton-block ${shimmerClass}"
      style="
        left: ${block.x}px;
        top: ${block.y}px;
        width: ${block.width}px;
        height: ${block.height}px;
        border-radius: ${block.rx ?? 0}px;
        ${settings.animation
        ? 'background: ' + gradient + '; background-size: 1000px 100%;'
        : 'background-color: ' + block.color + ';'
      }
      "
    ></div>`;
  }).join('\n');

  const markup = `
<script>
  // export let blocks = [];
</script>

<div class="skeleton-container">
  {#each blocks as block}
${blockDivs}
  {/each}
</div>
`;

  let css = `
.skeleton-container {
  position: relative;
  width: 500px;
  height: 500px;
  background: #f0f0f0;
}
.skeleton-block {
  position: absolute;
}
`;
  if (settings.animation) {
    css += `
@keyframes shimmer {
  0%   { background-position: -500px 0; }
  100% { background-position: 500px 0; }
}
.shimmer {
  animation: shimmer 1.5s infinite linear;
}
`;
  }

  return { markup, css };
}

/** SVG (unico blocco) */
function generateSVG(blocks, settings) {
  const svgWidth = 500;
  const svgHeight = 500;
  const rects = blocks.map(block => `
    <rect
      x="${block.x}"
      y="${block.y}"
      width="${block.width}"
      height="${block.height}"
      rx="${block.rx ?? 0}"
      ry="${block.rx ?? 0}"
      fill="${block.color}"
    />
  `).join('\n');

  return `
<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
  <!-- Esempio animazione non implementata qui -->
  ${rects}
</svg>
`;
}

/**
 * getCodeParts(format) => { markup, css }
 * Se "svg", restituiamo { markup: [svgString], css: '' }
 */
export default function getCodeParts(format, blocks, settings) {
  switch (format) {
    case 'HTML':
      return generateHTMLCSS(blocks, settings);
    case 'REACT':
      return generateReact(blocks, settings);
    case 'ANGULAR':
      return generateAngular(blocks, settings);
    case 'VUE':
      return generateVue(blocks, settings);
    case 'QWIK':
      return generateQwik(blocks, settings);
    case 'SVELTE':
      return generateSvelte(blocks, settings);
    case 'SVG':
      return { markup: generateSVG(blocks, settings), css: '' };
    default:
      return { markup: '', css: '' };
  }
}