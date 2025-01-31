/**
 *
 * Controller
 *
 * @author vittorioscaperrotta
 * @date 30-Jan-2025
*/

import React from 'react';
import Bin from '@assets/bin.svg';
import Grid from '@assets/grid.svg';
import Lock from '@assets/lock.svg';
import Pointer from '@assets/pointer.svg';
import Shape from '@assets/shape.svg';
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
        <img src={Pointer} alt="Selection" />
      </button>

      {/* Draw shape */}
      <button
        className={`controller__button editing ${mode === 'create' ? 'active' : ''}`}
        onClick={() => setMode('create')}
      >
        <img src={Shape} alt="Draw Shape" />
      </button>

      <div className='divider' />

      {/* Show grid */}
      <button
        className={`controller__button functionality ${settings.showGrid ? 'active' : ''}`}
        onClick={() => setSettings(prev => ({ ...prev, showGrid: !prev.showGrid }))}
      >
        <img src={Grid} alt="Show Grid" />
      </button>

      {/* Lock to grid */}
      <button
        className={`controller__button functionality ${settings.snapToGrid ? 'active' : ''}`}
        onClick={() => setSettings(prev => ({ ...prev, snapToGrid: !prev.snapToGrid }))}
      >
        <img src={Lock} alt="" />
      </button>

      {/* Clean all board */}
      <button
        className="controller__button clear"
        onClick={clearSVG}
        disabled={blocks.length === 0}
      >
        <img src={Bin} alt="Clean Canvas" />
      </button>
    </div>
  )
}

export default Controller;
