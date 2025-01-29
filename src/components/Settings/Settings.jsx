import React, { useState } from 'react';
import Input from '@components/Input';
import Field from '@components/Field';
import Toggle from '@components/Toggle';
import UploadImage from '@components/UploadImage';

import './Settings.scss';

function Settings({
  settings,
  setSettings,
  selectedBlock,
  onUpdateBlock
}) {
  // Gestione globale colore di default per i nuovi blocchi
  const handleColorChange = (e) => {
    setSettings(prev => ({ ...prev, color: e.target.value }));
  };

  // Attiva/disattiva animazione globale
  const handleAnimationToggle = () => {
    setSettings(prev => ({ ...prev, animation: !prev.animation }));
  };

  // Cambia il colore di sfondo della Board
  const handleBoardBgColorChange = (e) => {
    setSettings(prev => ({ ...prev, boardBgColor: e.target.value }));
  };

  // Stato locale per anteprima dell’immagine (se vuoi gestire base64 o URL)
  const [previewImage, setPreviewImage] = useState(settings.boardBgImage || '');

  // Upload locale di un’immagine come base64
  const handleBgImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Str = ev.target.result;
      setPreviewImage(base64Str);
      setSettings(prev => ({ ...prev, boardBgImage: base64Str }));
    };
    reader.readAsDataURL(file);
  };

  // Inserimento di un URL remoto
  const handleBgImageUrlChange = (e) => {
    const url = e.target.value;
    setPreviewImage(url);
    setSettings(prev => ({ ...prev, boardBgImage: url }));
  };

  // [NUOVO] Pulsante per rimuovere l’immagine di sfondo
  const handleRemoveImage = () => {
    setPreviewImage('');
    setSettings(prev => ({
      ...prev,
      boardBgImage: '',
      boardBgColor: "#ffffff",
    }));
  };

  // Gestione border radius del blocco selezionato
  const handleRadiusChange = (e) => {
    const val = parseInt(e.target.value, 10) || 0;
    if (selectedBlock) {
      onUpdateBlock(selectedBlock.id, { rx: val });
    }
  };

  return (
    <div className="settings__container">
      <h5>Global Settings</h5>

      <label>
        Default color:{' '}
        <input
          type="color"
          value={settings.color}
          onChange={handleColorChange}
        />
      </label>

      <label>
        Animation:{' '}
        <input
          type="checkbox"
          checked={settings.animation}
          onChange={handleAnimationToggle}
        />
      </label>

      {/* Esempi di componenti personalizzati (a tuo piacere) */}
      <Input />
      <Field />
      <Toggle />
      <UploadImage />

      {/* Sezione sfondo Board */}
      <div className="board-bg-settings">
        <h5>Board Background</h5>

        {/* Colore sfondo */}
        <label>
          Background color:{' '}
          <input
            type="color"
            value={settings.boardBgColor}
            onChange={handleBoardBgColorChange}
          />
        </label>

        {/* Upload locale di un’immagine in base64 */}
        <label>
          Upload Image:
          <input
            type="file"
            accept="image/*"
            onChange={handleBgImageUpload}
          />
        </label>

        {/* Inserimento URL manuale */}
        <label>
          Image URL:
          <input
            type="text"
            placeholder="https://example.com/img.png"
            value={previewImage}
            onChange={handleBgImageUrlChange}
          />
        </label>

        {/* [NUOVO] Pulsante per rimuovere l'immagine di sfondo (solo se esiste) */}
        {settings.boardBgImage && (
          <button className="remove-bg-image" onClick={handleRemoveImage}>
            RESET BACKGROUND
          </button>
        )}
      </div>

      {/* Impostazioni del blocco selezionato (es. border radius) */}
      {selectedBlock && (
        <div className="selected-block-settings">
          <h5>Selected Block Options</h5>
          <label>
            Border Radius:{' '}
            <input
              type="number"
              min={0}
              value={selectedBlock.rx ?? 0}
              onChange={handleRadiusChange}
            />
          </label>
        </div>
      )}
    </div>
  );
}

export default Settings;
