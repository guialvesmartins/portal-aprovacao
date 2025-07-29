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
        <BrowserRouter basename="/fieg">
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<Main />);
