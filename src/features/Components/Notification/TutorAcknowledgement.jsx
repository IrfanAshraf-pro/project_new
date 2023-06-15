import React from "react";
import { TiTick } from "react-icons/ti";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { NotifcationRead, ReplyToNotification } from "../../Utils/MatchTypes";
import { toast } from "react-toastify";

const TutorAcknowledgement = ({ notification }) => {
  const notificationrepo = RepositoryFactory.get("notification");
  const onAccept = async() => {
    let mss={...notification,notificationReply:"Yes"}
    let {data}=await notificationrepo.sendFeeAcknowledgement(mss)
    if(data.match(NotifcationRead))
    {

    }else{
      console.log('error while sending acknowledgement',data);
    }
    
  };
  const OnReject = async () => {
    let mss={...notification,notificationReply:"No"}
    let {data}=await notificationrepo.sendFeeAcknowledgement(mss)
    if(data.match(NotifcationRead))
    {
    }else{
      console.log('error while sending acknowledgement',data);
    }
    
 };
  return (
    <>
      <div className="px-3 mb-2 w-full bg-white hover:bg-[#daf3f7] shadow-md py-2 rounded-md cursor-pointer group">
        <div className="flex flex-col ">
          <p tabindex="0" className="focus:outline-none text-sm leading-5">
            {notification.notificationMsg.split(';')[0]}
          </p>
          <div className="flex w-full gap-4 justify-between">
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={onAccept}
            >
              Yes
            </button>
            <button
              className="px-3 py-1.5 text-accent bg-white shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
              onClick={OnReject}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TutorAcknowledgement;
