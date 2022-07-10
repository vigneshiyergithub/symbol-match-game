import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Code for implementing Microfront architecture 
window.renderSymbolGame = (containerId, history, props) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

window.unmountSymbolGame = (containerId) => {
  const root = ReactDOM.createRoot(document.getElementById(containerId));
  root.unmount();
};

if (!document.getElementById("game-container")) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
