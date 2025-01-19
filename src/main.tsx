import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import {Provider} from "react-redux";
import store from "@/redux/store.ts";
import ConsentManager from "@/consentManager.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <ConsentManager/>
            <App />
        </BrowserRouter>
        </Provider>
    </StrictMode>
);