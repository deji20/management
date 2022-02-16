import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "./styles/output.css";
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ProductsPage from './routes/products/productsPage';
import env from "dotenv";
import TicketsPage from './routes/messages/TicketsPage';
env.config();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter basename='/management'>

      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/products" element={<ProductsPage />}/>
        <Route path="/tickets" element={<TicketsPage/>}/>
      </Routes>

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
