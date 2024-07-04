import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./components/ui/theme-provider";

export default App;

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px] invert dark:bg-[#000000] dark:bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] dark:bg-[size:20px_20px] dark:invert-0 animate-pulse"></div>
    <ThemeProvider defaultTheme="dark" storageKey="app-ui-theme">
      <div className="flex justify-center items-center h-screen w-screen">
        <App />
      </div>
    </ThemeProvider>
  </>
);
