/**
 *
 * CodeOutput
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React, { useState } from 'react';
import Tabs from '@components/Tabs';
import getCodeParts from './utils';
import './CodeOutput.scss';


const CodeOutput = ({
  blocks = [],
  settings = {}
}) => {
  const [mainFormat, setMainFormat] = useState('HTML');
  const [subTab, setSubTab] = useState('MARKUP');

  const { markup, css } = getCodeParts(mainFormat, blocks, settings);
  const showMarkupTabs = (mainFormat !== 'SVG');

  /**
   * Handle showing the appropriate code based on the selected tab.
   *
   * @returns {string} The code to display.
   */
  function handleShowCode() {
    if (showMarkupTabs) {
      if (subTab === 'MARKUP') {
        return markup;
      } else {
        return css;
      }
    } else {
      return markup;
    }
  }

  return (
    <div className="code-output__container">

      {/* Tab to select format output */}
      {showMarkupTabs && (
        <Tabs
          isMarkup
          active={subTab}
          options={['MARKUP', 'CSS']}
          onClick={setSubTab}
        />
      )}

      {/* Editor */}
      <div className="code-output__editor-container">
        <textarea
          readOnly
          className="code-output__editor-textarea"
          value={handleShowCode()}
        />
      </div>

      {/* Tab to select format output */}
      <Tabs
        active={mainFormat}
        options={['HTML', 'REACT', 'ANGULAR', 'VUE', 'QWIK', 'SVELTE', 'SVG']}
        onClick={setMainFormat}
      />
    </div >
  );
}

export default CodeOutput;