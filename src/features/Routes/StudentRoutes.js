import {BsFillPersonFill} from 'react-icons/bs'
import {AiFillSchedule} from 'react-icons/ai'
import {BiBookAlt} from 'react-icons/bi'
import {SiGoogleclassroom} from 'react-icons/si'
import {GiTeacher,GiMoneyStack} from 'react-icons/gi'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const routes = [
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
      path:'/app/studentcourses',
      icon:<BiBookAlt className={iconClasses}/>,
      name:'Courses',
    },
    {
      path:'/app/studentClasses',
      icon:<SiGoogleclassroom className={iconClasses}/>,
      name:'Today Classes'
    },
    {
      path:'/app/studentLearning',
      icon:<GiTeacher className={iconClasses}/>,
      name:'Learning'
    },
    {
      path:'/app/studentfee',
      icon:<GiMoneyStack className={iconClasses}/>,
      name:'Fee'
    }
]

export default routes