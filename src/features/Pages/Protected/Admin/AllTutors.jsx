import React, { useState, useEffect } from "react";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { FiStar } from "react-icons/fi";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { AdminBloackTutor, TutorIsBlocked, TutorIsUnblocked } from "../../../Utils/MatchTypes";
const AllTutors = () => {
  const [tutors, setTutors] = useState([]);
  const dispatch = useDispatch();
  const tutorrepo = RepositoryFactory.get("tutor");
  const getAllTutors = async () => {
    let { data } = await tutorrepo.GetAllTutors();
    if (typeof data === "object") {
      setTutors(data);
    } else if (data.match(AdminBloackTutor)) {
      toast.info(data, {
        theme: "colored",
      });
    }
  };
  const BlockingTutor=async(item)=>{
    let {data}=await tutorrepo.blockTutor(item)
    return data
  }
  const onBlock=async(item)=>{
    if(item.isBlocked===1){
      toast.info('Tutor is Already Blocked',{
        theme:'colored'
      })
    }else{
      let data=await BlockingTutor(item)
      if(data.match(TutorIsBlocked)){
        toast.success(data,{
          theme:'colored'
        })
        getAllTutors()
      }else if(data.match(TutorIsUnblocked)){
        toast.success(data,{
          theme:'colored'
        })
        getAllTutors()
      }else{
        console.log('Tutor blocking error',data);
      }
    }
  }
  const onUnblock=async(item)=>{
    if(item.isBlocked===0){
      toast.info('Tutor is Already Unblocked',{
        theme:'colored'
      })
    }else{
      let data=await BlockingTutor(item)
      if(data.match(TutorIsBlocked)){
        toast.success(data,{
          theme:'colored'
        })
        getAllTutors()

      }else if(data.match(TutorIsUnblocked)){
        toast.success(data,{
          theme:'colored'
        })
        getAllTutors()
      }else{
        console.log('Tutor blocking error',data);
      }
    }
  }
  useEffect(() => {
    dispatch(setPageTitle({ title: "All Tutors" }));
    getAllTutors();
  }, []);
  return (
    <div className="overflow-hidden flex items-center flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      <h3 className="text-3xl  font-bold text-accent">All Tutors</h3>
      <div className="flex flex-col h-3/4 md:h-68 w-full  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
        {tutors.length > 0 &&
          tutors.map((tutor) => (
            <div className="group mt-2">
              <div className="p-2 px-4 rounded-md w-full text-white bg-indigo-500 flex items-center justify-between  group-hover:bg-white group-hover:text-indigo-500 duration-500">
                <div className="">
                  <p className="font-bold text-lg">{tutor.name}</p>
                  <Rating
                    initialRating={tutor.rating}
                    fractions={2}
                    emptySymbol={<FiStar size={16} color="#111" />}
                    fullSymbol={<FaStar size={16} color="#ffc107 " />}
                    readonly
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    className={`px-3 py-1.5 duration-500 text-accent  shadow-lg rounded-md flex-1 font-thin max-w-md ${
                      tutor.isBlocked === 0
                        ? "bg-white group-hover:bg-accent group-hover:text-white group-hover:hover:bg-indigo-400 group-hover:hover:text-primary"
                        : "text-white bg-gray-500"
                    }`}
                    onClick={()=>onBlock(tutor)}

                  >
                    Block
                  </button>
                  <button
                    className={`px-3 py-1.5 duration-500 text-accent  shadow-lg rounded-md flex-1 font-thin max-w-md ${
                      tutor.isBlocked === 0
                        ? "text-white bg-gray-500"
                        : "bg-white group-hover:bg-accent group-hover:text-white group-hover:hover:bg-indigo-400 group-hover:hover:text-primary"
                    }`}
                    onClick={()=>onUnblock(tutor)}
                  >
                    UnBlock
                  </button>
                </div>
              </div>
            </div>
          ))}
        {/*  */}
      </div>
    </div>
  );
};

export default AllTutors;
