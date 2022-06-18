import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './stories/components/button';
import Message from './stories/components/message/message';
function App() {

  return (
    <div className="App">
      <button onClick={() => { Message.success("hello world") }}>click</button>
      <button onClick={() => { Message.error("hiasdasdasdasdasdasdadasd") }}>click1</button>
    </div>
  );
}

export default App;
