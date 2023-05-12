// import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import React, { lazy, useEffect } from "react";
import { themeChange } from "theme-change";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
// importing toast styles
import "react-toastify/dist/ReactToastify.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import Signup from "./features/Pages/Signup/Signup";
import ParentLogin from "./features/Pages/Protected/ParentLogin";

// Importing pages
const Layout = lazy(() => import("./features/Containers/Layout"));
const Login = lazy(() => import("./features/Pages/Login"));
function App() {
  const { user } = useSelector((state) => state.auth);
  const themeValues = [
    "customTheme",
    "darkcustom",
    "cupcake",
    "dark",
    "dracula",
    "night",
    "synthwave",
    "aqua",
    "luxury",
    "lofi",
  ];
  useEffect(() => {
    themeChange(false);
  });
  return (
    <div className="relative">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/parentLogin" element={<ParentLogin />} />

          <Route path='/signup' element={<Signup/>}/>
          {/* Place new routes over this */}
          <Route path="/app/*" element={<Layout />} />

          <Route
            path="*"
            element={
              <Navigate to={user.email ? "/app/schedule" : "/login"} replace />
            }
          />
        </Routes>
      </Router>
     
    </div>
  );
}

export default App;
// {/* <select className="text-primary bg-red-300" data-choose-theme>
//   <option value="">Default Value</option>
//   {themeValues.map((value) => (
//     <option
//       className="text-primary"
//       key={value.toLocaleLowerCase()}
//       value={value.toLocaleLowerCase()}
//     >
//       {value}
//     </option>
//   ))}
// </select> */}
//
{
  /* <Login /> */
}
{
  /* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */
}
