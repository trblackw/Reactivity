import React from "react";
import { Router } from "@reach/router";
import Landing from "./Landing";

const App = () => (
  <Router>
    <Landing path="/" />
  </Router>
);

export default App;
