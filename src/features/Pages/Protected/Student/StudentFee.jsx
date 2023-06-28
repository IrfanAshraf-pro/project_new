import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { StudentNotEnrolled } from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import StudentFeeModal from "../../../Components/Student/StudentFeeModal";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
const StudentFee = () => {
  const [fee, setFee] = useState([]);
  // const [selectedTutor, setSelectedTutor] = useState({});
  const [totalFee, setTotalFee] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const feerepo = RepositoryFactory.get("fee");
  const gettingFeeDetails = async () => {
    let { data } = await feerepo.GetStudentFeeDetails(user.email);
    if (typeof data === "object") {
      setFee(data);
      calculatingTotalFee(data);
    } else if (data.match(StudentNotEnrolled)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  };
  const calculatingTotalFee = (data) => {
    let ttotalFee = data?.reduce(function (accumulator, item) {
      return accumulator + item.totalFee;
    }, 0);
    setTotalFee(ttotalFee);
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: "Fee Details" }));
    gettingFeeDetails();
  }, []);
  return (
    <>
      <div>
        <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
          {fee.length > 0 ? (
            <>
              <div className="flex items-center justify-between w-[95%] mx-auto p-2 rounded-md bg-secondary text-white">
                <p>Tutor</p>
                <p>Course</p>
                <p>No.of Lectures</p>
                <p>Total</p>
              </div>
              <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl  shadow-primary bg-neutral">
                {fee.map((item) => (
                  <div className="flex bg-white items-center justify-between w-full mx-auto p-2 rounded-md  text-secondary" key={item.courseid}>
                    <span>{item.name}</span>
                    <span>{item.coursename}</span>
                    <span>{item.reportList.length}</span>
                    <span>{item.totalFee}</span>
                  </div>
                ))}
              </div>
              <div className="flex mt-4 justify-between bg-accent p-2 px-4 rounded-md ">
                <span className="font-bold text-lg text-white">Totol Fee</span>
                <span className="font-semibold text-lg text-white">
                  {totalFee}
                </span>
              </div>
            </>
          ) : (
            <p>Fee Records</p>
          )}
        </div>
      </div>
      {/* <StudentFeeModal selectedTutor={selectedTutor} /> */}
    </>
  );
};

export default StudentFee;

{
  /* <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
  {fee.map((item) => (
    <label
      htmlFor="studentfeemodal"
      onClick={() => setSelectedTutor(item)}
      key={item.courseid}
    >
      <div className="flex justify-between items-center  bg-base-100 px-4 py-2 rounded-md group-hover:bg-accent">
        <span className="text-secondary group-hover:text-primary">
          {item.tutoremail}
        </span>
        <span className="text-secondary group-hover:text-primary">
          {item.totalFee}
        </span>
      </div>
    </label>
  ))}
</div>; */
}
