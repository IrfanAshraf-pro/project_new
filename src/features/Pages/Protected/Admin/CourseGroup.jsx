import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import AddCourseToGroup from "../../../Components/Admin/CourseGroup/AddCourseToGroup";
import CourseGroupModal from "../../../Components/Admin/CourseGroup/CourseGroup";
import ShowCourseGroup from "../../../Components/Admin/CourseGroup/ShowCourseGroup";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  CourseGroupAdded,
  CourseGroupUpdatedSuccessfully,
} from "../../../Utils/MatchTypes";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
const CourseGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState({});
  const [groups, setGroups] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [groupNameShow, setGroupNameShow] = useState(false);

  const dispatch=useDispatch()
  
  const courserepo = RepositoryFactory.get("course");
  // getting all groups
  const getAllGroups = async () => {
    const { data } = await courserepo.adminAllCourseGroups();
    console.log("course groups are", data);
    setGroups(data);
    setSelectedGroup({});
    setIsShown(false);
  };
  useEffect(() => {
    dispatch(setPageTitle({ title: "Course Groups" }));
    
    getAllGroups();
    return () => {};
  }, []);

  const onClick = (group) => {
    setSelectedGroup(group);
    setIsShown(true);
  };
  const handleCourseDelete = (groupUpd) => {
    console.log("groupUpd is", groupUpd);
    let newGroups = groups.map((group) => {
      return group.groupName !== groupUpd.groupName ? group : groupUpd;
    });
    setGroups(newGroups);
    setSelectedGroup(groupUpd);
    saveCourseGroup(newGroups);
  };
  const saveCourseGroup = async (group) => {
    let { data } = await courserepo.SavingCourseGroup(group);
    if (data.match(CourseGroupUpdatedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      getAllGroups();
    } else if (data.match(CourseGroupAdded)) {
      toast.success(data, {
        theme: "colored",
      });
      getAllGroups();
    } else {
      console.log(data);
    }
  };
  const addCourseToGroup = async (group) => {
    let { data } = await courserepo.SavingSingleCourseGroup(group);
    if (data.match(CourseGroupUpdatedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      getAllGroups();
    } else if (data.match(CourseGroupAdded)) {
      toast.success(data, {
        theme: "colored",
      });
      getAllGroups();
    } else {
      console.log(data);
    }
  };
  // 
  const handleCourseModalShow=()=>{
    setGroupNameShow(true)
    console.log('clicked',groupNameShow);
  }
  // adding a group
  const AddGroup = async(groupname) => {
    console.log("groupname to be added is ", groupname);
    const course={
      groupName:groupname,
      subjectGroup:[]
    }
    setGroupNameShow(false)
    addCourseToGroup(course)
  };
  return (
    <>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        <div className="items-end text-end">
          <div
            className="btn btn-circle btn-accent"
            onClick={()=>handleCourseModalShow()}
          >
            +
          </div>
          <CourseGroupModal
            AddGroup={AddGroup}
            groupNameShow={groupNameShow}
            setGroupNameShow={setGroupNameShow}
          />
        </div>
        {groups ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {groups.map((group) => (
              <div key={group.groupName}>
                <div
                  // htmlFor="showcoursegroupmodal"
                  className="group"
                  onClick={() => onClick(group)}
                >
                  <div className="flex justify-between items-center  bg-base-100 px-4 py-1 rounded-md group-hover:bg-accent">
                    <span className="text-secondary group-hover:text-primary">
                      {group.groupName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>Please Add a course group</p>
        )}
      </div>
      <ShowCourseGroup
        selectedGroup={selectedGroup}
        handleCourseDelete={handleCourseDelete}
        isShown={isShown}
        setIsShown={setIsShown}
      />
      <AddCourseToGroup
        selectedGroup={selectedGroup}
        addCourseToGroup={addCourseToGroup}
      />
    </>
  );
};

export default CourseGroup;
