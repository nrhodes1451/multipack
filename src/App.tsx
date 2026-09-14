import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout.tsx";
import { ContactSheet } from "./pages/ContactSheet.tsx";
import { DeckViewer } from "./pages/DeckViewer.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DeckViewer />} />
          <Route path="/print" element={<ContactSheet />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
