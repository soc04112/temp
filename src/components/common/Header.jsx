import "../../styles/common/Header.css";
import GoogleLogin from '../GoogleLogin/GoogleLogin.jsx';
import ProfileModal from '../dashboard/ProfileModal.jsx';
import { useState, useEffect } from 'react';

export default function Header({ darkMode, setDarkMode, isLogin }) {
    
    const [showProfileModal, setShowProfileModal] = useState(false);
    
    // [1] 레버리지 상태 (초기값은 API 로딩 전 임시값)
    const [leverage, setLeverage] = useState(10); 
    const [showLev, setShowLev] = useState(false); 

    // [2] 코인 거래 성향 상태
    const [tendency, setTendency] = useState("공격형");
    const [showTendency, setShowTendency] = useState(false);

    // [3] ★ 추가: 백엔드 데이터 상태 (자금, 등급, 이름)
    const [funds, setFunds] = useState(0);
    const [rank, setRank] = useState("Demo");
    const [userName, setUserName] = useState("Guest");

    // [4] 확인 팝업 관련 상태
    const [showConfirm, setShowConfirm] = useState(false); // 팝업 노출 여부
    const [confirmType, setConfirmType] = useState(null);  // 'leverage' or 'tendency'
    const [pendingValue, setPendingValue] = useState(null); // 변경 대기 중인 값 (성향용)

    // ★ 백엔드 데이터 불러오기
    useEffect(() => {
        if (!isLogin) return;

        const fetchUserInfo = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_POST_URL}/api/get_user`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', 
                    body: JSON.stringify({ 
                        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone 
                    })
                });
                
                if (res.ok) {
                    const data = await res.json();
                    console.log(data)
                    if (data && data !== "Nodata") {
                        // 1. 자금, 이름, 등급 설정
                        setFunds(data.funds || 0);
                        setUserName(data.username || "User");
                        setRank(data.tier || "Demo");

                        // 2. 레버리지 설정 (예: "10x" -> 10 변환)
                        if (data.leverage) {
                            const levNum = parseInt(data.leverage);
                            if (!isNaN(levNum)) setLeverage(levNum);
                        }

                        // 3. 성향 설정 (값이 있으면 업데이트)
                        if (data.play && data.play !== "Unknown") {
                            setTendency(data.play);
                        }
                    }
                }
            } catch (error) {
                console.error("Header info fetch error:", error);
            }
        };

        fetchUserInfo();
        
        // 10초마다 데이터 갱신 (자금 변동 등 확인용)
        const interval = setInterval(fetchUserInfo, 10000);
        return () => clearInterval(interval);

    }, [isLogin]);

    // 성향별 색상 매핑
    const getTendencyColor = (t) => {
        if (t === "공격형") return "text-red";
        if (t === "안전형") return "text-green";
        return "text-yellow"; 
    };

    // ★ 확인 팝업 - '예' 클릭 시 실행
    const handleConfirmYes = () => {
        if (confirmType === 'leverage') {
            // 레버리지는 슬라이더로 이미 값이 바뀌어 있으므로 창만 닫음
            // (필요 시 여기서 백엔드에 변경 요청 API 호출 가능)
            setShowLev(false);
        } else if (confirmType === 'tendency') {
            // 대기 중이던 성향 값으로 변경하고 창 닫기
            setTendency(pendingValue);
            setShowTendency(false);
            // (필요 시 여기서 백엔드에 변경 요청 API 호출 가능)
        }
        setShowConfirm(false); // 확인 팝업 닫기
    };

    // ★ 확인 팝업 - '아니오' 클릭 시 실행
    const handleConfirmNo = () => {
        setShowConfirm(false);
        // (선택 사항: 레버리지의 경우 취소 시 이전 값으로 되돌리는 로직을 추가할 수도 있음)
    };

    const handleLoginSuccess = async (response) => {
        console.log("Google Login Response:", response);
        const code = response.code || response.token; 

        if (!code) return;

        try {
            // ★ 수정: 백엔드 주소(VITE_POST_URL) 포함
            const res = await fetch(`${import.meta.env.VITE_POST_URL}/api/GoogleLogin`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token: code }),
                credentials: "include" // 쿠키 설정을 위해 필요할 수 있음
            });

            if (res.ok) {
                const data = await res.json();
                if (data.message === "exists" || data.message === "new") {
                    localStorage.setItem("isLogin", "true");
                    window.location.reload();
                }
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            // 쿠키 삭제 (로그아웃 처리)
            document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            localStorage.removeItem("isLogin");
            window.location.reload();
        }
    };

    return (
        <div className="custom-header-content">
            <div className="mario-logo">
                <span className="text-red">투자</span>
                <div className="mario-icon-placeholder">M</div>
                <span className="text-blue">마리오</span>
            </div>

            <div className="header-spacer"></div>

            <div className="header-utils">
                {isLogin ? (
                    <>
                        <div className="user-info-bar">
                            <div className="info-item">
                                <span className="label">자금:</span>
                                {/* ★ 수정: 백엔드 데이터(funds) 표시 */}
                                <span className="value">${funds.toLocaleString()}</span>
                            </div>

                            {/* [1] 포지션 성향 (레버리지) */}
                            <div className="info-item" style={{position:'relative'}}>
                                <span className="label">포지션 성향:</span>
                                <button 
                                    className="leverage-btn" 
                                    onClick={() => {
                                        setShowLev(!showLev);
                                        setShowTendency(false);
                                    }}
                                >
                                    {leverage}x
                                </button>
                                
                                {showLev && (
                                    <div className="leverage-popup">
                                        <div className="lev-header">
                                            <span>Leverage</span>
                                            <span className="lev-val">{leverage}x</span>
                                        </div>
                                        <input 
                                            type="range" 
                                            min="1" max="100" step="1"
                                            value={leverage}
                                            onChange={(e) => setLeverage(e.target.value)}
                                            className="lev-slider"
                                        />
                                        <div className="lev-marks">
                                            <span>1x</span>
                                            <span>50x</span>
                                            <span>100x</span>
                                        </div>
                                        {/* 확인 버튼 */}
                                        <div 
                                            className="popup-confirm-btn" 
                                            onClick={() => {
                                                setConfirmType('leverage');
                                                setShowConfirm(true);
                                            }}
                                        >
                                            확인
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* [2] 코인 거래 성향 */}
                            <div className="info-item" style={{position:'relative'}}>
                                <span className="label">코인 거래 성향:</span>
                                <button 
                                    className={`tendency-btn ${getTendencyColor(tendency)}`}
                                    onClick={() => {
                                        setShowTendency(!showTendency);
                                        setShowLev(false);
                                    }}
                                >
                                    {tendency}
                                </button>

                                {showTendency && (
                                    <div className="tendency-popup">
                                        {["공격형", "중립형", "안전형"].map((type) => (
                                            <div 
                                                key={type}
                                                className={`tendency-option ${tendency === type ? 'active' : ''}`}
                                                onClick={() => {
                                                    setPendingValue(type);
                                                    setConfirmType('tendency');
                                                    setShowConfirm(true);
                                                }}
                                            >
                                                {type}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* ★ 수정: 백엔드 데이터(rank) 표시 */}
                            <div className="info-item">
                                <span className="label">등급:</span>
                                <span className="value badge-master">{rank}</span>
                            </div>

                            {/* ★ 수정: 백엔드 데이터(userName) 표시 */}
                            <span className="user-name"><strong>{userName}</strong>님</span>
                        </div>

                        <div className="divider"></div>

                        <button className="icon-btn" title="내 정보 상세" onClick={() => setShowProfileModal(true)}>
                            <i className="fa-solid fa-user-gear"></i>
                        </button>

                        <button 
                            className="icon-btn" 
                            onClick={() => setDarkMode(prev => !prev)}
                            title="다크모드 토글"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        
                        <button className="logout-btn" onClick={handleLogout}>
                            로그아웃
                        </button>
                    </>
                ) : (
                    <>
                        <button 
                            className="icon-btn" 
                            onClick={() => setDarkMode(prev => !prev)}
                            title="다크모드 토글"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>

                        <div className="login-btn-wrapper"> 
                            <GoogleLogin onLoginSuccess={handleLoginSuccess} />
                        </div>
                    </>
                )}
            </div>

            {/* 프로필 모달 */}
            {showProfileModal && (
                <ProfileModal onClose={() => setShowProfileModal(false)} />
            )}

            {/* 포지션 변경 확인 팝업 */}
            {showConfirm && (
                <div className="confirm-overlay">
                    <div className="confirm-box">
                        <p className="confirm-msg">포지션을 변경하시겠습니까?</p>
                        <div className="confirm-btns">
                            <button className="btn-yes" onClick={handleConfirmYes}>예</button>
                            <button className="btn-no" onClick={handleConfirmNo}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}