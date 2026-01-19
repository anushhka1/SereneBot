import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import Journal from "./pages/Journal";
import Resources from "./pages/Resources";
import { UserData } from "./context/userContext";
import { LoadingBig } from "./components/Loading";

const App = () => {
  const { user, isAuth, loading } = UserData();
  // console.log(user);
  console.log({ user, isAuth, loading });

  return (
    <>
      {loading ? (
        <LoadingBig />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={!isAuth ? <Login /> : <Chat />} />
          <Route path="/signup" element={!isAuth ? <Signup /> : <Login />} />
          <Route path="/chat" element={isAuth ? <Chat /> : <Home />} />
          <Route path="/journal" element={isAuth ? <Journal /> : <Login />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      )}
    </>
  );
};

export default App;
