import Section from "./navigation/section";
import React from "react";
import './App.css';
import '../styles/output.css'

function App() {
  return (  
      <div className="App">
        <Section href="/products" title="Products"/>
      </div>
  );
}

export default App;
