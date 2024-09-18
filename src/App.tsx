import React from 'react';
import './App.css';
import SubscribersGrid from './components/SubscribersGrid';
import ImportFile from './components/ImportFile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ImportFile />
        <SubscribersGrid />
      </header>
    </div>
  );
}

export default App;