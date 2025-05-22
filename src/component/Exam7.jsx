import { useState } from "react";

// SpringBoot 서버로, , React 클라이언트로 서로 요청/응답 주고받는 예제
const Exam7 = () => {
  const [portMsg, setPortMsg] = useState(null);
  const [userMsg, serUserMsg] = useState(null);

  const getPortNumer = () => {
    fetch("http://localhost/getPortNumber")
      .then((res) => res.json())
      .then((data) => {
        setPortMsg(data);
      });
  };

  const getUserInfo = () => {
    fetch("http://localhost/getUserInfo", {
      method: "Post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "홍길동", age: "20" }),
    })
      .then((res) => res.text())
      .then((data) => serUserMsg(data));
  };
  return (
    <div>
      <p>1. 서버로 부터 응답 받은 값(GET)</p>
      <button onClick={getPortNumer}>GET 요청 보내기</button>
      <ul>
        {portMsg?.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>

      <p>2. 서버로 값 전달 후 응답받는 값(POST)</p>
      <button onClick={getUserInfo}>Post 요청 보내기</button>
      <p>{userMsg}</p>
    </div>
  );
};

export default Exam7;
