import LoginRepository from "./LoginRepository";
import CoursesRepository from "./CoursesRepository";
import ScheduleRepository from "./ScheduleRepository";
import TutorRepository from "./TutorRepository";
import TodaysClasses from "./TodaysClasses";
import FeeRepository from "./FeeRepository";
import RescheduleRepository from "./RescheduleRepository";
import NotificationRepository from "./NotificationRepository";
const repositories={
    login:LoginRepository,
    course:CoursesRepository,
    schedule:ScheduleRepository,
    tutor:TutorRepository,
    todayclasses:TodaysClasses,
    fee:FeeRepository,
    reschedule:RescheduleRepository,
    notification:NotificationRepository
}

export const RepositoryFactory={
    get:(name)=>repositories[name]
}