import React, { useEffect } from "react";
import Account from "./Account";
import AcademicDetails from "./AcademicDetails";
import ContactDetails from "./ContactDetails";
import Details from "./Details";
import Loader from "../../../Components/Custom/Loader";
import { useStepperContext } from "../contexts/StepperContext";
import { toast, ToastContainer } from "react-toastify";
const Form = ({ currentStep }) => {
  const { formik, isLoading, response } = useStepperContext();
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Details />;
      case 3:
        return <ContactDetails />;
      case 4:
        return <AcademicDetails />;
      default:
    }
  };
  const responseHandler = () => {
    !isLoading &&
      response.length > 0 &&
      toast.success(response, {
        theme: "colored",
      });
  };
  useEffect(() => {
    responseHandler();
    console.log(`response is ${response} and loading is ${isLoading}`);
  }, [isLoading, response]);

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        {/* {isLoading && <div className='absolute top-100 bottom-0 right-100 -left-1 w-full h-screen'><Loader/></div>} */}
        {displayStep(currentStep)}
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Form;
