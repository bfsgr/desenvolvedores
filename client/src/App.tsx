import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewDev } from "./pages/NewDev";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/desenvolvedor/novo" exact component={NewDev} />
    </BrowserRouter>
  );
}

export default App;
