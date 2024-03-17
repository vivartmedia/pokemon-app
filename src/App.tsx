// App.tsx
import React from 'react';
import './App.css';
import PokeDex from './PokeDex'; // Ensure the path is correct based on your file structure

function App() {
  return (
    <div>
      <header className="App-header">
        <PokeDex />
      </header>
    </div>
  );
}

export default App;
