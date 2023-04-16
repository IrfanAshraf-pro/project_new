import LoginRepository from "./LoginRepository";
import CoursesRepository from "./CoursesRepository";
import ScheduleRepository from "./ScheduleRepository";
import TutorRepository from "./TutorRepository";
import TodaysClasses from "./TodaysClasses";

const repositories={
    login:LoginRepository,
    course:CoursesRepository,
    schedule:ScheduleRepository,
    tutor:TutorRepository,
    todayclasses:TodaysClasses
}

export const RepositoryFactory={
    get:(name)=>repositories[name]
}