// All components mapping with path for internal routes

import { lazy } from 'react'
import Dashboard from '../Pages/Protected/Dashboard'
import Welcome from '../Pages/Protected/Welcome'
import Profile from '../Pages/Protected/Profile'
import Page404 from '../Pages/Protected/404'




const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/welcome', // the url
    component: Welcome, // view rendered
  },
  {
    path:'/profile', //the url
    component:Profile , //view rendered
  },
  {
    path: '/404',
    component: Page404,
  },
]

export default routes