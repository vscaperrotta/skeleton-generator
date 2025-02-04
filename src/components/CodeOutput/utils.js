
const generateCss = `
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

const generateAnimation = `
  @keyframes shimmer {
    0%   { background-position: -500px 0; }
    100% { background-position: 500px 0; }
  }
  .shimmer {
    animation: shimmer 1.5s infinite linear;
  }
`

/**
 * Generates HTML and CSS code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateHTMLCSS(blocks, settings) {
  const markup = `
<div class="skeleton-container">
    ${blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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
  })
      .join('\n')}
</div>`;

  let css = generateCss;

  if (settings.animation) {
    css += generateAnimation;
  }

  return { markup, css };
}

/**
 * Generates React code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateReact(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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

  let css = generateCss;

  if (settings.animation) {
    css += generateAnimation;
  }

  return { markup, css };
}

/**
 * Generates Angular code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateAngular(blocks, settings) {
  const markup = `
<div class="skeleton-container">
${blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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

  let css = generateCss;

  if (settings.animation) {
    css += generateAnimation;
  }

  return { markup, css };
}

/**
 * Generates Vue code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateVue(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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

  let css = generateCss;

  if (settings.animation) {
    css += generateAnimation;
  }

  return { markup, css };
}

/**
 * Generates Qwik code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateQwik(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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

  let css = generateCss;

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

/**
 * Generates Svelte code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
 */
function generateSvelte(blocks, settings) {
  const blockDivs = blocks.map(block => {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${block.color} 18%, ${settings.color2} 33%)`;
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

  let css = generateCss;

  if (settings.animation) {
    css += generateAnimation;
  }

  return { markup, css };
}

/**
 * Generates SVG code for the skeleton blocks.
 *
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {string} The SVG markup.
 */
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
  ${rects}
</svg>
`;
}

/**
 * Generates code parts (markup and CSS) based on the specified format.
 *
 * @param {string} format - The format to generate code for (e.g., 'HTML', 'REACT', 'ANGULAR', etc.).
 * @param {Array} blocks - The blocks to generate code from.
 * @param {Object} settings - The settings for code generation.
 * @returns {Object} An object containing the markup and CSS.
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