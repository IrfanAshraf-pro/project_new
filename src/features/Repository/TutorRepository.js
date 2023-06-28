import Repository from "./Repository";
const RequestTutor = "student/SendRequestToTutor";
const AcceptStudentRequest = "tutor/AcceptStudentRequest";
const RejectStudentRequest = "tutor/RejectStudentRequest";
const GetStudentRequest = "tutor/GetStudentRequests";
const GetAllTutors = "admin/GetAllTutors";
const BlockTutor = "admin/BlockTutors";
export default {
  requestingTutor(email, temail, cid, slot) {
    const url = `${RequestTutor}?semail=${email}&temail=${temail}&cid=${cid}&slot=${slot}`;
    return Repository.post(url);
  },
  GetStudentRequests(email) {
    const url = `${GetStudentRequest}?email=${email}`;
    return Repository.get(url);
  },
  AcceptRequest(tutoremail, studentemail, courseid, slot) {
    const url = `${AcceptStudentRequest}?tutoremail=${tutoremail}&studentemail=${studentemail}&courseid=${courseid}&slot=${slot}`;
    return Repository.post(url);
  },
  RejectRequest(tutoremail, studentemail, courseid, slot) {
    const url = `${RejectStudentRequest}?tutoremail=${tutoremail}&studentemail=${studentemail}&courseid=${courseid}&slot=${slot}`;
    return Repository.post(url);
  },
  GetAllTutors() {
    const url = `${GetAllTutors}`;
    return Repository.get(url);
  },
  blockTutor(tutor) {
    const url = `${BlockTutor}`;
    return Repository.post(url, tutor);
  },
};
