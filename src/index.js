import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Assets/css/rc-switch.css"
import "animate.css";
import 'react-toastify/dist/ReactToastify.css';
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import data from "./Redux/store";
const store = createStore(data);
const Root = React.memo(App);
ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById("root")
);
