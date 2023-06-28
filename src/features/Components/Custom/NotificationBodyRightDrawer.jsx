import { useSelector } from "react-redux";
import NotificationRow from "./NotificationRow";
import Mailbox from "../../../assests/Mailbox.svg";
import StudentSimpleNotification from "../Notification/StudentSimpleNotification";
import ReplyableNotification from "../Notification/ReplyableNotification";
import TutorSimpleNotification from "../Notification/TutorSimpleNotification";
import TutorReplyAbleNotification from "../Notification/TutorReplyAbleNotification";
import TutorReplyRescheduleRequest from "../Notification/TutorReplyRescheduleRequest";
import TutorAcknowledgement from "../Notification/TutorAcknowledgement";
import StudentAcceptChangeScheduleRequest from "../Notification/StudentAcceptChangeScheduleRequest";
import TutorReplyTemporaryEnrollment from "../Notification/TutorReplyTemporaryEnrollment";
function NotificationBodyRightDrawer() {
  const { notifications, notificationlength, isTutor } = useSelector(
    (state) => state.notification
  );
  const { role } = useSelector((state) => state.auth);
  const NoNotification = () => (
    <div className="flex h-full items-center flex-col">
      <img src={Mailbox} className="w-52 h-52" />
      <p className="text-accent text-3xl font-bold text-center mt-4 drop-shadow-lg shadow-secondary">
        No Notifications
      </p>
    </div>
  );
  return (
    <div className="mt-4  max-h-screen">
      {role === "Tutor" ? (
        notificationlength > 0 ? (
          <>
          {notifications.tempRequest?.map((requestitem, index) => (
              <TutorReplyTemporaryEnrollment
                notification={requestitem}
                key={index}
              />
            ))}
            {notifications.notifications?.map((notification, index) =>
              notification.notificationType === 1 ? (
                <TutorReplyRescheduleRequest
                  notification={notification}
                  key={index}
                />
              ) : notification.notificationType === 0 ? (
                <TutorSimpleNotification
                  notification={notification}
                  key={index}
                />
              ) : (
                <TutorAcknowledgement notification={notification} key={index} />
              )
            )}
            
            {notifications.request?.map((requestitem, index) => (
              <TutorReplyAbleNotification
                notification={requestitem}
                key={index}
              />
            ))}
            
            
          </>
        ) : (
          <>{<NoNotification />}</>
        )
      ) : notificationlength > 0 ? (
        notifications.map((notification, index) =>
          notification.notificationType === 0 ? (
            <StudentSimpleNotification
              notification={notification}
              key={index}
            />
          ) : notification.notificationType === 1 ? (
            <ReplyableNotification notification={notification} key={index} />
          ) : (
            <StudentAcceptChangeScheduleRequest notification={notification} key={index}/>
          )
        )
      ) : (
        <>{<NoNotification />}</>
      )}
    </div>
  );
}

export default NotificationBodyRightDrawer;
