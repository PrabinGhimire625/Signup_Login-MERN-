import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  RouterProvider,
} from "react-router-dom"; //for routing
import "./index.css";
import Signup from "./signup/Signup.jsx";
import Navbar from "./navbar/navbar.jsx";
import Login from "./login/login.jsx"; // Ensure correct import case
import Home from "./Home/Home.jsx";
import ForgotPassword from "./ForgotPassword/ForgotPassword.jsx";
import Dashboard from "./dashboard/Dashboard.jsx";
import Profile from "./profile/Profile.jsx";
import UserLists from "./AdminPart/UserLists.jsx";
import EditUser from "./AdminPart/EditUser.jsx";
import AuthState from "./context/AuthState.jsx";
import VerifyOtp from "./ForgotPassword/VerifyOtp.jsx";
import ResetPassword from "./ForgotPassword/ResetPassword.jsx";

function App() {
  return (
    <AuthState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verifyOtp" element={<VerifyOtp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/userList" element={<UserLists />} />
          <Route path="/editUser/:id" element={<EditUser />} />
        </Routes>
      </Router>
    </AuthState>
  );
}
export default App;

// //from method 2  for routing
// import React from "react";
// import { RouterProvider } from "react-router-dom";
// import router from "./routes.jsx";

// const App = () => {
//   return (
//     <div>
//       <RouterProvider router={router}></RouterProvider>
//     </div>
//   );
// };

// export default App;
