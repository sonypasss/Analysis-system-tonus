import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Sales from "./pages/Sales";
import Products from "./pages/Products";
import Clients from "./pages/Clients";

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route 
        path="/"
        element={<Dashboard />}
      />
      <Route
        path="/sales"
        element={<Sales />}
      />
      <Route
        path="/products"
        element={<Products />}
      />
      <Route
        path="/clients"
        element={<Clients />}
      />
    </Routes>

  </BrowserRouter>

  );

}

export default App;