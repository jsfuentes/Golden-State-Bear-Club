import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AnimatedCursor from "react-animated-cursor";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <AnimatedCursor
      innerSize={20}
      outerSize={10}
      color="249, 79, 66"
      outerAlpha={0.2}
      innerScale={0.7}
      outerScale={5}
    />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
