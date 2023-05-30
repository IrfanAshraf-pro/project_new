import {BsFillPersonFill} from 'react-icons/bs'
import {AiFillSchedule} from 'react-icons/ai'
import {BiBookAlt} from 'react-icons/bi'
import {SiGoogleclassroom} from 'react-icons/si'
import {GiTeacher,GiMoneyStack} from 'react-icons/gi'

import {GrSchedules} from 'react-icons/gr'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const tutorRoutes = [
    // {
    //   path: '/app/dashboard',
    //   icon: <Squares2X2Icon className={iconClasses}/>, 
    //   name: 'Dashboard',
    // },
    {
        path:'/app/profile',
        icon:<BsFillPersonFill className={iconClasses}/>,
        name:'Profile'
    },
    {
      path:'/app/schedule',
      icon:<AiFillSchedule className={iconClasses}/>,
      name:'Schedule',
    },
    {
      path:'/app/tutorcourses',
      icon:<BiBookAlt className={iconClasses}/>,
      name:'Courses',
    },
    {
      path:'/app/tutorClasses',
      icon:<SiGoogleclassroom className={iconClasses}/>,
      name:'Today Classes'
    },
    {
      path:'/app/teaching',
      icon:<GiTeacher className={iconClasses}/>,
      name:'Teaching'
    },
    {
      path:'/app/tutorschedulingoptions',
      icon:<GrSchedules className={iconClasses}/>,
      name:'Rescheduling'
    },
    {
      path:'/app/tutorfee',
      icon:<GiMoneyStack className={iconClasses}/>,
      name:'Fee'
    },
]

// {
//   path:'/tutorschedulingoptions',
//   component:ScheduleOptions
// },
// {
//   path:'/tutormultirescheduling',
//   component:MultipleScheduling
// },
export default tutorRoutes