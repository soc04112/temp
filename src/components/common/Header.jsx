// src/components/common/Header.jsx

import "../../styles/common/Header.css";
// 마리오 이미지 (public/assets 폴더에 이미지가 있다고 가정하거나, 없으면 텍스트만 나옵니다)
// import MarioIcon from '../../assets/mario_icon.png'; 

export default function Header() {
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
                <button className="icon-btn">☀</button> {/* 다크모드 토글 */}
                <button className="login-btn">
                    <i className="fa-solid fa-right-to-bracket"></i> 로그인
                </button>
            </div>
        </div>
    )
}