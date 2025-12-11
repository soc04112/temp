// src/components/trade/TopStats.jsx

import React from 'react';

export default function TopStats() {
    // 더미 데이터 (나중에 API로 교체 가능)
    const statsData = [
        { label: "1시간 청산", short: "1.30M", long: "8.04M", total: "9.34M" },
        { label: "4시간 청산", short: "3.49M", long: "13.77M", total: "17.26M" },
        { label: "12시간 청산", short: "46.44M", long: "72.20M", total: "118.64M" },
        { label: "24시간 청산", short: "106.65M", long: "94.41M", total: "201.06M" },
    ];

    // 최근 거래 내역 더미 데이터
    const recentTrades = [
        { time: "14:02:33", coin: "BTC", market: "USDT", type: "매수", qty: "0.005", isBuy: true },
        { time: "13:45:10", coin: "ETH", market: "USDT", type: "매도", qty: "1.200", isBuy: false },
        { time: "11:20:05", coin: "XRP", market: "KRW", type: "매수", qty: "500.0", isBuy: true },
        { time: "09:15:00", coin: "SOL", market: "USDT", type: "매수", qty: "10.00", isBuy: true },
    ];

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: '10px',
        },
        cardsArea: {
            flex: 0.8,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
        },
        card: {
            backgroundColor: 'var(--trade-card-bg)',
            border: '1px solid var(--trade-border)',
            borderRadius: '4px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '0.8rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        },
        title: {
            fontSize: '1.1rem',
            color: 'var(--trade-text)',
            marginBottom: '5px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        row_long: {
            fontSize: '1.0rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            backgroundColor: 'var(--trade-bg)',
            padding: '2px 5px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_short: {
            fontSize: '1.0rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            backgroundColor: 'var(--trade-bg)',
            padding: '2px 5px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_total: {
            fontSize: '1.0rem',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2px',
            color: 'var(--trade-subtext)',
        },

        shortText: { color: '#D64D57' }, // 빨강
        longText: { color: '#38B66C' },  // 초록
        totalText: { fontSize: '1.1rem', fontWeight: 'bold', color: 'var(--trade-text)' },  // 초록
        
        bannerArea: {
            flex: 1,
            backgroundColor: 'var(--trade-card-bg)',
            border: '1px solid var(--trade-border)',
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            color: 'var(--trade-text)',
            overflow: 'hidden', // 테이블 스크롤 처리
            padding: isLogin ? '0' : '10px', // 로그인 시 패딩 제거
            justifyContent: isLogin ? 'start' : 'center',
            alignItems: isLogin ? 'stretch' : 'center',
        },
        // 거래 내역 테이블 스타일
        tableHeader: {
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 1fr',
            padding: '8px 10px',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            backgroundColor: 'var(--trade-bg)',
            borderBottom: '1px solid var(--trade-border)',
            color: 'var(--trade-subtext)',
            textAlign: 'center',
        },
        tableRow: {
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr 0.8fr 0.8fr 1fr',
            padding: '6px 10px',
            fontSize: '0.8rem',
            borderBottom: '1px solid var(--trade-border)',
            textAlign: 'center',
            alignItems: 'center',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.cardsArea}>
                {statsData.map((stat, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.title}>⚡ {stat.label}</div>
                        <div style={styles.row_long}>
                            <span style={{color:'var(--trade-subtext)'}}>롱 청산</span>
                            <span style={styles.longText}>${stat.long}</span>
                        </div>
                        <div style={styles.row_short}>
                            <span style={{color:'var(--trade-subtext)'}}>숏 청산</span>
                            <span style={styles.shortText}>${stat.short}</span>
                        </div>
                        <div style={styles.row_total}>
                            <span style={{color:'var(--trade-subtext)'}}>총 청산</span>
                        </div>
                        <div style={styles.row_total}>
                            <span style={styles.totalText}>${stat.total}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div style={styles.bannerArea}>
                {isLogin ? (
                    <>
                        <div style={{padding:'8px 10px', fontSize:'0.9rem', fontWeight:'bold', borderBottom:'1px solid var(--trade-border)'}}>
                            📋 최근 거래 내역
                        </div>
                        <div style={styles.tableHeader}>
                            <span>체결시간</span>
                            <span>코인명</span>
                            <span>마켓</span>
                            <span>종류</span>
                            <span>거래수량</span>
                        </div>
                        <div style={{overflowY:'auto', flex:1}}>
                            {recentTrades.map((trade, i) => (
                                <div key={i} style={styles.tableRow}>
                                    <span style={{color:'var(--trade-subtext)'}}>{trade.time}</span>
                                    <span style={{fontWeight:'bold'}}>{trade.coin}</span>
                                    <span>{trade.market}</span>
                                    <span style={{color: trade.isBuy ? '#089981' : '#f23645'}}>{trade.type}</span>
                                    <span>{trade.qty}</span>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h3 style={{margin:'0 0 5px 0', fontSize:'1rem'}}>로그인 후 사용하실 수 있습니다</h3>
                        <p style={{margin:0, fontSize:'0.8rem', color:'var(--trade-subtext)'}}>개인정보 (ex 투자성향, 즐겨찾기, 자금 등)</p>
                    </>
                )}
            </div>
        </div>
    );
}