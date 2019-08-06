import React from "react";
import { Switch, Route } from "react-router-dom";
import CanvasBoard from "./CanvasBoard";
import "./App.css";

const App = () => (
  <Switch>
    <Route exact path="/" component={CanvasBoard} />
  </Switch>
);

export default App;
