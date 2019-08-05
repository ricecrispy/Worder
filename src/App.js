import React from "react";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";
import Home from "./Home";
import CanvasBoard from "./CanvasBoard";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={CanvasBoard} />
  </Switch>
);

export default App;
