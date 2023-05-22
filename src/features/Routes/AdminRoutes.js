import {BsFillPersonFill} from 'react-icons/bs'
import {BiBookAlt} from 'react-icons/bi'
import {AiFillSetting} from 'react-icons/ai'
import {GiMoneyStack } from 'react-icons/gi'
const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const adminroutes = [
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
        path:'/app/admincourses',
        icon:<BiBookAlt className={iconClasses}/>,
        name:'Courses'
    },
    {
        path:'/app/admingroupsetting',
        icon:<AiFillSetting className={iconClasses}/>,
        name:'Course Groups'
    },
    {
        path:'/app/adminFeeGroups',
        icon:<GiMoneyStack className={iconClasses}/>,
        name:'Fee Structure'
    },
    
]

export default adminroutes