import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { ThemeProvider } from "./hooks/use-theme.tsx";
import "./index.css";
import { AuthProvider } from "./providers/AuthProvider.tsx";

export const Main = () => {
  return (
    <StrictMode>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter basename="/fieg">
            <App />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Main />);
