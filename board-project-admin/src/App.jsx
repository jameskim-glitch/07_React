import { useContext } from "react";
import { AuthContext, AuthProvider } from "./components/AuthContext";
import "./css/App.css";
import DashBoard from "./components/DashBoard";
import Login from "./components/Login";
import { BrowserRouter } from "react-router-dom";

// 컴포넌트 분리하여 하위 컴포넌트에서 useContext 이용하기
function App() {
  return (
    <AuthProvider>
      <AppConponent />
    </AuthProvider>
  );
}

function AppConponent() {
  // 로그인을 했다면 DashBoard 렌더링
  // 로그인을 안했다면 Login 렌더링
  // -> 조건 : 로그인 여부
  // -> 로그인을 햇는지 안했는지를 기억해줄 상태값(user)
  // -> user에는 로그인한 사람에 대한 정보가 세팅
  // -> user는 AuthContext 안에 있다!
  // -> ContextAPI 를 이용하여 렌더링 조건처리하면 된다!

  const { user } = useContext(AuthContext);
  return (
    <>
      {user ? (
        <div className="body-container">
          <BrowserRouter>
            {/* BrowserRouter : React 앱에서 URL 경로에 따라 컴포넌트를 보여줄 수 있게 해주는 라우팅 컨테이너(최상위 부모 컴포넌트)
              -> Route, Link, NavLink, useNavigate() 등 같은 라우팅 기능을 사용하려면
              모든 라우팅 요소들을 BrowserRouter 컴포넌트로 감싸야 한다!!!!
            */}
            <DashBoard />
          </BrowserRouter>
        </div>
      ) : (
        <div className="login-section">
          <Login />
        </div>
      )}
    </>
  );
}

export default App;
