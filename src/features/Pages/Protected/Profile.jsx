import { useEffect } from "react";
import { Link } from 'react-router-dom'

import { useDispatch, useSelector } from "react-redux";
import {FiSettings} from 'react-icons/fi'
import { setPageTitle } from "../../../app/Slices/Dashboard/HeaderSlice";
import ProfileImg from "../../../assests/saud.jpeg";
import Avatar from '../../../assests/avatar.jpg'
import { toast } from "react-toastify";
const Profile = () => {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(setPageTitle({ title: "Profile" }));
  }, []);
  const throwToast=()=>{
    toast.info('sssssss')
  }
  return (
    <div className="py-6 relative">
      <div className="mx-auto w-64 text-center ">
        <div className="relative w-64 ">
          <img
            className="w-64 h-64 rounded-full absolute group ring ring-3 p-1 ring-accent"
            src={Avatar}
            alt=""
          />
          <div className="w-64 h-64 group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500">
            <img
              className="hidden group-hover:block w-12"
              src="https://www.svgrepo.com/show/33565/upload.svg"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="absolute top-80 right-0 left-0 w-[90%] max-w-md mx-auto text-white rounded-md cshadow bg-accent p-4 px-6 flex  justify-between hover:bg-neutral hover:text-accent"
      onClick={throwToast}
      >
        <span className="capitalize">{user.name}</span>
        <span>{user.email}</span>
      </div>
      {role === "Student" && (
        <Link to={'studentsettings'} className="absolute top-96 right-0 left-0 w-[90%] max-w-md mx-auto text-white rounded-md cshadow bg-accent p-4 px-6 flex items-center justify-between hover:bg-neutral hover:text-accent">
          <span className="capitalize">Settings</span>
          <span><FiSettings size={18}/></span>
        </Link>
      )}
    </div>
  );
};

export default Profile;
