import Section from "./navigation/section";
import React from "react";
import './App.css';
import '../styles/output.css'

function App() {
  return (
    <html>
      <head>
        <title>Management</title>
      </head>
      <body>
        <div className="grid grid-cols-3 bg-gray-900 h-screen place-items-center">
          <Section href="/orders" title="Orders"/>
          <Section href="/products" title="Products"/>
          <Section href="/tickets" title="Tickets"/>
        </div>
      </body>
    </html>
  );
}

export default App;
