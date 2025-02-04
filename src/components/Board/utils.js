/** Restituisce la posizione "snappata" se snapToGrid è attivo. */
export function snap(value, snapToGrid, gridSize = 20) {
  if (!snapToGrid) return value;
  return Math.round(value / gridSize) * gridSize;
}


// Costruisce lo stile per un blocco con shimmer
export function getBlockStyle(block, settings) {
  const baseStyle = {
    left: block.x,
    top: block.y,
    width: block.width,
    height: block.height,
    borderRadius: block.rx || 0,
    position: 'absolute',
  };

  if (settings.animation) {
    const gradient = `linear-gradient(to right, ${settings.color2} 8%, ${settings.color} 18%, ${settings.color2} 33%)`;
    return {
      ...baseStyle,
      background: gradient,
      backgroundSize: '1000px 100%',
      animationDuration: `${settings.animationSpeed}s`
    };
  } else {
    return {
      ...baseStyle,
      backgroundColor: block.color,
    };
  }
};



/**
 * Clampa la posizione di un blocco (x, y) in modo che rimanga nella board 500x500.
 * Tenendo conto di width e height, non fa uscire il blocco dai margini.
 */
export function clampPosition(BOARD_WIDTH, BOARD_HEIGHT, x, y, width, height) {
  if (x < 0) x = 0;
  if (y < 0) y = 0;
  if (x + width > BOARD_WIDTH) x = BOARD_WIDTH - width;
  if (y + height > BOARD_HEIGHT) y = BOARD_HEIGHT - height;
  return { x, y };
}

/**
 * Clampa un valore x tra min e max
 */
export function clampX(BOARD_WIDTH, BOARD_HEIGHT, x, min, max) {
  if (x < min) return min;
  if (x > max) return max;
  return x;
}
export function clampY(BOARD_WIDTH, BOARD_HEIGHT, y, min, max) {
  if (y < min) return min;
  if (y > max) return max;
  return y;
}
