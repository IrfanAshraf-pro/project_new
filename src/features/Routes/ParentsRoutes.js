import {GiMoneyStack} from 'react-icons/gi'
import { GiTeacher } from "react-icons/gi";


const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const parentRoutes = [
    {
        path:'/app/parentsfee',
        icon:<GiMoneyStack className={iconClasses}/>,
        name:'Fee'
    },
    {
        path:'/app/parentstutors',
        icon:<GiTeacher className={iconClasses}/>,
        name:'Tutors'
    }
]
    

export default parentRoutes