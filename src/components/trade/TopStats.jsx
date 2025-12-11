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
            backgroundColor: '#1e222d',
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
            color: '#d1d4dc',
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
            backgroundColor: '#1B3146',
            padding: '2px 5px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_short: {
            fontSize: '1.0rem',
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
            backgroundColor: '#30263F',
            padding: '2px 5px',
            borderRadius: '2px',
            alignItems: 'center',
        },
        row_total: {
            fontSize: '1.0rem',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '2px',
        },

        shortText: { color: '#D64D57' }, // 빨강
        longText: { color: '#38B66C' },  // 초록
        totalText: { fontSize: '1.1rem', fontWeight: 'bold' },  // 초록
        
        bannerArea: {
            flex: 1,
            backgroundColor: '#2a2e39', // 약간 더 밝은 배경
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            color: '#fff',
            textAlign: 'center',
            padding: '10px',
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.cardsArea}>
                {statsData.map((stat, idx) => (
                    <div key={idx} style={styles.card}>
                        <div style={styles.title}>⚡ {stat.label}</div>
                        <div style={styles.row_long}>
                            <span style={{color:'#aaa'}}>롱 청산</span>
                            <span style={styles.longText}>${stat.long}</span>
                        </div>
                        <div style={styles.row_short}>
                            <span style={{color:'#aaa'}}>숏 청산</span>
                            <span style={styles.shortText}>${stat.short}</span>
                        </div>
                        <div style={styles.row_total}>
                            <span style={{color:'#aaa'}}>총 청산</span>
                        </div>
                        <div style={styles.row_total}>
                            <span style={styles.totalText}>${stat.total}</span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div style={styles.bannerArea}>
                <h3 style={{margin:'0 0 5px 0', fontSize:'1rem'}}>로그인 후 사용하실 수 있습니다</h3>
                <p style={{margin:0, fontSize:'0.8rem', color:'#aaa'}}>개인정보 (ex 투자성향, 즐겨찾기, 자금 등)</p>
            </div>
        </div>
    );
}