/**
 *
 * Tabs
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React from 'react';
import './Tabs.scss';

const Tabs = ({
  active = '',
  options = [],
  onClick = () => { },
  isMarkup = false
}) => {
  return (
    <div className={`tabs__containers ${isMarkup ? 'tabs__containers--markup' : 'tabs__containers--languages'}`}>
      {options.map((option, index) => (
        <button
          key={index}
          className={active === option ? 'active' : ''}
          onClick={() => onClick(option)}
        >
          {option.toLowerCase()}
        </button>
      ))}
    </div>
  )
}

export default Tabs;
