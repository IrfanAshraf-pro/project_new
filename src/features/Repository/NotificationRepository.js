import Repository from "./Repository";
const StudentNotification = "notification/StudentNotification";
const MarkStudentNotificationAsRead =
  "notification/MarkStudentNotificationAsRead";
const TutorNotification = "notification/TutorNotification";
const MarkTutorNotificationAsRead = "notification/MarkTutorNotificationAsRead";
const AddTutorNotification="notification/AddTutorNotification"
const AddStudentNotification="notification/AddStudentNotification"
const FeeAcknowledgement="notification/FeeAcknowledgement"
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
  sendTutorNotification(notification){
    const url = `${AddTutorNotification}`;
    return Repository.post(url, notification);
  },
  sendStudentNotification(notification){
    const url = `${AddStudentNotification}`;
    return Repository.post(url, notification);
  },
  sendFeeAcknowledgement(notification){
    const url = `${FeeAcknowledgement}`;
    return Repository.post(url, notification);
  },
};
