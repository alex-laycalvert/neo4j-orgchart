import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import OrgChartPage from "./components/OrgChart";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/orgchart" element={<OrgChartPage />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
