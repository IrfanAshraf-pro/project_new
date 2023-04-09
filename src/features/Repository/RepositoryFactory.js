import LoginRepository from "./LoginRepository";
import CoursesRepository from "./CoursesRepository";

const repositories={
    login:LoginRepository,
    course:CoursesRepository
}

export const RepositoryFactory={
    get:(name)=>repositories[name]
}