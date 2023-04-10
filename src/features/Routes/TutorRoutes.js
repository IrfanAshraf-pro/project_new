import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import ShieldCheckIcon from '@heroicons/react/24/outline/ShieldCheckIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`
const tutorRoutes = [
    {
      path: '/app/dashboard',
      icon: <Squares2X2Icon className={iconClasses}/>, 
      name: 'Dashboard',
    },
    {
        path:'/app/profile',
        icon:<BoltIcon className={iconClasses}/>,
        name:'Profile'
    },
    {
      path:'/app/schedule',
      icon:<DocumentDuplicateIcon className={iconClasses}/>,
      name:'Schedule',
    },
    {
      path:'/app/tutorcourses',
      icon:<Cog6ToothIcon className={iconClasses}/>,
      name:'Courses',
    },
    {
      path:'/app/tutorClasses',
      icon:<WalletIcon className={iconClasses}/>,
      name:'Today Classes'
    }
]

export default tutorRoutes