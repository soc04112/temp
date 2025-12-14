// src/components/common/Header.jsx

import "../../styles/common/Header.css";
import { useState } from 'react';
import ProfileModal from '../dashboard/ProfileModal.jsx'; 
import GoogleLogin from '../../components/GoogleLogin/GoogleLogin.jsx'

export default function Header({ darkMode, setDarkMode, isLogin }) {
        
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
                            {/* 1. 현재 자금 */}
                            <div className="info-item">
                                <span className="label">자금:</span>
                                <span className="value">$10,000</span>
                            </div>

                            {/* ★ 추가: 투자 성향 (자금 오른쪽) */}
                            <div className="info-item">
                                <span className="label">성향:</span>
                                <span className="value text-red">공격형</span>
                            </div>
                            
                            {/* 2. 사용자 등급 */}
                            <div className="info-item">
                                <span className="label">등급:</span>
                                <span className="value badge-master">master</span>
                            </div>

                            {/* 3. 사용자명 */}
                            <span className="user-name"><strong>MASTER</strong>님</span>
                        </div>

                        <div className="divider"></div>

                        {/* 내 정보 상세 버튼 */}
                        <button className="icon-btn" title="내 정보 상세" onClick={() => setShowProfileModal(true)} >
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

                        <dev className="login-btn">
                            <GoogleLogin />
                        </dev>
                        
                        {/* <button className="login-btn" onClick={handleLogin}>
                            <i className="fa-solid fa-right-to-bracket"></i> 로그인
                        </button> */}
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