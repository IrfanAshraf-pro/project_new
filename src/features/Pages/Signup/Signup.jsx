import { useState } from "react";
import Stepper from "./Stepper";
import StepperControl from "./StepperControl";
import {
  UseContextProvider,
  useStepperContext,
} from "./contexts/StepperContext";

// import Account from "./steps/Account";
// import Details from "./steps/Details";
// import ContactDetails from "./steps/ContactDetails";
// import AcademicDetails from "./steps/AcademicDetails";
import Form from "./steps/Form";
// importing background image for login page
import Background from "../../../assests/bg-login.png";
var backgroundStyles = {
  backgroundImage: `url(${Background})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Account Type",
    "Personal Details",
    "ContactDetails",
    "Academic Details",
  ];



  const handleClick = (direction) => {
    let newStep = currentStep;

    direction === "next" ? newStep++ : newStep--;
    // check if steps are within bounds
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={backgroundStyles}
    >
      <div className="card text-center bg-base-100 p-3 py-6 max-w-xl bg-opacity-90 cshadow mx-auto  pb-2  md:w-8/12">
        {/* Stepper */}
        <div className="horizontal container mt-5 ">
          <Stepper steps={steps} currentStep={currentStep} />
          <div className="my-10 px-10 py-4">
            <UseContextProvider>{<Form currentStep={currentStep}/>}</UseContextProvider>
          </div>
        </div>

        {/* navigation button */}
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
}

export default Signup;
