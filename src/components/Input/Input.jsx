/**
 *
 * Input
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React, { useState, useEffect } from 'react';
import './Input.scss';

const Input = ({
  label = '',
  type = 'text',
  value = '',
  onChange = () => { }
}) => {
  // Se l'input non è di tipo "color", facciamo il rendering classico
  if (type !== 'color') {
    return (
      <div className="input__container">
        <label className="input__label">
          {label}
        </label>
        <div className="input__content">
          <input
            type={type}
            value={value}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }

  // Se l'input è di tipo color, gestiamo un doppio input:
  // 1) <input type="color" />
  // 2) <input type="text" /> per il codice esadecimale
  return <ColorInput label={label} value={value} onChange={onChange} />;
};

export default Input;

/**
 * Componente interno dedicato alla gestione del doppio input colore:
 * - Un color picker
 * - Un text input per l'hex code (#rrggbb)
 */
function ColorInput({ label, value, onChange }) {
  // Manteniamo uno stato locale per la stringa hex, sincronizzata con "value"
  const [hexValue, setHexValue] = useState(value);

  // Quando la prop "value" cambia da fuori, aggiorniamo lo stato hexValue
  useEffect(() => {
    setHexValue(value);
  }, [value]);

  // Funzione di validazione per la stringa hex #RRGGBB
  // Restituisce true se corrisponde a # + 6 cifre esadecimali
  const isValidHex = (str) => {
    return /^#[0-9A-Fa-f]{6}$/.test(str);
  };

  // Cambio dal color picker
  const handleColorPickerChange = (e) => {
    const newColor = e.target.value; // es. #1a2b3c
    setHexValue(newColor);
    onChange({ target: { value: newColor } }); // Inviamo al parent
  };

  // Cambio dal campo di testo
  const handleHexInputChange = (e) => {
    const newVal = e.target.value;
    setHexValue(newVal);

    // Se la stringa è valida, chiamiamo onChange
    if (isValidHex(newVal)) {
      onChange({ target: { value: newVal } });
    }
  };

  return (
    <div className="input__container">
      <label className="input__label">
        {label}
      </label>
      <div className="input__content">
        {/* Color Picker */}
        <input
          className="input__color-picker"
          type="color"
          value={hexValue}
          onChange={handleColorPickerChange}
        />
        {/* Text Input per #hex */}
        <input
          className="color-hex"
          type="text"
          value={hexValue}
          onChange={handleHexInputChange}
          maxLength={7}        // per # + 6 caratteri
          placeholder="#000000"
        />
      </div>
    </div>
  );
}