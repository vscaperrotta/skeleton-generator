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
  const showSubTabs = (mainFormat !== 'SVG');
  const codeToShow = showSubTabs
    ? (subTab === 'MARKUP' ? markup : css)
    : markup;

  return (
    <div className="code-output__container">
      {/* Sub-tab: Markup / CSS (solo se non è svg) */}

      {/* Tab to select format output */}
      {showSubTabs && (
        <Tabs
          isMarkup
          active={subTab}
          options={['MARKUP', 'CSS']}
          onClick={setSubTab}
        />
      )}

      <div className="code-editor-container">
        <textarea
          readOnly
          className="code-editor"
          // rows={20}
          style={{ width: '100%' }}
          value={codeToShow}
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