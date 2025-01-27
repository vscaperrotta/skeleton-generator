/**
 *
 * Board
 *
 * @author Vittorio Scaperrotta
 * @date 21-Jan-2025
*/

import React, { useState, useEffect } from 'react';
import './Board.scss';

function Board({ blocks, onUpdateBlock, settings }) {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  const handleMouseDown = (e, block) => {
    e.stopPropagation();
    setSelectedBlockId(block.id);
    // memorizziamo la differenza tra le coordinate del mouse e il blocco
    setDragStart({
      offsetX: e.clientX - block.x,
      offsetY: e.clientY - block.y,
    });
  };

  const handleMouseMove = (e) => {
    if (selectedBlockId && dragStart) {
      const { offsetX, offsetY } = dragStart;
      onUpdateBlock(selectedBlockId, {
        x: e.clientX - offsetX,
        y: e.clientY - offsetY,
      });
    }
  };

  const handleMouseUp = () => {
    setSelectedBlockId(null);
    setDragStart(null);
  };

  // Griglia di sfondo (opzionale)
  const renderGrid = () => {
    if (!settings.showGrid) return null;
    const gridSize = 20; // dimensione di ogni cella di griglia
    const lines = [];
    for (let i = 0; i < 500; i += gridSize) {
      // linee verticali
      lines.push(
        <line
          key={`v${i}`}
          x1={i}
          y1={0}
          x2={i}
          y2={500}
          stroke="#ccc"
          strokeWidth="0.5"
        />
      );
      // linee orizzontali
      lines.push(
        <line
          key={`h${i}`}
          x1={0}
          y1={i}
          x2={500}
          y2={i}
          stroke="#ccc"
          strokeWidth="0.5"
        />
      );
    }
    return lines;
  };

  return (
    <svg
      width="500"
      height="500"
      style={{ border: "1px solid #000" }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Griglia opzionale */}
      {renderGrid()}

      {blocks.map((block) => (
        <rect
          key={block.id}
          x={block.x}
          y={block.y}
          width={block.width}
          height={block.height}
          fill={block.color}
          style={{
            cursor: "move",
            // se vuoi un effetto highlight sul selezionato
            stroke: block.id === selectedBlockId ? "blue" : "none",
            strokeWidth: block.id === selectedBlockId ? 2 : 0,
          }}
          onMouseDown={(e) => handleMouseDown(e, block)}
        />
      ))}
    </svg>
  );
}

export default Board;
