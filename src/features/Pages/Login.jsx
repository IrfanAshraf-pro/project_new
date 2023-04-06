import React from "react";
import Background from "../../assests/bg-login.png";

const Login = () => {
  var backgroundStyles = {
    backgroundImage: `url(${Background})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div className="h-screen w-full flex items-center justify-center" style={backgroundStyles}>
      <div className="card text-center bg-base-100 p-3 py-6 max-w-md bg-opacity-90">
        <div className="font-bold font-uppercase text-accent text-4xl md:text-5xl mx-auto mt-4">
          Welcome to House of Tutors
        </div>
        <form className="my-6">
          <div className="form-control w-full max-w-xs mx-auto">
            <input
              type="text"
              name="email"
              placeholder="Enter your Email"
              className="input w-full max-w-xs input-accent text-gray-600"
            />
            <label className="label">
              <span className="label-text text-error">Bottom Left label</span>
            </label>
          </div>
          <div className="form-control w-full max-w-xs mx-auto my-2">
            <input
              type="text"
              name="password"
              placeholder="Enter your Password"
              className="input w-full max-w-xs input-accent text-gray-600"
            />
            <label className="label">
              <span className="label-text text-error">Bottom Left label</span>
            </label>
          </div>
          <button className="btn btn-wide btn-accent text-primary text-lg" type="submit">Login</button>
          <div className="w-full max-w-xs mx-auto mt-4 text-secondary text-lg md:text-xl">
            Already have an account? 
            <span className="ml-2 text-accent font-bold text-xl md:text-2xl">
              SignUp
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
