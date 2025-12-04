import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css'

import Trade from './pages/trade.jsx'

import Dashboard from './pages/dashboard.jsx'
import Home from './pages/home.jsx'

import { useState, useEffect } from "react";
import { Settings } from "lucide-react";

import { getDB } from "./components/common/OpenDB.jsx"

function App() {

    // DB 테이블 생성
    useEffect(() => {
        (async () => {
            await getDB();
        })();
    }, []);


    const [darkMode, setDarkMode] = useState(() => {
            const saved = localStorage.getItem("darkMode");
            return saved ? JSON.parse(saved) : false; // 기본값 true
        });

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    return (
        <>
            <button 
                className="dark-toggle-btn"
                onClick={() => setDarkMode(prev => !prev)}
            >
                <Settings size={20} />
            </button>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/trade" element={<Trade />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
export default App
