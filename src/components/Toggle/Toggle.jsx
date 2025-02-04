/**
 *
 * Toggle
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React from 'react';
import './Toggle.scss';

const Toggle = ({
  label = '',
  checked = false,
  onChange = () => { }
}) => {
  return (
    <div className='toggle__container'>
      <label className='toggle__label'>
        {label}
      </label>
      <input id='toggle' type='checkbox' checked={checked} onChange={onChange} />
      <label htmlFor='toggle' className='toggle__background'>
        <div className='toggle__pointer' />
      </label>
    </div>
  )
}

export default Toggle;
