import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../Routes";
import { Suspense, lazy } from "react";
import SuspenseContent from "./SuspenseContent";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import {toast} from 'react-toastify'
// schedule imports
import { RepositoryFactory } from "../Repository/RepositoryFactory";
import {setSchedule} from '../../app/Slices/ScheduleSlice'
import { ScheduleNotSet } from "../Utils/MatchTypes";

const Page404 = lazy(() => import("../Pages/Protected/404"));

function PageContent() {
  const mainContentRef = useRef(null);
  const { pageTitle } = useSelector((state) => state.header);
  const {role,user}=useSelector(state=>state.auth)

  const dispatch=useDispatch()
  const schedule=RepositoryFactory.get("schedule");

  //   getting schedule of logged in user
    const getUserSchedule=async()=>{
        if(role==="Student"){
            const {data}=await schedule.getStudentSchedule(user.email)
            console.log(data);
            dispatchingSchedule(data)
            // alert(data)
        }else{
            const {data}=await schedule.getTutorSchedule(user.email)
            console.log(data);
            dispatchingSchedule(data)
            // alert(data)
        }
    }
    const dispatchingSchedule=(data)=>{
        if(data.length>100){
            dispatch(setSchedule({ schedule: data }))
        }else if(data.match(ScheduleNotSet)){
            toast.warning(data,{
                theme:'colored'
            })
        }
    }

    useEffect(()=>{
    getUserSchedule()
    },[])
  // Scroll back to top on new page load
  useEffect(() => {
    mainContentRef.current.scroll({
      top: 0,
      behavior: "smooth",
    });
  }, [pageTitle]);

  return (
    <div className="drawer-content flex flex-col ">
      <Header />
      <main
        className="flex-1 overflow-y-hidden    bg-base-200"
        ref={mainContentRef}
      >
        <Suspense fallback={<SuspenseContent />}>
          <Routes>
            {routes.map((route, key) => {
              return (
                <Route
                  key={key}
                  exact={true}
                  path={`${route.path}`}
                  element={<route.component />}
                />
              );
            })}

            {/* Redirecting unknown url to 404 page */}
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Suspense>
        <div className="h-16"></div>
      </main>
    </div>
  );
}

export default PageContent;
