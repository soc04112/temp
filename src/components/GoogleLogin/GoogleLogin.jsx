import { useGoogleLogin } from '@react-oauth/google';
import './styles/GoogleLogin.css';
import { useEffect, useState } from 'react';

export default function GoogleLogin({ darkMode }) {
  // isMobile 상태
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 940);
  const [imgConvert, setImgConvert] = useState("/assets/web_light_sq_SI.svg");

  // 화면 크기 감지
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <=940);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  // 이미지 선택
  useEffect(() => {

    if (isMobile && darkMode) setImgConvert("/assets/web_dark_sq_na.svg");
    else if (isMobile && !darkMode) setImgConvert("/assets/web_light_sq_na.svg");
    else if (!isMobile && darkMode) setImgConvert("/assets/web_dark_sq_SI.svg");
    else setImgConvert("/assets/web_light_sq_SI.svg");
  }, [isMobile, darkMode]); // 의존성 배열 추가

  const login = useGoogleLogin({
    flow: 'auth-code',
    ux_mode: 'redirect',
    redirect_uri: import.meta.env.VITE_REDIRECT_URL,
    onError: () => console.log("Login Failed")
  });

  return (
      <img 
      className="google-btn" onClick={() => login()}
      src={imgConvert} alt="Google Login" />
  );
}
