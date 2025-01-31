/**
 * Board.jsx
 *
 * - Creazione blocchi (modalità 'create')
 * - Selezione e drag (modalità 'select')
 * - Resize con 4 maniglie (se un blocco è selezionato)
 * - Snap a griglia se settings.snapToGrid
 * - Animazione shimmer se settings.animation
 * - Griglia di sfondo se settings.showGrid
 * - Confinamento all'interno di una board 500x500
 */

import React, { useState, useRef, useEffect } from 'react';
import HandleResize from '@components/HandleResize';
import {
  snap,
  clampPosition,
  clampX,
  clampY,
  getBlockStyle
} from './utils';
import './Board.scss';



// Costanti dimensione board (o potresti prenderle da offsetWidth/offsetHeight di boardRef)
const BOARD_WIDTH = 676;
const BOARD_HEIGHT = 676;

const Board = ({
  blocks,
  onUpdateBlock,
  onAddBlock,
  onRemoveBlock,
  settings,
  mode,
  onSelectBlock,
  selectedBlockId
}) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [newBlock, setNewBlock] = useState(null);

  // Drag
  const [dragStart, setDragStart] = useState(null);

  // Resize
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);

  const boardRef = useRef(null);
  const gridSize = 20;

  // Gestione keyDown per cancellare blocco selezionato
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedBlockId && (e.key === 'Delete' || e.key === 'Backspace')) {
        e.preventDefault();
        onRemoveBlock(selectedBlockId);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedBlockId, onRemoveBlock]);

  // Converte coordinate mouse in coordinate board
  const getBoardCoordinates = (e) => {
    const rect = boardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    return { x, y };
  };

  const handleMouseDown = (e) => {
    if (!boardRef.current) return;
    const coords = getBoardCoordinates(e);

    // Controllo se ho cliccato su una maniglia di resize
    if (e.target.classList.contains('resize-handle')) {
      const corner = e.target.getAttribute('data-corner'); // top-left, etc.
      setIsResizing(true);
      setResizeCorner(corner);
      return;
    }

    if (mode === 'select') {
      // Verifica se ho cliccato su un blocco
      const target = e.target;
      if (target.dataset && target.dataset.id) {
        const id = parseInt(target.dataset.id, 10);
        onSelectBlock?.(id);

        // Iniziamo eventuale drag
        const { x, y } = coords;
        setDragStart({
          id,
          offsetX: x - parseFloat(target.style.left),
          offsetY: y - parseFloat(target.style.top),
        });
      } else {
        // clic fuori => deseleziono
        onSelectBlock?.(null);
      }
    } else if (mode === 'create') {
      setIsDrawing(true);
      setNewBlock({
        x: clampX(BOARD_WIDTH, BOARD_HEIGHT, snap(coords.x, settings.snapToGrid, gridSize), 0, BOARD_WIDTH),
        y: clampY(BOARD_WIDTH, BOARD_HEIGHT, snap(coords.y, settings.snapToGrid, gridSize), 0, BOARD_HEIGHT),
        width: 0,
        height: 0,
        color: settings.color,
        rx: 0,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!boardRef.current) return;
    const coords = getBoardCoordinates(e);

    if (isResizing && selectedBlockId && resizeCorner) {
      handleResizeBlock(coords);
      return;
    }

    if (mode === 'create' && isDrawing && newBlock) {
      let snappedX = snap(coords.x, settings.snapToGrid, gridSize);
      let snappedY = snap(coords.y, settings.snapToGrid, gridSize);

      // Calcoliamo nuova width/height
      const w = snappedX - newBlock.x;
      const h = snappedY - newBlock.y;

      setNewBlock(prev => ({
        ...prev,
        width: w,
        height: h
      }));
    } else if (mode === 'select' && dragStart) {
      let newX = coords.x - dragStart.offsetX;
      let newY = coords.y - dragStart.offsetY;
      newX = snap(newX, settings.snapToGrid, gridSize);
      newY = snap(newY, settings.snapToGrid, gridSize);

      // Clamping: larghezza e altezza del blocco attuale
      const block = blocks.find(b => b.id === dragStart.id);
      if (!block) return;
      const clamped = clampPosition(BOARD_WIDTH, BOARD_HEIGHT, newX, newY, block.width, block.height);
      onUpdateBlock(dragStart.id, { x: clamped.x, y: clamped.y });
    }
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
      setResizeCorner(null);
      return;
    }

    if (mode === 'create' && isDrawing && newBlock) {
      // Fine disegno
      let w = Math.abs(newBlock.width);
      let h = Math.abs(newBlock.height);

      // Start x/y
      let finalX = newBlock.width < 0 ? newBlock.x + newBlock.width : newBlock.x;
      let finalY = newBlock.height < 0 ? newBlock.y + newBlock.height : newBlock.y;

      // Clamping
      if (finalX < 0) finalX = 0;
      if (finalY < 0) finalY = 0;
      if (finalX + w > BOARD_WIDTH) w = BOARD_WIDTH - finalX;
      if (finalY + h > BOARD_HEIGHT) h = BOARD_HEIGHT - finalY;

      if (w > 5 && h > 5) {
        const finalBlock = {
          ...newBlock,
          width: w,
          height: h,
          x: finalX,
          y: finalY,
        };
        onAddBlock(finalBlock);
      }
      setIsDrawing(false);
      setNewBlock(null);
    }

    setDragStart(null);
  };

  // Funzione di resize
  const handleResizeBlock = (coords) => {
    const block = blocks.find(b => b.id === selectedBlockId);
    if (!block) return;

    let snappedX = snap(coords.x, settings.snapToGrid, gridSize);
    let snappedY = snap(coords.y, settings.snapToGrid, gridSize);

    let { x, y, width, height } = block;

    switch (resizeCorner) {
      case 'top-left': {
        const newWidth = (x + width) - snappedX;
        const newHeight = (y + height) - snappedY;
        x = snappedX;
        y = snappedY;
        width = newWidth;
        height = newHeight;
        break;
      }
      case 'top-right': {
        const newWidth = snappedX - x;
        const newHeight = (y + height) - snappedY;
        y = snappedY;
        width = newWidth;
        height = newHeight;
        break;
      }
      case 'bottom-left': {
        const newWidth = (x + width) - snappedX;
        const newHeight = snappedY - y;
        x = snappedX;
        width = newWidth;
        height = newHeight;
        break;
      }
      case 'bottom-right': {
        width = snappedX - x;
        height = snappedY - y;
        break;
      }
      default:
        break;
    }

    // Evita dimensioni negative
    if (width < 5) width = 5;
    if (height < 5) height = 5;

    // Ora clampiamo x, y, width, height in modo che restino nella board
    if (x < 0) {
      width += x; // se x è -10, riduco la width di 10
      x = 0;
    }
    if (y < 0) {
      height += y;
      y = 0;
    }
    if (x + width > BOARD_WIDTH) {
      width = BOARD_WIDTH - x;
    }
    if (y + height > BOARD_HEIGHT) {
      height = BOARD_HEIGHT - y;
    }

    onUpdateBlock(selectedBlockId, { x, y, width, height });
  };

  // Troviamo il blocco selezionato (se c'è)
  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  // Ritorno del componente
  return (
    <div
      ref={boardRef}
      className={`board__container ${settings.showGrid ? ' grid-active' : ''}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        backgroundColor: settings.boardBgColor,
        backgroundImage: settings.boardBgImage
          ? `url(${settings.boardBgImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Blocchi esistenti */}
      {blocks.map((block) => {
        const isSelected = (block.id === selectedBlockId);
        const blockStyle = getBlockStyle(block, settings);
        return (
          <div
            key={block.id}
            data-id={block.id}
            className={`block ${isSelected ? 'selected' : ''} ${settings.animation ? 'shimmer' : ''}`}
            style={blockStyle}
          />
        );
      })}

      {/* Blocco in disegno (modalità create) */}
      {mode === 'create' && isDrawing && newBlock && (
        <div
          className="block shimmer"
          style={{
            position: 'absolute',
            left: newBlock.width < 0 ? newBlock.x + newBlock.width : newBlock.x,
            top: newBlock.height < 0 ? newBlock.y + newBlock.height : newBlock.y,
            width: Math.abs(newBlock.width),
            height: Math.abs(newBlock.height),
            borderRadius: newBlock.rx,
            background: (() => {
              return `linear-gradient(to right, ${settings.color2} 8%, ${settings.color} 18%, ${settings.color2} 33%)`;
            })(),
            backgroundSize: '1000px 100%',
          }}
        />
      )}

      {selectedBlockId && !isDrawing && !dragStart && !isResizing ? (
        <HandleResize block={selectedBlock} />
      ) : null}
    </div>
  );
}


export default Board;