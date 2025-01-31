import React, { useState } from 'react';
import Input from '@components/Input';
import Field from '@components/Field';
import Toggle from '@components/Toggle';
import UploadImage from '@components/UploadImage';
import messages from './messages';
import './Settings.scss';

const Settings = ({
  settings,
  setSettings,
  selectedBlock,
  onUpdateBlock
}) => {
  // Gestione globale colore di default per i nuovi blocchi
  const handleColorChange1 = (e) => {
    setSettings(prev => ({ ...prev, color: e.target.value }));
  };

  const handleColorChange2 = (e) => {
    setSettings(prev => ({ ...prev, color2: e.target.value }));
  };

  // Attiva/disattiva animazione globale
  const handleAnimationToggle = () => {
    setSettings(prev => ({ ...prev, animation: !prev.animation }));
  };

  // Attiva/disattiva animazione globale
  const handleChangeAnimationSpeed = (e) => {
    setSettings(prev => ({ ...prev, animationSpeed: e.target.value }));
  };

  // Cambia il colore di sfondo della Board
  const handleBoardBgColorChange = (e) => {
    setSettings(prev => ({ ...prev, boardBgColor: e.target.value }));
  };

  // Upload locale di un’immagine come base64
  const handleBgImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Str = ev.target.result;
      setSettings(prev => ({ ...prev, boardBgImage: base64Str }));
    };
    reader.readAsDataURL(file);
  };

  // [NUOVO] Pulsante per rimuovere l’immagine di sfondo
  const handleRemoveImage = () => {
    console.log('here')

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
      <div className="settings__block">
        <h6 className='settings__section-title'>
          {messages.itemTitle}
        </h6>
        {/* Impostazioni del blocco selezionato (es. border radius) */}
        {selectedBlock ? (
          <div className="settings__block-grid">
            <Field
              label={messages.width}
              value={`${selectedBlock.height}px`}
            />
            <Field
              label={messages.height}
              value={`${selectedBlock.width}px`}
            />
            <Input
              label={messages.radius}
              type="number"
              value={selectedBlock.rx ?? 0}
              onChange={handleRadiusChange}
            />
          </div>
        ) : (
          <p className="setting__single-item-placeholder">
            {messages.itemMessage}
          </p>
        )}
      </div>
      <div className="settings__skeleton">
        <h6 className='settings__section-title'>
          {messages.skeletonTitle}
        </h6>
        <div className='settings__skeleton-grid'>
          <Toggle
            label={messages.animation}
            checked={settings.animation}
            onChange={handleAnimationToggle}
          />
          <Input
            label={messages.color1}
            type="color"
            value={settings.color}
            onChange={handleColorChange1}
          />
          <Input
            label={messages.color2}
            type="color"
            value={settings.color2}
            onChange={handleColorChange2}
          />
          <Input
            label={messages.speed}
            type="number"
            value={settings.animationSpeed}
            onChange={handleChangeAnimationSpeed}
          />
        </div>
      </div>

      {/* Sezione sfondo Board */}
      <div className="settings__background">
        <h6 className='settings__section-title'>
          {messages.backgroundTitle}
        </h6>
        <div className='settings__background-grid'>
          {/* Colore sfondo */}
          <Input
            label={messages.color}
            type="color"
            value={settings.boardBgColor}
            onChange={handleBoardBgColorChange}
          />
          <UploadImage
            label={messages.image}
            addImage={handleBgImageUpload}
            removeImage={handleRemoveImage}
            image={settings.boardBgImage}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;
