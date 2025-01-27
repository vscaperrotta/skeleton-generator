import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { doExample } from '@store/actions/home';
// import { nullSafe } from '@utils/globalMethods';
import Header from '@components/Header';
import Board from '@components/Board';
import CodeOutput from '@components/CodeOutput';
import Settings from '@components/Settings';
import Footer from '@components/Footer';
import './Home.scss';

const Home = () => {
  // const dispatch = useDispatch();
  // const example = useSelector(state => nullSafe(() => state.home.example, null));

  // function handleClick() {
  //   // Code here..
  //   const randomNumber = Math.floor(Math.random() * 100);
  //   dispatch(doExample(randomNumber));
  // }

  // useEffect(() => {
  //   // Code here..
  //   console.log('home selector', example)
  // }, [example]);

  const [blocks, setBlocks] = useState([]);
  const [settings, setSettings] = useState({
    color: "#dddddd",
    showGrid: true,
    animation: false,
    // altre impostazioni
  });

  // Funzione per aggiornare un blocco (es. se lo sposto)
  const updateBlock = (id, newProps) => {
    setBlocks((prev) =>
      prev.map((block) =>
        block.id === id ? { ...block, ...newProps } : block
      )
    );
  };

  // Funzione per aggiungere un nuovo blocco
  const addBlock = () => {
    const newBlock = {
      id: Date.now(),
      x: 50,
      y: 50,
      width: 100,
      height: 50,
      color: settings.color,
    };
    setBlocks((prev) => [...prev, newBlock]);
  };

  // Funzione per rimuovere un blocco
  const removeBlock = (id) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  return (
    <>
      <div className="home__container">
        <div className='Header'>
          <Header />
        </div>
        <main id='main' className='main'>
          <div className='grid'>
            <div className='Board'>
              <Board
                blocks={blocks}
                onUpdateBlock={updateBlock}
                settings={settings}
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
                onAddBlock={addBlock}
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default Home;
