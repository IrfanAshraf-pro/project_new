import React, {useState, useEffect } from 'react';
import routes from '../Routes/StudentRoutes'
import tutorRoutes from '../Routes/TutorRoutes';
import { NavLink,  Routes, Link , useLocation} from 'react-router-dom'
import SidebarSubmenu from './SidebarSubmenu';
import {useSelector} from 'react-redux'
import adminroutes from '../Routes/AdminRoutes';

function LeftSidebar(){
    const {role}=useSelector(state=>state.auth)
    const location = useLocation();
    const [Routes,setRoutes]=useState(routes)
    useEffect(()=>{
        if(role==="Student"){
            setRoutes(routes)
        }else if(role==="Tutor"){
            setRoutes(tutorRoutes)
        }else if(role==="Admin"){
            setRoutes(adminroutes)
        }
    },[])
    return(
        <div className="drawer-side ">
            <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label> 
            <ul className="menu  pt-2 w-80 bg-base-100 text-base-content">
                <li className="mb-2 font-semibold text-xl">
                    
                    <Link to={'/app/welcome'}><img className="mask mask-squircle w-10" src="/logo192.png" alt="DashWind Logo"/>House of Tutor</Link> </li>
                {
                    Routes.map((route, k) => {
                        return(
                            <li className="" key={k}>
                                {
                                    route.submenu ? 
                                        <SidebarSubmenu {...route}/> : 
                                    (<NavLink
                                        end
                                        to={route.path}
                                        className={({isActive}) => `${isActive ? 'font-semibold  bg-base-200 ' : 'font-normal'}`} >
                                           {route.icon} {route.name}
                                            {
                                                location.pathname === route.path ? (<span className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
                                                aria-hidden="true"></span>) : null
                                            }
                                    </NavLink>)
                                }
                                
                            </li>
                        )
                    })
                }

            </ul>
        </div>
    )
}

export default LeftSidebar