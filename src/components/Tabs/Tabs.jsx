/**
 *
 * Tabs
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React from 'react';
import './Tabs.scss';

const Tabs = () => {
  return (
    <div class="tab">
      <button
        class="tablinks"
        onclick="openCity(event, 'London')"
      >
        Tab 1
      </button>
      <button
        class="tablinks"
        onclick="openCity(event, 'Paris')"
      >
        Tab 2
      </button>
      <button
        class="tablinks"
        onclick="openCity(event, 'Tokyo')"
      >
        Tab 3
      </button>
    </div>
  )
}

export default Tabs;
