import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { slotsToStringSlot } from "../../../Utils/CourseFunctions";
import { NotificationSent, NotificationStudentNotExist, TutorNotFoundOrDoesnotExist } from "../../../Utils/MatchTypes";

const RequestSlots = ({isRequestSlots,selected}) => {
  const [classes, setClasses] = useState([]);
  const [slotsShow, setSlotsShow] = useState([]);
  const [slotsValue, setSlotsValue] = useState([]);
  const [selectedValues, setSelectedValues] = useState({});
  const { user } = useSelector((state) => state.auth);
  const repo = RepositoryFactory.get("schedule");
  const notificationrepo= RepositoryFactory.get("notification");
  const gettingFreeClasses = async () => {
    const { data } = await repo.getTutorFreeClasses(user.email);
    if (typeof data === "string") {
      // dividing slots to array and mapping on state
      const slotString = data.substring(0, data.length - 1);
      const slotArr = slotString.split(",");
      console.log("slotArr", slotArr);
      setSlotsValue(slotArr);
      // calling schedule functions and mapping slots
      const slot = data.substring(0, data.length - 1);
      const slotShow = slotsToStringSlot(slot);
      setSlotsShow(slotShow);
      //   setClasses(data);
      console.log("data is ", data);
      console.log("slotShow", slotShow);
      console.log("slotsValue", slotsValue);
    } else if (data.match(TutorNotFoundOrDoesnotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  };
  const handleCheckBox = (e) => {
    if (selectedValues[e.target.name]) {
      const name = e.target.name;
      delete selectedValues[name];
      setSelectedValues(selectedValues);
      return;
    }
    setSelectedValues({ ...selectedValues, [e.target.name]: e.target.value });
  };

  const requestClasses = async () => {
    console.log("selected slots", selectedValues);
    console.log("matched slots are ", classes);
    console.log("slots value ", slotsValue);
    //new logic to check noOfSlots Matched Or not
    let keysList = Object.keys(selectedValues).length;
    if (keysList>=1) {
        console.log("keys matched with slots");
        let valuesString = Object.values(selectedValues).join(",");
        console.log("valuesString", valuesString);
        sendStudentNotification(valuesString)
    }else{
        toast.info('Please select atleast one slot.')
    }
    
  };
  const sendStudentNotification=async(slots)=>{
    let notification = {
      email: selected.email,
      notificationType: 1,
      isRead: 0,
      notificationMsg: `${user.name} has requested following slots to be made available;${slots};${user.email}`,
      notificationReply: "",
    };
    let { data } = await notificationrepo.sendStudentNotification(notification);
    if (data.match(NotificationSent)) {
      toast.success(data);
    } else if (data.match(NotificationStudentNotExist)) {
      toast.info(data);
    } else {
      console.log(
        "error in sending notification to student when cstudent reschedule class request is rejected",
        data
      );
    }
  }
  //selected class is 
  console.log('selected', selected)
  useEffect(() => {
    setClasses([])
    setSlotsShow([])
    setSlotsValue([])
    setSelectedValues({})
    gettingFreeClasses()
  }, [isRequestSlots]);
  useEffect(() => {
    console.log("selectedValues", selectedValues);
  }, [selectedValues]);

  return (
    <div>
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="requestingslots" className="modal-toggle" />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="requestingslots"
      >
        <div className="modal-box">
          <h3 className="text-lg font-bold">Please Select atleast 2 slots</h3>
          <div className="grid grid-cols-2 px-2 mb-4 gap-3 md:gap-4  justify-between overflow-x-hidden">
              {slotsShow.map((item, index) => (
                <label
                  key={index}
                  className="text-secondary flex  items-center justify-start w-[600px]"
                >
                  <input
                    type="checkbox"
                    id={index}
                    name={index}
                    value={slotsValue[index]}
                    // checked={isChecked}
                    onChange={handleCheckBox}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 mr-1"
                  />
                  {item}
                </label>
              ))}
          </div>
          <label
            htmlFor="requestingslots"
            className="px-4 mt-2 py-2 text-white bg-accent shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
            onClick={requestClasses}
          >
            Request
          </label>
        </div>
      </label>
    </div>
  );
};

export default RequestSlots;
