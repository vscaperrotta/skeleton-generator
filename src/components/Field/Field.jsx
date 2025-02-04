/**
 *
 * Field
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React from 'react';
import './Field.scss';

const Field = ({
  label = '',
  value = '',
}) => {
  return (
    <div className='field__container'>
      <label className='field__label'>
        {label}
      </label>
      <p className='field__value'>
        {value}
      </p>
    </div>
  )
}

export default Field;
