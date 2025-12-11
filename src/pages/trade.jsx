// src/pages/trade.jsx

import React, { useState, useEffect } from 'react';
import "../styles/pages/trade.css";

import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import TopStats from "../components/trade/TopStats.jsx";
import ChatBot from "../components/trade/ChatBot.jsx";
import TradingViewWidget from "../components/trade/TradingViewWidget.jsx";

export default function TradePage({ darkMode, setDarkMode }) {
    const [isLogin, setIsLogin] = useState(false);

    // 컴포넌트 마운트 시 로그인 상태 확인
    useEffect(() => {
        const loginState = localStorage.getItem("isLogin") === "true";
        setIsLogin(loginState);
    }, []);

    return (
        <div className="trade-container">
            <div className="area-header">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} isLogin={isLogin} />
            </div>

            <div className="area-top-stats">
                <TopStats isLogin={isLogin} />
            </div>

            <div className="area-main">
                
                {/* 1. 왼쪽: 트레이딩 뷰 (차트) */}
                <div className="chart-box">
                    <TradingViewWidget darkMode={darkMode} />
                </div>

                {/* 2. 중앙: 관심종목 리스트 (Watchlist) */}
                <div className="watchlist-box">
                    <div className="list-header">
                        <span>Symbol</span>
                        <span>Last</span>
                        <span>Chg%</span>
                    </div>
                    <div className="list-content">
                        {[
                            {s: "BTCUSD", p: "94,500", c: "-2.41%", up: false},
                            {s: "ETHUSD", p: "3,240", c: "+1.20%", up: true},
                            {s: "XRPUSD", p: "1.45", c: "-0.50%", up: false},
                            {s: "SOLUSD", p: "145.20", c: "+5.12%", up: true},
                            {s: "DOGE", p: "0.34", c: "+0.00%", up: true},
                            {s: "ADA", p: "1.02", c: "-1.15%", up: false},
                            {s: "AVAX", p: "34.50", c: "+2.30%", up: true},
                            {s: "DOT", p: "7.80", c: "-0.45%", up: false},
                            {s: "LINK", p: "14.20", c: "+3.10%", up: true},
                            {s: "MATIC", p: "0.85", c: "-0.90%", up: false},
                        ].map((coin, i) => (
                            <div key={i} className="list-row">
                                <span className="coin-name">{coin.s}</span>
                                <span className={coin.up ? "text-up" : "text-down"}>{coin.p}</span>
                                <span className={`badge ${coin.up ? "bg-up" : "bg-down"}`}>{coin.c}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. 오른쪽: 채팅봇 */}
                <div className="chat-box">
                    <div className="panel-title">Chat Assistant</div>
                    <div className="chat-content-area">
                        <ChatBot />
                    </div>
                </div>
            </div>

            <div className="area-footer">
                <Footer />
            </div>
        </div>
    );
}