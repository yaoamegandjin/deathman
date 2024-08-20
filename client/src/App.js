import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Hangman from "./pages/Hangman";
import Home from "./pages/Home";
import Leaderboard from './pages/Leaderboard';
import ForgotPassword from './pages/ForgotPassword';
import UpdatePassword from "./pages/UpdatePassword";
import HowToPlayPage from "./pages/HowToPlayPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/:username" element={<Hangman/>}/>
        <Route path="/leaderboard" element={<Leaderboard />}/>
        <Route path="/forgotpassword" element={<ForgotPassword />}/>
        <Route path="/resetpassword/:token" element={<UpdatePassword />}/>
        <Route path="/howtoplay" element={<HowToPlayPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
