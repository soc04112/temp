import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeModal from "./WelcomeModal";

export default function GoogleRedirect() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    if (!code) return;

    const sendCodeToServer = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_POST_URL}/api/GoogleLogin`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: code }),
          credentials: "include", // 쿠키(JWT) 저장을 위해 필수
        });

        console.log("Response Status:", res.status); // 디버그용 상태 코드 출력
        const data = await res.json();

        if (data.message === "exists") {
          // ★ [핵심 수정] 로그인 상태 저장 (이 부분이 없어서 로그인이 안 풀린 것처럼 보임)
          localStorage.setItem("isLogin", "true");
          
          alert("로그인 성공");
          navigate("/trade");
          window.location.reload(); // (선택) 헤더 등 상태 갱신을 위해 새로고침이 필요할 수 있음
        } 
        else if (data.message === "new") {
          // 신규 유저라도 가입 처리가 완료된 상태라면 로그인 처리를 해주는 것이 좋음
          localStorage.setItem("isLogin", "true"); 
          setShowModal(true); 
        }

      } catch (err) {
        console.error("Fetch error:", err);
        alert("로그인 실패: " + err);
        navigate("/trade");
      }
    };

    sendCodeToServer();
  }, [navigate]);

  return (
    <>
      {showModal && (
        <WelcomeModal
          onConfirm={() => navigate("/account")}
        />
      )}
    </>
  );
}