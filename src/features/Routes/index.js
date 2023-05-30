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
import ParentsFee from '../Pages/Protected/Parents/ParentsFee'
import Teaching from '../Pages/Protected/Tutor/Teaching'
import StudentFee from '../Pages/Protected/Student/StudentFee'
import Scheduling from '../Pages/Protected/Tutor/Scheduling'
import FeeGroups from '../Pages/Protected/Admin/FeeGroups'
import ScheduleOptions from '../Pages/Protected/Tutor/ScheduleOptions'
import MultipleScheduling from '../Pages/Protected/Tutor/MultipleScheduling'
import TutorFee from '../Pages/Protected/Tutor/TutorFee'
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
  {
    path:'/studentfee',
    component:StudentFee
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
  {
    path:'/teaching',
    component:Teaching
  },
  {
    path:'/tutorschedulingoptions',
    component:ScheduleOptions
  },
  {
    path:'/tutorschedulingoptions/tutormultirescheduling',
    component:MultipleScheduling
  },
  {
    path:'/tutorschedulingoptions/tutorscheduling',
    component:Scheduling
  },
  {
    path:'/tutorfee',
    component:TutorFee
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
    path:'/adminFeeGroups',
    component:FeeGroups
  },
  // Parents Routes
  {
    path:'/parentsfee',
    component:ParentsFee
  },
  {
    path: '/*',
    component: Page404,
  }
]

export default routes