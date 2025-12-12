// src/pages/trade.jsx

import React, { useState, useEffect, useMemo } from 'react';
import "../styles/pages/trade.css";

import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";
import TopStats from "../components/trade/TopStats.jsx";
import ChatBot from "../components/trade/ChatBot.jsx";
import TradingViewWidget from "../components/trade/TradingViewWidget.jsx";

export default function TradePage({ darkMode, setDarkMode }) {
    const [isLogin, setIsLogin] = useState(false);
    const [symbol, setSymbol] = useState("BINANCE:BTCUSDT");
    
    // ★ 1. 데이터 상태 관리
    const [marketData, setMarketData] = useState([]); // 전체 시장 데이터 (검색용)
    const [myWatchlist, setMyWatchlist] = useState(["BTCUSDT", "ETHUSDT", "XRPUSDT", "SOLUSDT", "DOGEUSDT"]); // 내 박스(리스트)
    const [favorites, setFavorites] = useState(new Set(["BTCUSDT"])); // 즐겨찾기(별)
    
    // ★ 2. 검색 및 뷰 모드
    const [searchTerm, setSearchTerm] = useState(""); // 검색어
    const [viewMode, setViewMode] = useState("all");  // 'all'(내 목록) | 'fav'(즐겨찾기)

    useEffect(() => {
        const loginState = localStorage.getItem("isLogin") === "true";
        setIsLogin(loginState);

        // ★ 3. 바이낸스 실시간 시세 가져오기 (USDT 마켓만 필터링)
        const fetchMarketData = async () => {
            try {
                const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
                const data = await res.json();
                
                // USDT 페어만 남기고, 필요한 데이터 포맷으로 변환
                const formattedData = data
                    .filter(item => item.symbol.endsWith("USDT"))
                    .map(item => ({
                        s: item.symbol, // 심볼
                        p: parseFloat(item.lastPrice).toLocaleString(undefined, { maximumFractionDigits: 4 }), // 현재가
                        c: parseFloat(item.priceChangePercent).toFixed(2) + "%", // 등락률
                        up: parseFloat(item.priceChangePercent) > 0 // 상승 여부
                    }));
                
                setMarketData(formattedData);
            } catch (err) {
                console.error("Market data fetch failed:", err);
            }
        };

        fetchMarketData();
        // 5초마다 갱신 (실시간 효과)
        const interval = setInterval(fetchMarketData, 5000); 
        return () => clearInterval(interval);
    }, []);

    // ★ 4. 리스트에 표시할 데이터 필터링 로직
    const displayList = useMemo(() => {
        // (1) 검색어가 있을 때 -> 전체 시장에서 검색 (새로운 코인 찾기)
        if (searchTerm.trim() !== "") {
            return marketData.filter(coin => 
                coin.s.includes(searchTerm.toUpperCase())
            ).slice(0, 50); // 성능을 위해 50개만 표시
        }

        // (2) 검색어가 없을 때 -> '내 박스(myWatchlist)'에 있는 코인만 표시
        // '전체' 탭이면 내 박스 전체, '★' 탭이면 즐겨찾기만
        const myCoins = marketData.filter(coin => myWatchlist.includes(coin.s));
        
        if (viewMode === 'fav') {
            return myCoins.filter(coin => favorites.has(coin.s));
        }
        return myCoins;

    }, [searchTerm, marketData, myWatchlist, viewMode, favorites]);


    // ★ 5. 클릭 핸들러 (차트 변경 + 리스트 추가)
    const handleCoinClick = (coinSymbol) => {
        // 차트 변경
        setSymbol(`BINANCE:${coinSymbol}`);
        
        // 검색 중이었다면 -> 내 박스에 추가하고 검색 초기화
        if (searchTerm !== "") {
            if (!myWatchlist.includes(coinSymbol)) {
                setMyWatchlist(prev => [coinSymbol, ...prev]); // 맨 앞에 추가
            }
            setSearchTerm(""); // 검색창 비우기 (원래 리스트로 복귀)
        }
    };

    // 즐겨찾기 토글
    const toggleFavorite = (e, coinSymbol) => {
        e.stopPropagation();
        setFavorites(prev => {
            const newFavs = new Set(prev);
            if (newFavs.has(coinSymbol)) newFavs.delete(coinSymbol);
            else newFavs.add(coinSymbol);
            return newFavs;
        });
    };

    return (
        <div className="trade-container">
            <div className="area-header">
                <Header darkMode={darkMode} setDarkMode={setDarkMode} isLogin={isLogin} />
            </div>

            <div className="area-top-stats">
                <TopStats isLogin={isLogin} />
            </div>

            <div className="area-main">
                <div className="chart-box">
                    <TradingViewWidget darkMode={darkMode} symbol={symbol} /> 
                </div>

                <div className="watchlist-box">
                    {/* 헤더: 검색창 포함 */}
                    <div className="list-header-search">
                        {/* 탭 버튼 */}
                        <div className="search-tabs">
                            <button 
                                className={`s-tab ${viewMode === 'all' ? 'active' : ''}`}
                                onClick={() => setViewMode('all')}
                            >
                                My List
                            </button>
                            <button 
                                className={`s-tab ${viewMode === 'fav' ? 'active' : ''}`}
                                onClick={() => setViewMode('fav')}
                            >
                                ★
                            </button>
                        </div>
                        
                        {/* 검색 입력창 */}
                        <div className="search-input-wrapper">
                            <i className="fa-solid fa-magnifying-glass search-icon"></i>
                            <input 
                                type="text" 
                                className="coin-search-input" 
                                placeholder="코인 검색 (예: BTC)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* 컬럼명 (검색 중일 땐 '검색 결과' 표시) */}
                    <div className="column-labels">
                        <span>{searchTerm ? "Search Results" : "Symbol"}</span>
                        <span>Last</span>
                        <span>Chg%</span>
                    </div>

                    {/* 리스트 본문 */}
                    <div className="list-content">
                        {displayList.length > 0 ? (
                            displayList.map((coin) => (
                                <div 
                                    key={coin.s} 
                                    className="list-row"
                                    onClick={() => handleCoinClick(coin.s)}
                                >
                                    <div className="symbol-col">
                                        <span 
                                            className={`fav-star ${favorites.has(coin.s) ? 'active' : ''}`}
                                            onClick={(e) => toggleFavorite(e, coin.s)}
                                        >
                                            {favorites.has(coin.s) ? '★' : '☆'}
                                        </span>
                                        <span className="coin-name">{coin.s.replace('USDT', '')}</span>
                                        <span className="coin-pair">/USDT</span>
                                    </div>
                                    <span className={coin.up ? "text-up" : "text-down"}>{coin.p}</span>
                                    <span className={`badge ${coin.up ? "bg-up" : "bg-down"}`}>{coin.c}</span>
                                </div>
                            ))
                        ) : (
                            <div className="empty-msg">
                                {searchTerm ? "검색 결과가 없습니다." : "리스트가 비어있습니다."}
                            </div>
                        )}
                    </div>
                </div>

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