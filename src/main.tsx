
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";
  import { getHomepageData } from "./services/homepageService";

  getHomepageData();
  
  createRoot(document.getElementById("root")!).render(<App />);
  