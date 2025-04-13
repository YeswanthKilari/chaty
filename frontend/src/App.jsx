import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Signuppage from "./pages/Signuppage";
import Loginpage from "./pages/Loginpage";
import Settingspage from "./pages/Settingspage";
import Profilepage from "./pages/Profilepage";
import { axiosinstance } from "./lib/axios";
import { useAuthstore } from "./store/useAuthstore";
function App() {
  const { authUser } = useAuthstore();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Signuppage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/settings" element={<Settingspage />} />
        <Route path="/profile" element={<Profilepage />} />
      </Routes>
    </div>
  );
}

export default App;
