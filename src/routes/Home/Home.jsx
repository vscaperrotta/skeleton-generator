/**
 *
 * Home
 *
 * @author Vittorio Scaperrotta
 * @date 22-Jan-2025
*/

import React, { useState } from 'react';
import Header from '@components/Header';
import Board from '@components/Board';
import CodeOutput from '@components/CodeOutput';
import Settings from '@components/Settings';
import Footer from '@components/Footer';
import Controller from '@components/Controller';
import Grid from '@assets/Grid';
import './Home.scss';

const Home = () => {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [mode, setMode] = useState('select');

  // Settings State
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

  // Get the selected block, if any
  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || null;

  /**
   * Update the properties of a block.
   *
   * @param {number} id - The ID of the block to update.
   * @param {Object} newProps - The new properties to apply to the block.
   */
  const updateBlock = (id, newProps) => {
    setBlocks(prev =>
      prev.map(block =>
        block.id === id ? { ...block, ...newProps } : block
      )
    );
  };

  /**
   * Add a new block.
   *
   * @param {Object} newBlock - The new block to add.
   */
  const addBlock = (newBlock) => {
    setBlocks(prev => [...prev, { ...newBlock, id: Date.now() }]);
  };

  /**
   * Remove a block by its ID.
   *
   * @param {number} id - The ID of the block to remove.
   */
  const removeBlock = (id) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (id === selectedBlockId) {
      setSelectedBlockId(null);
    }
  };

  /**
   * Clear all blocks from the SVG.
   */
  const clearSVG = () => {
    setBlocks([]);
    setSelectedBlockId(null);
  };

  /**
   * Handle the selection of a block.
   *
   * @param {number} id - The ID of the selected block.
   */
  const handleSelectBlock = (id) => {
    setSelectedBlockId(id);
  };

  return (
    <>
      <div className="home__container">

        <div className="home__grid-container">
          <Grid />
        </div>

        <Header />

        <main id='main' className='main'>
          <div className='grid'>
            <div className='Board'>
              <Board
                blocks={blocks}
                onUpdateBlock={updateBlock}
                onAddBlock={addBlock}
                onRemoveBlock={removeBlock}
                settings={settings}
                mode={mode}
                onSelectBlock={handleSelectBlock}
                selectedBlockId={selectedBlockId}
              />
              <Controller
                mode={mode}
                settings={settings}
                blocks={blocks}
                setMode={setMode}
                setSettings={setSettings}
                clearSVG={clearSVG}
              />
            </div>
            <div className='CodeOutput'>
              <CodeOutput
                blocks={blocks}
                settings={settings}
              />
            </div>
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
      <Footer />
    </>
  );
};

export default Home;
