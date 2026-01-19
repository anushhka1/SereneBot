import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/userContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/chatContext.jsx";
import { JournalProvider } from "./context/journalContext.jsx";
// backend url
export const server = "http://localhost:3001";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ChatProvider>
          <JournalProvider>
            <App />
          </JournalProvider>
        </ChatProvider>
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
