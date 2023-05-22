import React, { useState, useEffect } from "react";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import Loader from "../../../Components/Custom/LoaderDashboard";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../../../app/Slices/Dashboard/HeaderSlice";
import {FaRegEdit} from 'react-icons/fa'
import FeeGroupModal from "../../../Components/Admin/FeeGroupModal";
import { FeeGroupAdded, FeeGroupUpdated } from "../../../Utils/MatchTypes";
import { toast } from "react-toastify";
const FeeGroups = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [feeGroups, setFeeGroups] = useState([]);
  const [feeGroupShow, setFeeGroupShow] = useState(false)
  const [selectedGroup,setSelectedGroup]=useState({})
  const dispatch = useDispatch();
  const feerepo = RepositoryFactory.get("fee");
  const getAllFeeGroups = async () => {
    let { data } = await feerepo.GetFeeGroups();
    console.log('getting all admin fee groups',data);
    setFeeGroups(data);
    setIsLoading(false);
  };
  const settingFeeGroup=(item)=>{
    setFeeGroupShow(true)
    setSelectedGroup(item)
  }
  const setNewFeeForGroup=async(item)=>{
    let {data}=await feerepo.SaveGroupFee(item)
    if(data.match(FeeGroupUpdated)){
      toast.success(data,{
        theme:'colored'
      })
      setFeeGroupShow(false)
      getAllFeeGroups()
    }else if(data.match(FeeGroupAdded)){
      toast.success(data,{
        theme:'colored'
        })
      setFeeGroupShow(false)

    }else{
      console.log('Fee Group ',data);
    }
  }
  useEffect(() => {
    setIsLoading(true);
    getAllFeeGroups();
    return () => {
      setFeeGroups([]);
      setIsLoading(false);
    };
  }, []);
  useEffect(() => {
    dispatch(setPageTitle({ title: "Fee Structure" }));
    isLoading && getAllFeeGroups();
  }, [isLoading]);
  return (
    <div>
      <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
        {isLoading && <Loader />}
        {feeGroups.length > 0 ? (
          <div className="flex flex-col h-2/3 md:h-68  overflow-y-scroll gap-3 p-3 px-4 rounded-md mt-8 shadow-xl shadow-primary bg-neutral">
            {feeGroups.map((group) => (
              <div
                key={group.groupId}
                className="flex justify-between p-2 rounded shadow mb-2 bg-primary text-accent hover:bg-accent hover:text-white items-center group"
                onClick={()=>settingFeeGroup(group)}
              >
                <p className="flex-1">{group.groupName}</p>
                <p className="mr-4 ">{group.fee}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>Please add Fee Structue</p>
        )}
      </div>
      <FeeGroupModal feeGroupShow={feeGroupShow} setFeeGroupShow={setFeeGroupShow} selectedGroup={selectedGroup} setNewFeeForGroup={setNewFeeForGroup}/>
    </div>
  );
};

export default FeeGroups;
