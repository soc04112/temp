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
    USDT: "https://cryptologos.cc/logos/tether-usdt-logo.png?v=025",
};

export default function TopStats({ isLogin }) {
    // 1. 청산 현황 데이터
    const statsData = [
        { label: "1시간 청산", short: "1.30M", long: "8.04M", total: "9.34M" },
        { label: "4시간 청산", short: "3.49M", long: "13.77M", total: "17.26M" },
        { label: "12시간 청산", short: "46.44M", long: "72.20M", total: "118.64M" },
        { label: "24시간 청산", short: "106.65M", long: "94.41M", total: "201.06M" },
    ];

    // 2. [현물] 포지션 데이터
    const positionData = [
        { coin: "BTC", type: "매수", entry: "92,100", pnl: "+1,250", value: "15,200", isWin: true },
        { coin: "ETH", type: "매도", entry: "3,350", pnl: "+450", value: "4,500", isWin: true },
        { coin: "XRP", type: "매수", entry: "1.48", pnl: "-15", value: "850", isWin: false },
    ];

    // 3. [현물] 보유 코인 데이터
    const holdingData = [
        { coin: "USDT", amount: "5,420", entry: "1.00", roe: "0.0%", value: "5,420", isWin: true },
        { coin: "BTC", amount: "0.15", entry: "65,200", roe: "+12.5%", value: "13,800", isWin: true },
        { coin: "ETH", amount: "2.5", entry: "3,100", roe: "+5.2%", value: "8,100", isWin: true },
        { coin: "SOL", amount: "150", entry: "85.5", roe: "-2.1%", value: "21,500", isWin: false },
    ];

    // 4. 통합 거래 내역
    const historyData = [
        { time: "14:02", coin: "BTC", market: "USDT", type: "매수", qty: "0.005", isBuy: true },
        { time: "13:45", coin: "ETH", market: "USDT", type: "매도", qty: "1.2", isBuy: false },
        { time: "11:20", coin: "XRP", market: "KRW", type: "매수", qty: "500", isBuy: true },
        { time: "09:15", coin: "SOL", market: "USDT", type: "매수", qty: "10", isBuy: true },
    ];

    const styles = {
        container: {
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: '10px',
        },
        cardsArea: {
            flex: 0.7, 
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
        },
        rightArea: {
            flex: 1.3, 
            display: 'flex',
            gap: '10px',
        },
        
        // 박스 공통 스타일
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
        historyBox: {
            flex: 1,
            backgroundColor: 'var(--trade-card-bg)',
            border: '1px solid var(--trade-border)', 
            borderRadius: '4px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        },

        // --- 텍스트 스타일 ---
        title: {
            fontSize: '0.9rem', // 폰트 다시 키움
            color: 'var(--trade-text)', 
            marginBottom: '8px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
        },
        row_long: {
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            backgroundColor: 'var(--trade-bg)', 
            padding: '6px 10px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_short: {
            fontSize: '0.8rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '5px',
            backgroundColor: 'var(--trade-bg)', 
            padding: '6px 10px',
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

        // --- 테이블 헤더 ---
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
        
        posHeader: {
            display: 'grid',
            gridTemplateColumns: '0.9fr 0.8fr 1fr 1fr 1.2fr', 
            padding: '6px 0', fontSize: '0.65rem', fontWeight: 'bold',
            backgroundColor: 'var(--trade-bg)', borderBottom: '1px solid var(--trade-border)',
            color: 'var(--trade-subtext)', textAlign: 'center', 
        },
        holdHeader: {
            display: 'grid',
            gridTemplateColumns: '0.9fr 0.9fr 1fr 1fr 1.2fr', 
            padding: '6px 0', fontSize: '0.65rem', fontWeight: 'bold',
            backgroundColor: 'var(--trade-bg)', borderBottom: '1px solid var(--trade-border)',
            color: 'var(--trade-subtext)', textAlign: 'center', 
        },
        histHeader: {
            display: 'grid',
            gridTemplateColumns: '0.7fr 0.8fr 0.7fr 0.7fr 0.8fr', 
            padding: '6px 0', fontSize: '0.65rem', fontWeight: 'bold',
            backgroundColor: 'var(--trade-bg)', borderBottom: '1px solid var(--trade-border)',
            color: 'var(--trade-subtext)', textAlign: 'center', 
        },

        tableRow: {
            display: 'grid',
            padding: '4px 0',
            fontSize: '0.7rem',
            borderBottom: '1px solid var(--trade-border)',
            alignItems: 'center',
            transition: 'background-color 0.2s',
            cursor: 'default',
            textAlign: 'center',
        },
        
        coinWrapper: {
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px', fontWeight: 'bold',
        },
        coinIcon: { width: '12px', height: '12px', borderRadius: '50%' },
        
        badgeLong: {
            backgroundColor: 'rgba(8, 153, 129, 0.15)', color: '#089981',
            padding: '1px 3px', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 'bold'
        },
        badgeShort: {
            backgroundColor: 'rgba(242, 54, 69, 0.15)', color: '#f23645',
            padding: '1px 3px', borderRadius: '2px', fontSize: '0.65rem', fontWeight: 'bold'
        },
        pnlWin: { color: '#089981', fontWeight: 'bold' },
        pnlLose: { color: '#f23645', fontWeight: 'bold' },
    };

    // [1] 현물 포지션 테이블
    const renderPositionTable = () => (
        <div style={styles.historyBox}>
            <div style={styles.sectionHeader}>
                <span>⚡ 포지션 (현물)</span>
                <span style={{fontSize:'0.7rem', color:'var(--trade-subtext)'}}>{positionData.length}건</span>
            </div>
            <div style={styles.posHeader}>
                <span>코인</span>
                <span>Side</span>
                <span>진입가</span>
                <span>PNL</span>
                <span>평가금</span>
            </div>
            <div style={{overflowY:'auto', flex:1}} className="custom-scroll">
                {positionData.map((pos, i) => (
                    <div key={i} style={{...styles.tableRow, gridTemplateColumns: '0.9fr 0.8fr 1fr 1fr 1.2fr'}}>
                        <div style={styles.coinWrapper}>
                            <img src={coinIcons[pos.coin]} alt="" style={styles.coinIcon} />
                            <span>{pos.coin}</span>
                        </div>
                        <div>
                            <span style={pos.type === '매수' ? styles.badgeLong : styles.badgeShort}>{pos.type}</span>
                        </div>
                        <span style={{color:'var(--trade-subtext)'}}>{pos.entry}</span>
                        <span style={pos.isWin ? styles.pnlWin : styles.pnlLose}>{pos.pnl}</span>
                        <span style={{fontWeight:'bold'}}>${pos.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    // [2] 현물 보유코인 테이블
    const renderHoldingTable = () => (
        <div style={styles.historyBox}>
            <div style={styles.sectionHeader}>
                <span>💰 보유 코인 (현물)</span>
                <span style={{fontSize:'0.7rem', color:'var(--trade-subtext)'}}>{holdingData.length}건</span>
            </div>
            <div style={styles.holdHeader}>
                <span>코인</span>
                <span>수량</span>
                <span>진입가</span>
                <span>수익률</span>
                <span>평가금</span>
            </div>
            <div style={{overflowY:'auto', flex:1}} className="custom-scroll">
                {holdingData.map((hold, i) => (
                    <div key={i} style={{...styles.tableRow, gridTemplateColumns: '0.9fr 0.9fr 1fr 1fr 1.2fr'}}>
                        <div style={styles.coinWrapper}>
                            <img src={coinIcons[hold.coin]} alt="" style={styles.coinIcon} />
                            <span>{hold.coin}</span>
                        </div>
                        <span style={{color:'var(--trade-text)'}}>{hold.amount}</span>
                        <span style={{color:'var(--trade-subtext)'}}>{hold.entry}</span>
                        <span style={hold.isWin ? styles.pnlWin : styles.pnlLose}>{hold.roe}</span>
                        <span style={{fontWeight:'bold'}}>${hold.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    // [3] 거래 내역 테이블
    const renderHistoryTable = () => (
        <div style={styles.historyBox}>
            <div style={styles.sectionHeader}>
                <span>📋 거래 내역</span>
                <span style={{fontSize:'0.7rem', color:'var(--trade-subtext)'}}>{historyData.length}건</span>
            </div>
            <div style={styles.histHeader}>
                <span>시간</span>
                <span>코인</span>
                <span>마켓</span>
                <span>종류</span>
                <span>수량</span>
            </div>
            <div style={{overflowY:'auto', flex:1}} className="custom-scroll">
                {historyData.map((trade, i) => (
                    <div key={i} style={{...styles.tableRow, gridTemplateColumns: '0.7fr 0.8fr 0.7fr 0.7fr 0.8fr'}}>
                        <span style={{color:'var(--trade-subtext)'}}>{trade.time}</span>
                        <div style={styles.coinWrapper}>
                            <img src={coinIcons[trade.coin]} alt="" style={styles.coinIcon} />
                            <span>{trade.coin}</span>
                        </div>
                        <span style={{color:'var(--trade-subtext)'}}>{trade.market}</span>
                        <div>
                            <span style={trade.isBuy ? styles.badgeLong : styles.badgeShort}>{trade.type}</span>
                        </div>
                        <span style={{color:'var(--trade-subtext)'}}>{trade.qty}</span>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            {/* 좌측: 청산 현황 (내용 복구) */}
            <div style={styles.cardsArea}>
                {statsData.map((stat, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.title}>⚡ {stat.label}</div>
                        {/* ★ 수정: '롱 청산' 풀네임 복구 */}
                        <div style={styles.row_long}>
                            <span style={{color:'var(--trade-subtext)'}}>롱 청산</span>
                            <span style={styles.longText}>${stat.long}</span>
                        </div>
                        {/* ★ 수정: '숏 청산' 풀네임 복구 */}
                        <div style={styles.row_short}>
                            <span style={{color:'var(--trade-subtext)'}}>숏 청산</span>
                            <span style={styles.shortText}>${stat.short}</span>
                        </div>
                        {/* ★ 수정: '총 청산' 라벨 복구 */}
                        <div style={styles.row_total}>
                            <span>총 청산</span>
                        </div>
                        <div style={{textAlign:'center'}}>
                            <span style={styles.totalText}>${stat.total}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* 우측: 포지션 - 보유코인 - 거래내역 */}
            <div style={styles.rightArea}>
                {isLogin ? (
                    <>
                        {renderPositionTable()}
                        {renderHoldingTable()}
                        {renderHistoryTable()}
                    </>
                ) : (
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