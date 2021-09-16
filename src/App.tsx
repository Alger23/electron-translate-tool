import React from 'react';
import logo from './logo.svg';
import './App.css';

const electron = window.require('electron');
const {remote, ipcRenderer} = electron;
//const {BrowserWindow,dialog,Menu} = remote;


function App() {

  const click = ()=> {
    ipcRenderer.send('click')
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={click}>Send to ipcMain</button>
      </header>
    </div>
  );
}

export default App;
