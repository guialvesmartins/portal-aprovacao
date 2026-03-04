import { Home } from "@/pages/Home";
import { Login } from "@/pages/Login";
import { NotFound } from "@/pages/notfound";
import { Route, Routes } from "react-router-dom";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
