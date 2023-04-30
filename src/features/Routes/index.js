// All components mapping with path for internal routes

import { lazy } from 'react'
import Dashboard from '../Pages/Protected/Dashboard'
import Welcome from '../Pages/Protected/Welcome'
import Profile from '../Pages/Protected/Profile'
import Page404 from '../Pages/Protected/404'
import Schedule from '../Pages/Protected/Schedule'

// student imports
import Courses from '../Pages/Protected/Student/Courses'
import TodayClasses from '../Pages/Protected/Student/TodayClasses'
import Learning from '../Pages/Protected/Student/Learning'
// Tutor imports
import TutorTodayClasses from '../Pages/Protected/Tutor/TutorTodayClasses'
import TutorCourses from '../Pages/Protected/Tutor/TutorCourses'

// ADMIN IMPORTS
import CoursesAdmin from '../Pages/Protected/Admin/Courses' 
import CourseGroup from '../Pages/Protected/Admin/CourseGroup'
const routes = [
  {
    path:'/schedule',//the url
    component:Schedule,//view rendered
  },
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: '/welcome', // the url
  //   component: Welcome, // view rendered
  // },
  {
    path:'/profile', //the url
    component:Profile , //view rendered
  },
  
  {
    path:'/studentcourses',//url
    component:Courses //view rendered
  },
  {
    path:'/studentClasses',//url
    component:TodayClasses
  },
  {
    path:'/studentLearning',//url
    component:Learning
  },
  // tutor routes
  {
    path:'/tutorClasses',
    component:TutorTodayClasses
  },
  {
    path:'/tutorcourses',
    component:TutorCourses
  },
  // Admin routes
  {
    path:'/admincourses',
    component:CoursesAdmin
  },
  {
    path:'/admingroupsetting',
    component:CourseGroup
  },
  {
    path: '/*',
    component: Page404,
  },
  
]

export default routes