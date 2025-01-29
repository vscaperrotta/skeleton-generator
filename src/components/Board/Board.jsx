import React, { useState, useRef, useEffect } from 'react';
import './Board.scss';

function Board({
  blocks,
  onUpdateBlock,
  onAddBlock,
  onRemoveBlock,
  settings,
  mode,
  onSelectBlock,     // Callback per segnalare il blocco selezionato
  selectedBlockId,   // Id del blocco selezionato (gestito da Home)
}) {
  // Stati per il disegno di un nuovo blocco
  const [isDrawing, setIsDrawing] = useState(false);
  const [newBlock, setNewBlock] = useState(null);

  // Stati per il drag di un blocco selezionato
  const [dragStart, setDragStart] = useState(null);

  // Stati per il resize
  const [isResizing, setIsResizing] = useState(false);
  const [resizeCorner, setResizeCorner] = useState(null);

  const svgRef = useRef(null);
  const gridSize = 20; // dimensione griglia per lo snap

  // Ascoltiamo il tasto Delete/Backspace per cancellare il blocco selezionato
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Se non c'è un blocco selezionato, usciamo
      if (!selectedBlockId) return;

      // Se la pressione non è Delete/Backspace, usciamo
      if (e.key !== 'Delete' && e.key !== 'Backspace') return;

      // [NUOVO] Se il focus è su un <input> o <textarea>, ignoriamo
      const tag = e.target.tagName.toUpperCase();
      if (tag === 'INPUT' || tag === 'TEXTAREA') {
        // L’utente sta modificando un input,
        // non vogliamo cancellare il blocco
        return;
      }

      // A questo punto, safe to remove the block
      e.preventDefault();
      onRemoveBlock(selectedBlockId);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedBlockId, onRemoveBlock]);

  const getSvgCoordinates = (event) => {
    const svg = svgRef.current;
    const point = svg.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    const ctm = svg.getScreenCTM().inverse();
    return point.matrixTransform(ctm);
  };

  // Funzione di snap, se snapToGrid è attivo
  const snap = (value) => {
    if (!settings.snapToGrid) return value;
    return Math.round(value / gridSize) * gridSize;
  };

  const handleMouseDown = (e) => {
    const target = e.target;

    // Se ho cliccato su una maniglia di resize
    if (target.classList.contains('resize-handle')) {
      const corner = target.getAttribute('data-corner');
      setIsResizing(true);
      setResizeCorner(corner);
      return;
    }

    if (mode === 'select') {
      if (target.tagName === 'rect' && target.getAttribute('data-id')) {
        const id = parseInt(target.getAttribute('data-id'), 10);
        // Segnaliamo la selezione al parent
        onSelectBlock?.(id);

        // Iniziamo eventuale drag
        const coords = getSvgCoordinates(e);
        setDragStart({
          id,
          offsetX: coords.x - parseFloat(target.getAttribute('x')),
          offsetY: coords.y - parseFloat(target.getAttribute('y')),
        });
      } else {
        // clic fuori dai blocchi => deselezione
        onSelectBlock?.(null);
      }
    }
    else if (mode === 'create') {
      // Creo un nuovo blocco se clicco in un punto libero (non su un rettangolo)
      if (target.tagName !== 'rect') {
        const coords = getSvgCoordinates(e);
        const snappedX = snap(coords.x);
        const snappedY = snap(coords.y);

        setIsDrawing(true);
        setNewBlock({
          x: snappedX,
          y: snappedY,
          width: 0,
          height: 0,
          color: settings.color,
          rx: 0, // border radius di default
        });

        // Deseleziono eventuali blocchi
        onSelectBlock?.(null);
      }
    }
  };

  const handleMouseMove = (e) => {
    const coords = getSvgCoordinates(e);

    // Se sto ridimensionando un blocco esistente
    if (isResizing && selectedBlockId && resizeCorner) {
      onResizeBlock(coords);
      return;
    }

    // Se sto disegnando un nuovo blocco
    if (mode === 'create' && isDrawing && newBlock) {
      const snappedX = snap(coords.x);
      const snappedY = snap(coords.y);
      setNewBlock(prev => ({
        ...prev,
        width: snappedX - prev.x,
        height: snappedY - prev.y
      }));
    }
    // Se sto trascinando un blocco selezionato
    else if (mode === 'select' && selectedBlockId && dragStart) {
      let newX = coords.x - dragStart.offsetX;
      let newY = coords.y - dragStart.offsetY;

      if (settings.snapToGrid) {
        newX = snap(newX);
        newY = snap(newY);
      }

      onUpdateBlock(selectedBlockId, { x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    // Fine resize
    if (isResizing) {
      setIsResizing(false);
      setResizeCorner(null);
      return;
    }

    // Fine disegno
    if (mode === 'create' && isDrawing && newBlock) {
      const finalBlock = {
        ...newBlock,
        width: Math.abs(newBlock.width),
        height: Math.abs(newBlock.height),
        x: newBlock.width < 0 ? newBlock.x + newBlock.width : newBlock.x,
        y: newBlock.height < 0 ? newBlock.y + newBlock.height : newBlock.y,
      };
      if (finalBlock.width > 5 && finalBlock.height > 5) {
        onAddBlock(finalBlock);
      }
      setIsDrawing(false);
      setNewBlock(null);
    }

    if (mode === 'select') {
      setDragStart(null);
    }
  };

  // Funzione di resize
  const onResizeBlock = (coords) => {
    const block = blocks.find(b => b.id === selectedBlockId);
    if (!block) return;

    let snappedX = snap(coords.x);
    let snappedY = snap(coords.y);

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

    // Evita dimensioni troppo piccole
    if (width < 5) width = 5;
    if (height < 5) height = 5;

    onUpdateBlock(selectedBlockId, { x, y, width, height });
  };

  // Disegno griglia
  const renderGrid = () => {
    if (!settings.showGrid) return null;
    const lines = [];
    for (let i = 0; i <= 500; i += gridSize) {
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

  // Maniglie di resize per il blocco selezionato
  const renderResizeHandles = (block) => {
    const handles = [];
    const size = 8; // dimensione del quadratino
    const half = size / 2;

    // Top-left
    handles.push(
      <rect
        key="tl"
        className="resize-handle"
        data-corner="top-left"
        x={block.x - half}
        y={block.y - half}
        width={size}
        height={size}
        fill="white"
        stroke="black"
        style={{ cursor: 'nwse-resize' }}
      />
    );

    // Top-right
    handles.push(
      <rect
        key="tr"
        className="resize-handle"
        data-corner="top-right"
        x={block.x + block.width - half}
        y={block.y - half}
        width={size}
        height={size}
        fill="white"
        stroke="black"
        style={{ cursor: 'nesw-resize' }}
      />
    );
    // Bottom-left
    handles.push(
      <rect
        key="bl"
        className="resize-handle"
        data-corner="bottom-left"
        x={block.x - half}
        y={block.y + block.height - half}
        width={size}
        height={size}
        fill="white"
        stroke="black"
        style={{ cursor: 'nesw-resize' }}
      />
    );

    // Bottom-right
    handles.push(
      <rect
        key="br"
        className="resize-handle"
        data-corner="bottom-right"
        x={block.x + block.width - half}
        y={block.y + block.height - half}
        width={size}
        height={size}
        fill="white"
        stroke="black"
        style={{ cursor: 'nwse-resize' }}
      />
    );

    return handles;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        backgroundColor: settings.boardBgColor,
        backgroundImage: settings.boardBgImage
          ? `url(${settings.boardBgImage})`
          : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <svg
        ref={svgRef}
        width="500"
        height="500"
        className="board__svg"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {renderGrid()}

        {/* Blocchi esistenti */}
        {blocks.map((block) => (
          <rect
            key={block.id}
            data-id={block.id}
            x={block.x}
            y={block.y}
            width={block.width}
            height={block.height}
            rx={block.rx ?? 0} // Gestione borderRadius
            ry={block.rx ?? 0}
            fill={block.color}
            className={`
              ${block.id === selectedBlockId ? 'selected' : ''}
              ${settings.animation ? 'animated' : ''}
            `}
          />
        ))}

        {/* Blocco in fase di disegno */}
        {mode === 'create' && isDrawing && newBlock && (
          <rect
            x={newBlock.width < 0 ? newBlock.x + newBlock.width : newBlock.x}
            y={newBlock.height < 0 ? newBlock.y + newBlock.height : newBlock.y}
            width={Math.abs(newBlock.width)}
            height={Math.abs(newBlock.height)}
            rx={newBlock.rx ?? 0}
            ry={newBlock.rx ?? 0}
            fill={newBlock.color}
            fillOpacity="0.5"
            stroke="black"
            strokeDasharray="4"
          />
        )}

        {/* Maniglie di resize se ho un blocco selezionato e non sto disegnando né ridimensionando */}
        {selectedBlockId && !isDrawing && !isResizing && (() => {
          const block = blocks.find(b => b.id === selectedBlockId);
          if (!block) return null;
          return renderResizeHandles(block);
        })()}
      </svg>
    </div>
  );
}

export default Board;
