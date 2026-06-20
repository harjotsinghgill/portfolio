import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./theme/ThemeProvider";
import { App } from "./App";
import { site } from "./config";
import "./theme/global.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider accent={site.accentColor}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
