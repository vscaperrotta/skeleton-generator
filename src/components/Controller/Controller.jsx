/**
 *
 * Controller
 *
 * @author vittorioscaperrotta
 * @date 30-Jan-2025
*/

import React from 'react';
import Bin from '@assets/icons/Bin';
import Grid from '@assets/icons/Grid';
import Lock from '@assets/icons/Lock';
import Pointer from '@assets/icons/Pointer';
import Shape from '@assets/icons/Shape';
import './Controller.scss';

const Controller = ({
  mode = '',
  settings = {},
  blocks = [],
  setMode = () => { },
  setSettings = () => { },
  clearSVG = () => { }
}) => {
  return (
    <div className="controller__container">
      {/* Select shape */}
      <button
        className={`controller__button editing ${mode === 'select' ? 'active' : ''}`}
        onClick={() => setMode('select')}
      >
        <Pointer />
      </button>

      {/* Draw shape */}
      <button
        className={`controller__button create ${mode === 'create' ? 'active' : ''}`}
        onClick={() => setMode('create')}
      >
        <Shape />
      </button>

      <div className='divider' />

      {/* Show grid */}
      <button
        className={`controller__button functionality ${settings.showGrid ? 'active' : ''}`}
        onClick={() => setSettings(prev => ({ ...prev, showGrid: !prev.showGrid }))}
      >
        <Grid />
      </button>

      {/* Lock to grid */}
      <button
        className={`controller__button functionality ${settings.snapToGrid ? 'active' : ''}`}
        onClick={() => setSettings(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
      >
        <Lock />
      </button>

      <div className='divider' />

      {/* Clean all board */}
      <button
        className="controller__button clear"
        onClick={clearSVG}
        disabled={blocks.length === 0}
      >
        <Bin />
      </button>
    </div>
  )
}

export default Controller;
