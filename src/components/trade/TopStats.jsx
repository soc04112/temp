// src/components/trade/TopStats.jsx

import React from 'react';

// 코인 아이콘
const coinIcons = {
    BTC: "https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=025",
    ETH: "https://cryptologos.cc/logos/ethereum-eth-logo.png?v=025",
    XRP: "https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025",
    SOL: "https://cryptologos.cc/logos/solana-sol-logo.png?v=025",
    DOGE: "https://cryptologos.cc/logos/dogecoin-doge-logo.png?v=025",
    ADA: "https://cryptologos.cc/logos/cardano-ada-logo.png?v=025",
};

export default function TopStats({ isLogin }) {
    // 1. 청산 현황 데이터
    const statsData = [
        { label: "1시간 청산", short: "1.30M", long: "8.04M", total: "9.34M" },
        { label: "4시간 청산", short: "3.49M", long: "13.77M", total: "17.26M" },
        { label: "12시간 청산", short: "46.44M", long: "72.20M", total: "118.64M" },
        { label: "24시간 청산", short: "106.65M", long: "94.41M", total: "201.06M" },
    ];

    // 2. 어제 거래 내역 데이터
    const yesterdayTrades = [
        { time: "23:45", coin: "ETH", market: "USDT", type: "매도", price: "3,210", qty: "1.5", isBuy: false },
        { time: "21:20", coin: "XRP", market: "KRW", type: "매수", price: "1,420", qty: "300", isBuy: true },
        { time: "18:15", coin: "SOL", market: "USDT", type: "매수", price: "142.5", qty: "20", isBuy: true },
        { time: "14:30", coin: "BTC", market: "USDT", type: "매도", price: "93,800", qty: "0.1", isBuy: false },
        { time: "09:10", coin: "DOGE", market: "USDT", type: "매수", price: "0.33", qty: "1000", isBuy: true },
        { time: "08:00", coin: "ETH", market: "USDT", type: "매수", price: "3,200", qty: "2.0", isBuy: true },
    ];

    // 3. 오늘 거래 내역 데이터
    const todayTrades = [
        { time: "14:02", coin: "BTC", market: "USDT", type: "매수", price: "94,500", qty: "0.005", isBuy: true },
        { time: "13:45", coin: "ETH", market: "USDT", type: "매도", price: "3,240", qty: "1.2", isBuy: false },
        { time: "11:20", coin: "XRP", market: "KRW", type: "매수", price: "1,450", qty: "500", isBuy: true },
        { time: "09:15", coin: "SOL", market: "USDT", type: "매수", price: "145.2", qty: "10", isBuy: true },
        { time: "08:50", coin: "ADA", market: "USDT", type: "매도", price: "1.02", qty: "150", isBuy: false },
    ];

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: '10px',
        },
        cardsArea: {
            flex: 1, 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
        },
        
        // 우측 영역 전체 컨테이너 (투명 배경, 박스들을 감싸는 역할)
        rightArea: {
            flex: 1,
            display: 'flex',
            gap: '10px', // ★ 박스 사이 간격 추가
        },

        // 공통 카드 스타일 (청산 카드 + 거래내역 박스)
        card: {
            backgroundColor: 'var(--trade-card-bg)',
            border: '1px solid var(--trade-border)', 
            borderRadius: '4px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontSize: '0.8rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        },
        
        // 거래 내역 전용 박스 스타일 (card 스타일을 기반으로 flex 속성 추가)
        historyBox: {
            flex: 1, // 50:50 비율
            backgroundColor: 'var(--trade-card-bg)',
            border: '1px solid var(--trade-border)', 
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden', // 내부 스크롤을 위해
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },

        // ... 텍스트 및 내부 요소 스타일 ...
        title: {
            fontSize: '0.9rem',
            color: 'var(--trade-text)', 
            marginBottom: '5px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        row_long: {
            fontSize: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            backgroundColor: 'var(--trade-bg)', 
            padding: '5px 10px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_short: {
            fontSize: '0.85rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            backgroundColor: 'var(--trade-bg)', 
            padding: '5px 10px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_total: {
            fontSize: '0.85rem',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2px',
            marginTop: '5px',
            color: 'var(--trade-subtext)', 
        },
        shortText: { color: '#f23645', fontWeight: 'bold' }, 
        longText: { color: '#089981', fontWeight: 'bold' },  
        totalText: { fontSize: '1rem', fontWeight: 'bold', color: 'var(--trade-text)' }, 

        // --- 거래 내역 테이블 스타일 ---
        sectionHeader: {
            padding: '8px 10px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            borderBottom: '1px solid var(--trade-border)',
            backgroundColor: 'var(--trade-card-bg)',
            color: 'var(--trade-text)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        tableHeader: {
            display: 'grid',
            gridTemplateColumns: '0.7fr 1fr 0.6fr 0.6fr 0.8fr', 
            padding: '6px 0',
            fontSize: '0.7rem',
            fontWeight: 'bold',
            backgroundColor: 'var(--trade-bg)',
            borderBottom: '1px solid var(--trade-border)',
            color: 'var(--trade-subtext)',
            textAlign: 'center', 
        },
        tableRow: {
            display: 'grid',
            gridTemplateColumns: '0.7fr 1fr 0.6fr 0.6fr 0.8fr',
            padding: '4px 0',
            fontSize: '0.75rem',
            borderBottom: '1px solid var(--trade-border)',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            cursor: 'default',
            textAlign: 'center',
        },
        
        coinWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
            fontWeight: 'bold',
        },
        coinIcon: { width: '14px', height: '14px', borderRadius: '50%' },
        
        badgeBuy: {
            backgroundColor: 'rgba(8, 153, 129, 0.15)', color: '#089981',
            padding: '1px 6px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 'bold'
        },
        badgeSell: {
            backgroundColor: 'rgba(242, 54, 69, 0.15)', color: '#f23645',
            padding: '1px 6px', borderRadius: '3px', fontSize: '0.7rem', fontWeight: 'bold'
        },
    };

    // 박스(Card) 형태로 렌더링하는 함수
    const renderTableBox = (data, title) => (
        <div style={styles.historyBox}>
            <div style={styles.sectionHeader}>
                <span>📅 {title}</span>
                <span style={{fontSize:'0.7rem', color:'var(--trade-subtext)'}}>{data.length}건</span>
            </div>
            <div style={styles.tableHeader}>
                <span>시간</span>
                <span>코인</span>
                <span>마켓</span>
                <span>종류</span>
                <span>수량</span>
            </div>
            <div style={{overflowY:'auto', flex:1}} className="custom-scroll">
                {data.map((trade, i) => (
                    <div 
                        key={i} 
                        style={styles.tableRow}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--trade-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <span style={{color:'var(--trade-subtext)'}}>{trade.time}</span>
                        <div style={styles.coinWrapper}>
                            <img src={coinIcons[trade.coin]} alt="" style={styles.coinIcon} onError={(e) => e.target.style.display='none'}/>
                            <span>{trade.coin}</span>
                        </div>
                        <span style={{color:'var(--trade-subtext)'}}>{trade.market}</span>
                        <div>
                            <span style={trade.isBuy ? styles.badgeBuy : styles.badgeSell}>{trade.type}</span>
                        </div>
                        <div>
                            <span style={{color:'var(--trade-subtext)'}}>{trade.qty}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* 좌측: 청산 현황 카드들 */}
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
                        <div style={styles.row_total}><span>총 청산</span></div>
                        <div style={{textAlign:'center'}}><span style={styles.totalText}>${stat.total}</span></div>
                    </div>
                ))}
            </div>
            
            {/* 우측: 거래 내역 (로그인 시 두 개의 박스로 분리) */}
            <div style={styles.rightArea}>
                {isLogin ? (
                    <>
                        {renderTableBox(yesterdayTrades, "어제 거래내역")}
                        {renderTableBox(todayTrades, "오늘 거래내역")}
                    </>
                ) : (
                    // 비로그인 시 하나의 큰 박스로 표시
                    <div style={{...styles.historyBox, alignItems:'center', justifyContent:'center'}}>
                        <h3 style={{margin:'0 0 5px 0', fontSize:'1rem'}}>로그인 후 사용하실 수 있습니다</h3>
                        <p style={{margin:0, fontSize:'0.8rem', color:'var(--trade-subtext)'}}>
                            개인정보 (ex 투자성향, 즐겨찾기, 자금 등)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}