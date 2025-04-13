import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Settingspage from "./pages/Settingspage";
import Profilepage from "./pages/Profilepage";
import { useAuthstore } from "./store/useAuthstore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, ischeckingauth } = useAuthstore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log({ authUser });

  if (ischeckingauth && !authUser) {
    return (
      <div className="flex items-center h-screen justify-center">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route path="/signup" element={!authUser? <Signuppage /> : <Navigate to='/' />} />
        <Route path="/login" element={!authUser? <Loginpage /> : <Navigate to='/' />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route
          path="/profile"
          element={authUser ? <Profilepage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
