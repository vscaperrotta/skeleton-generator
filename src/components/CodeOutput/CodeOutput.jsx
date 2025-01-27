/**
 *
 * CodeOutput
 *
 * @author Vittorio Scaperrotta
 * @date 21-Jan-2025
*/

import React, { useState, useEffect } from 'react';
import Tabs from '@components/Tabs';
import './CodeOutput.scss';


function CodeOutput({ blocks = [] }) {
  // Esempio di generatore di codice SVG
  // Potresti aggiungere logiche per React, Vue, Angular, ecc.

  const generateSVGCode = () => {
    const svgWidth = 500;
    const svgHeight = 500;

    // Generiamo le linee di codice <rect> per ciascun block
    const rects = blocks
      .map((block) => `
        <rect
          x="${block.x}"
          y="${block.y}"
          width="${block.width}"
          height="${block.height}"
          fill="${block.color}"
        />
      `)
      .join("\n");

    return `
      <svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
        ${rects}
      </svg>
    `;
  };

  return (
    <div className="CodeOutput">
      <textarea
        readOnly
        value={generateSVGCode()}
        rows={10}
        style={{ width: "100%" }}
      />
      <Tabs />
    </div>
  );
}


export default CodeOutput;
