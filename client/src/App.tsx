import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { NewDev } from "./pages/NewDev";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/desenvolvedor/novo" component={NewDev} />
      <Route path="/desenvolvedor/editar/:id" component={NewDev} />
      <Route path="/nao-encontrado" component={NotFound} />
    </BrowserRouter>
  );
}

export default App;
