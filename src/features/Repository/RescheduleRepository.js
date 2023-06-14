import Repository from "./Repository";
const GetClassesToReschedule = "tutor/GetTutorClassesForRescheduling";
const GetFreeClassesToRescheduleTo = "tutor/GetClassesToRescheduleTo";
const GetSuggestedClassesToRescheduleTo =
  "tutor/GetSuggestedClassesToRescheduleTo";
const GetSuggestedClassesToRescheduleToMultiple =
  "tutor/GetSuggestedClassesToRescheduleToMultiple";
const rescheduleUrl = "tutor/reschedule";
const Preschedule = "tutor/PreSchedule";
const RescheduleStudent = "tutor/rescheduleByStudent";
// multiple
const GetTutorClassesForReschedulingMultiple =
  "tutor/GetTutorClassesForReschedulingMultiple";
export default {
  getClassesToReschedule(email, date, day) {
    const url = `${GetClassesToReschedule}?email=${email}&date=${date}&day=${day}`;
    return Repository.get(url);
  },
  getFreeClassesToRescheduleTo(temail, semail, date, day, coursename) {
    const url = `${GetFreeClassesToRescheduleTo}?temail=${temail}&semail=${semail}&date=${date}&day=${day}&coursename=${coursename}`;
    console.log(url);
    return Repository.get(url);
  },
  rescheduleClass(reschedule) {
    const url = `${rescheduleUrl}`;
    console.log("reschedule data is ", reschedule);
    return Repository.post(url, reschedule);
  },
  rescheduleStudentRequest(reschedule) {
    const url = `${RescheduleStudent}`;
    console.log("reschedule student request data in repo", reschedule);
    return Repository.post(url, reschedule);
  },
  preScheduleClass(preschedule) {
    const url = `${Preschedule}`;
    console.log("reschedule data is ", preschedule);
    return Repository.post(url, preschedule);
  },
  getSuggestedClasesForRescheduling(temail, semail, date, day, coursename) {
    const url = `${GetSuggestedClassesToRescheduleTo}?temail=${temail}&semail=${semail}&date=${date}&day=${day}&coursename=${coursename}`;
    return Repository.get(url);
  },
  // Multiple Rescheduling
  getClassesForMultipleRescheduling(
    email,
    startDate,
    startDay,
    endDate,
    endDay
  ) {
    const url = `${GetTutorClassesForReschedulingMultiple}?email=${email}&startDate=${startDate}&startDay=${startDay}&endDate=${endDate}&endDay=${endDay}`;
    return Repository.get(url);
  },
  getMultipleSuggestedClasses(
    temail,
    semail,
    startDate,
    startDay,
    endDate,
    endDay,
    classDate,
    coursename
  ) {
    const url = `${GetSuggestedClassesToRescheduleToMultiple}?temail=${temail}&semail=${semail}&startDate=${startDate}&startDay=${startDay}&endDate=${endDate}&endDay=${endDay}&classDate=${classDate}&coursename=${coursename}`;
    return Repository.get(url);
  },
};
