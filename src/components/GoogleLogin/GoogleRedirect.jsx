import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeModal from "./WelcomeModal";   // ← 모달 컴포넌트 추가

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
          credentials: "include",
        });

        const data = await res.json();

        if (data.message === "exists") {
          alert("로그인 성공");
          navigate("/trade");
        } 
        else if (data.message === "new") {
          setShowModal(true); // 모달 열기
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
