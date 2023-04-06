import { ToastContainer } from "react-toastify";
import { Login } from "./features/Pages";
// import { useEffect } from "react";
// import { themeChange } from "theme-change";

// importing toast styles
import "react-toastify/dist/ReactToastify.css"
function App() {
  // const themeValues = ["customTheme","cupcake","dark","dracula","night","synthwave","aqua","luxury","lofi"];
  // useEffect(() => {
  //   themeChange(false);
  // });
  return (
    <div className="relative">
      {/* <select className="text-primary bg-red-300" data-choose-theme>
        <option value="">Default Value</option>
        {themeValues.map((value) => (
          <option
            className="text-primary"
            key={value.toLocaleLowerCase()}
            value={value.toLocaleLowerCase()}
          >
            {value}
          </option>
        ))}
      </select> */}
      <Login />
      <ToastContainer
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
      />
    </div>
  );
}

export default App;
