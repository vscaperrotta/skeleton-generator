/**
 *
 * Button
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React from 'react';
import './Button.scss';

const Button = ({
  label = '',
  onClick = () => { },
  variant = 'text',
}) => {

  return (
    <button
      className={`
        button
        ${variant ? `button--${variant}` : ''}
      `}
      onClick={onClick}
      aria-label={label}
    >
      {label}
    </button>
  )
}

export default Button;
