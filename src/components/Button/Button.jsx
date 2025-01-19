/**
 *
 * Button
 *
 * @author Vittorio Scaperrotta
 * @date 19-Jan-2025
*/

import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = () => {
  return (
    <button
      className='button'
      onClick={() => console.log('ciao')}
    >prova</button>
  )
}

Button.propTypes = {};

Button.defaultProps = {};

export default Button;
