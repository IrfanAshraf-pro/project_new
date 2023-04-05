import React from 'react'
import Background from '../../assests/bg-login.png'

const Login = () => {
    var backgroundStyles = {
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      };
  return (
    <div className='h-screen w-full' style={backgroundStyles}>

    </div>
  )
}

export default Login