import { Login } from "./features/Pages";
// import { useEffect } from "react";
// import { themeChange } from "theme-change";

function App() {
  // const themeValues = ["customTheme","cupcake","dark","dracula","night","synthwave","aqua","luxury","lofi"];
  // useEffect(() => {
  //   themeChange(false);
  // });
  return (
    <div>
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
    </div>
  );
}

export default App;
