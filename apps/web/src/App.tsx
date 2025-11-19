import { useState } from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom";
import GeneratePage from "./pages/GeneratePage";
//import PacksPage from "@/pages/PacksPage";
//import HistoryPage from "@/pages/HistoryPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<GeneratePage />} />
      {/* <Route path="/packs" element={<PacksPage />} />
      <Route path="/history" element={<HistoryPage />} /> */}
    </Routes>
  );
}

