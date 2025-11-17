import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import GeneratePage from "./pages/GeneratePage";
import PacksPage from "./pages/PacksPage";
import HistoryPage from "./pages/HistoryPage";
import ProductPage from "./pages/ProductPage";

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<GeneratePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/packs" element={<PacksPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </MainLayout>
  );
}


