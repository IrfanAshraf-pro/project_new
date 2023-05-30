import Repository from "./Repository";
const StudentNotification = "notification/StudentNotification";
const MarkStudentNotificationAsRead =
  "notification/MarkStudentNotificationAsRead";
const TutorNotification = "notification/TutorNotification";
const MarkTutorNotificationAsRead = "notification/MarkTutorNotificationAsRead";
export default {
  getStudentNotifications(email) {
    const url = `${StudentNotification}?email=${email}`;
    return Repository.get(url);
  },
  markStudentNotificationAsRead(notification) {
    const url = `${MarkStudentNotificationAsRead}`;
    return Repository.post(url, notification);
  },
  //Tutor
  getTutorNotifications(email) {
    const url = `${TutorNotification}?email=${email}`;
    return Repository.get(url);
  },
  markTutorNotificationAsRead(notification) {
    const url = `${MarkTutorNotificationAsRead}`;
    return Repository.post(url, notification);
  },
};
