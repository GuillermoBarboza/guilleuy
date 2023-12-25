import { Route, Routes } from "react-router-dom";
import Home from "./Layouts/Home.tsx";
import NotFound from "./Layouts/NotFound.tsx";

export default function Links() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />;
    </Routes>
  );
}