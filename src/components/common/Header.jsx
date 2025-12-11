// src/components/common/Header.jsx

import "../../styles/common/Header.css";
import { useState } from 'react';
import LoginModel from './Login.jsx'; // 로그인 모달 (기존에 있다면 사용)
import LogOut from '../../services/POST/LogOut.jsx';

export default function Header({ darkMode, setDarkMode, isLogin }) {
    const [showLoginModal, setShowLoginModal] = useState(false);

    // 로그아웃 핸들러
    const handleLogout = async () => {
        if(window.confirm("로그아웃 하시겠습니까?")) {
            await LogOut();
            localStorage.removeItem("isLogin");
            window.location.reload();
        }
    };

    return (
        <div className="custom-header-content">
            {/* 좌측: 투자 마리오 로고 */}
            <div className="mario-logo">
                <span className="text-red">투자</span>
                {/* 이미지가 있다면 아래 img 태그 주석 해제 */}
                {/* <img src="/assets/mario_face.png" alt="mario" className="mario-img" /> */}
                <div className="mario-icon-placeholder">M</div> {/* 이미지 없을 때 임시 아이콘 */}
                <span className="text-blue">마리오</span>
            </div>

            {/* 중앙: (비워두거나 필요한 경우 티커 배치) */}
            <div className="header-spacer"></div>

            {/* 우측: 유틸리티 버튼 */}
            <div className="header-utils">
                {/* 로그인 상태일 때 보여줄 정보들 */}
                {isLogin && (
                    <div className="user-info-bar">
                        <div className="info-item">
                            <span className="label">자금:</span>
                            <span className="value">₩ 15,000,000</span>
                        </div>
                        <div className="info-item">
                            <span className="label">등급:</span>
                            <span className="value badge-gold">Gold</span>
                        </div>
                        <div className="info-item">
                            <span className="label">성향:</span>
                            <span className="value text-red">공격형</span>
                        </div>
                        
                        <div className="divider"></div>

                        <span className="user-name"><strong>홍길동</strong>님</span>
                        
                        <button className="icon-btn-small" title="내 정보 상세">
                            <i className="fa-solid fa-user-gear"></i>
                        </button>
                    </div>
                )}

                <button 
                    className="icon-btn" 
                    onClick={() => setDarkMode(prev => !prev)}
                    title="다크모드 토글"
                >
                    {darkMode ? '☀️' : '🌙'}
                </button>

                {/* 로그인/로그아웃 버튼 */}
                {isLogin ? (
                    <button className="logout-btn" onClick={handleLogout}>
                        로그아웃
                    </button>
                ) : (
                    <button className="login-btn" onClick={() => setShowLoginModal(true)}>
                        <i className="fa-solid fa-right-to-bracket"></i> 로그인
                    </button>
                )}
            </div>

            {/* 로그인 모달 */}
            {showLoginModal && <LoginModel onClose={() => setShowLoginModal(false)} />}
        </div>
    )
}