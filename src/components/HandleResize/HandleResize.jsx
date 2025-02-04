/**
 *
 * HandleResize
 *
 * @author Vittorio Scaperrotta
 * @date 31-Jan-2025
*/

import React from 'react';
import './HandleResize.scss';

const HandleResize = ({
  block = null
}) => {

  const half = 4;

  return (
    block !== null ? (
      <>
        {/* top-left */}
        <div
          className="resize-handle"
          data-corner="top-left"
          style={{
            left: block.x - half,
            top: block.y - half,
          }}
        />
        {/* top-right */}
        <div
          className="resize-handle"
          data-corner="top-right"
          style={{
            left: block.x + block.width - half,
            top: block.y - half,
          }}
        />
        {/* bottom-left */}
        <div
          className="resize-handle"
          data-corner="bottom-left"
          style={{
            left: block.x - half,
            top: block.y + block.height - half,
          }}
        />
        {/* bottom-right */}
        <div
          className="resize-handle"
          data-corner="bottom-right"
          style={{
            left: block.x + block.width - half,
            top: block.y + block.height - half,
          }}
        />
      </>
    ) : null
  )
}

export default HandleResize;