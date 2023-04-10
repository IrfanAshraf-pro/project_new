import LoginRepository from "./LoginRepository";
import CoursesRepository from "./CoursesRepository";
import ScheduleRepository from "./ScheduleRepository";
import TutorRepository from "./TutorRepository";

const repositories={
    login:LoginRepository,
    course:CoursesRepository,
    schedule:ScheduleRepository,
    tutor:TutorRepository
}

export const RepositoryFactory={
    get:(name)=>repositories[name]
}