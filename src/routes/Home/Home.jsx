import React, { useState, useEffect } from 'react';
import Header from '@components/Header';
import Board from '@components/Board';
import CodeOutput from '@components/CodeOutput';
import Settings from '@components/Settings';
import Footer from '@components/Footer';
import Controller from '@components/Controller';
import './Home.scss';

const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);

  // Impostazioni globali
  const [settings, setSettings] = useState({
    color: "#17d4a8",
    color2: "#ff38ac",
    showGrid: true,
    animation: false,
    animationSpeed: 2,
    snapToGrid: true,
    boardBgColor: "#ffffff",
    boardBgImage: "",
  });

  // Modalità: 'select' o 'create'
  const [mode, setMode] = useState('select');

  // Caricamento iniziale da localStorage (opzionale)
  useEffect(() => {
    const savedBlocks = localStorage.getItem('blocks');
    const savedSettings = localStorage.getItem('settings');
    if (savedBlocks) setBlocks(JSON.parse(savedBlocks));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  // Salvataggio su localStorage (opzionale)
  useEffect(() => {
    localStorage.setItem('blocks', JSON.stringify(blocks));
  }, [blocks]);

  useEffect(() => {
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [settings]);

  // Aggiorna un blocco esistente
  const updateBlock = (id, newProps) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, ...newProps } : block
      )
    );
  };

  // Aggiunge un nuovo blocco disegnato
  const addBlock = (newBlock) => {
    setBlocks(prev => [...prev, { ...newBlock, id: Date.now() }]);
  };

  // Rimuove un blocco
  const removeBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    // Se stai rimuovendo il blocco selezionato, togli la selezione
    if (id === selectedBlockId) {
      setSelectedBlockId(null);
    }
  };

  // Svuota completamente lo SVG
  const clearSVG = () => {
    setBlocks([]);
    setSelectedBlockId(null);
  };

  // Quando Board segnala la selezione di un blocco
  const handleSelectBlock = (id) => {
    setSelectedBlockId(id);
  };

  // Ricaviamo il blocco selezionato, se esiste
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  return (
    <>
      <div className="home__container">
        {/* Header */}
        <Header />

        {/* Main content */}
        <main id='main' className='main'>
          <div className='grid'>
            <div className='Board'>

              {/* Board: is the canvas */}
              <Board
                blocks={blocks}
                onUpdateBlock={updateBlock}
                onAddBlock={addBlock}
                onRemoveBlock={removeBlock}
                settings={settings}
                mode={mode}
                // Callback when select a shape
                onSelectBlock={handleSelectBlock}
                selectedBlockId={selectedBlockId}
              />

              {/* Controller: manage board pointer and shape generation */}
              <Controller
                mode={mode}
                settings={settings}
                blocks={blocks}
                setMode={setMode}
                setSettings={setSettings}
                clearSVG={clearSVG}
              />
            </div>

            {/* Code output: manage output in different code languages */}
            <div className='CodeOutput'>
              <CodeOutput
                blocks={blocks}
                settings={settings}
              />
            </div>

            {/* Settings: manage settings */}
            <div className='Settings'>
              <Settings
                settings={settings}
                setSettings={setSettings}
                onRemoveBlock={removeBlock}
                selectedBlock={selectedBlock}
                onUpdateBlock={updateBlock}
              />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Home;
