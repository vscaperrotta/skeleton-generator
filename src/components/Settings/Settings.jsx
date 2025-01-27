/**
 *
 * Settings
 *
 * @author Vittorio Scaperrotta
 * @date 21-Jan-2025
*/

import React, { useState, useEffect } from 'react';
import Input from '@components/Input';
import Field from '@components/Field';
import Toggle from '@components/Toggle';
import UploadImage from '@components/UploadImage';
import './Settings.scss';

function Settings({ settings, setSettings, onAddBlock }) {
  const handleColorChange = (e) => {
    setSettings({ ...settings, color: e.target.value });
  };

  const handleGridToggle = () => {
    setSettings({ ...settings, showGrid: !settings.showGrid });
  };

  const handleAnimationToggle = () => {
    setSettings({ ...settings, animation: !settings.animation });
  };

  return (
    <div className="settings__container">
      <label>
        Default color:{" "}
        <input
          type="color"
          value={settings.color}
          onChange={handleColorChange}
        />
      </label>
      <label>
        Show grid:{" "}
        <input
          type="checkbox"
          checked={settings.showGrid}
          onChange={handleGridToggle}
        />
      </label>
      <label>
        Animation:{" "}
        <input
          type="checkbox"
          checked={settings.animation}
          onChange={handleAnimationToggle}
        />
      </label>
      <button onClick={onAddBlock}>Add Block</button>

      <Input />
      <Field />
      <Toggle />
      <UploadImage />
    </div>
  );
}

export default Settings;
