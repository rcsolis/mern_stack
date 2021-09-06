import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styleguide.css";
import "./index.css";
import App from "./app/App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
    <React.StrictMode>
        <div className="App">
            <App/>
        </div>
    </React.StrictMode>,
    document.getElementById("root")
);

reportWebVitals(console.log);
