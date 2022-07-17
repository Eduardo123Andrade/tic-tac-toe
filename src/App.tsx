import React from 'react';
import './App.css';
import { Home } from './pages';
import { GameProvider } from './providers/GameProvider';

function App() {
  return (
    <GameProvider>
      <div className='App'>
        <Home />
      </div>
    </GameProvider>
  );
}

export default App;
