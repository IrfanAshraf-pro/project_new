import React from "react";
import { TiTick } from "react-icons/ti";
import { RepositoryFactory } from "../../Repository/RepositoryFactory";
import { NotifcationRead, ReplyToNotification } from "../../Utils/MatchTypes";
import { toast } from "react-toastify";

const TutorSimpleNotification = ({ notification }) => {
  const notificationrepo = RepositoryFactory.get("notification");
  const markAsRead = async () => {
    const { data } = await notificationrepo.markTutorNotificationAsRead(notification);
    if (data.match(ReplyToNotification)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(NotifcationRead)) {
    } else {
      console.log("Simple Notification tutor mark as read reply error: ", data);
    }
  };
  return (
    <>
      <div
        className="px-3 mb-2 w-full bg-white hover:bg-[#f5f8dd] shadow-md py-2 rounded-md cursor-pointer"
        onClick={markAsRead}
      >
        <div className="flex items-center justify-between w-full">
          <p tabindex="0" className="focus:outline-none text-sm leading-5">
            {notification.notificationMsg}
          </p>
          <div
            tabindex="0"
            aria-label="close icon"
            role="button"
            className="focus:outline-none cursor-pointer"
          >
            <TiTick size={25} className="fill-indigo-600 font-thin" />
          </div>
        </div>
      </div>
    </>
  );
};

export default TutorSimpleNotification;
