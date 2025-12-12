// src/components/common/Header.jsx

import "../../styles/common/Header.css";

export default function Header({ darkMode, setDarkMode, isLogin }) {
    
    const handleLogin = () => {
        localStorage.setItem("isLogin", "true");
        window.location.reload();
    };

    const handleLogout = () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            localStorage.removeItem("isLogin");
            window.location.reload();
        }
    };

    return (
        <div className="custom-header-content">
            {/* 좌측: 로고 */}
            <div className="mario-logo">
                <span className="text-red">투자</span>
                <div className="mario-icon-placeholder">M</div>
                <span className="text-blue">마리오</span>
            </div>

            <div className="header-spacer"></div>

            {/* 우측: 유틸리티 버튼 */}
            <div className="header-utils">
                
                {isLogin ? (
                    <>
                        <div className="user-info-bar">
                            <div className="info-item">
                                <span className="label">자금:</span>
                                <span className="value">$10,000</span>
                            </div>
                            
                            <div className="info-item">
                                <span className="label">등급:</span>
                                <span className="value badge-master">master</span>
                            </div>

                            {/* 사용자명 */}
                            <span className="user-name"><strong>MASTER</strong>님</span>
                        </div>

                        <div className="divider"></div>

                        {/* ★ 위치 이동: 내 정보 상세 버튼 */}
                        {/* 클래스도 icon-btn으로 변경하여 다크모드 버튼과 크기 통일 */}
                        <button className="icon-btn" title="내 정보 상세">
                            <i className="fa-solid fa-user-gear"></i>
                        </button>

                        {/* 다크모드 버튼 */}
                        <button 
                            className="icon-btn" 
                            onClick={() => setDarkMode(prev => !prev)}
                            title="다크모드 토글"
                        >
                            {darkMode ? '☀️' : '🌙'}
                        </button>
                        
                        {/* 로그아웃 버튼 */}
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

                        <button className="login-btn" onClick={handleLogin}>
                            <i className="fa-solid fa-right-to-bracket"></i> 로그인
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}