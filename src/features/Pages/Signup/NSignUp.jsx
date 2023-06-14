import React from "react";
import {
  UseContextProvider,
  useStepperContext,
} from "./contexts/StepperContext";

// importing background image for login page
import Background from "../../../assests/bg-login.png";
import Form from "./Form";
var backgroundStyles = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
const NSignUp = () => {
  return (
     <div 
    
      className="h-screen w-full flex items-center justify-center"
      style={backgroundStyles}
    >
      <div 
      className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto "
   
    >
        <div 
        className="h-10/12 md:h-68 overflow-y-scroll mt-2 md:mt-4"
          >
          <UseContextProvider>
            {<Form />}
          </UseContextProvider>
        </div>
      </div>
    </div>
  );
};

export default NSignUp;
