import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import PacksPage from "./pages/PacksPage";
import GeneratePage from "./pages/GeneratePage";
import HistoryPage from "./pages/HistoryPage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneratePage />} />
      <Route path="/packs" element={<PacksPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
}

export default App;
