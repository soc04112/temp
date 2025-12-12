// src/components/common/Header.jsx

import "../../styles/common/Header.css";
import { useState } from 'react';
// ★ 수정 1: ProfileModal 임포트
import ProfileModal from '../dashboard/ProfileModal.jsx'; 

export default function Header({ darkMode, setDarkMode, isLogin }) {
    
    // ★ 수정 2: 프로필 모달 상태 추가
    const [showProfileModal, setShowProfileModal] = useState(false);

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
                                <span className="value">$10,000</span>
                            </div>
                            <div className="info-item">
                                <span className="label">등급:</span>
                                <span className="value badge-master">master</span>
                            </div>
                            <span className="user-name"><strong>MASTER</strong>님</span>
                        </div>

                        <div className="divider"></div>

                        {/* ★ 수정 3: 클릭 시 모달 열기 (setShowProfileModal(true)) */}
                        <button 
                            className="icon-btn" 
                            title="내 정보 상세"
                            onClick={() => setShowProfileModal(true)}
                        >
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

                        <button className="login-btn" onClick={handleLogin}>
                            <i className="fa-solid fa-right-to-bracket"></i> 로그인
                        </button>
                    </>
                )}
            </div>

            {/* ★ 수정 4: 모달 컴포넌트 렌더링 */}
            {showProfileModal && (
                <ProfileModal onClose={() => setShowProfileModal(false)} />
            )}
        </div>
    )
}