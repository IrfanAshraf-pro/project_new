import React,{useState,useEffect} from 'react'
import { toast } from 'react-toastify';

const FeeGroupModal = ({feeGroupShow,setFeeGroupShow,selectedGroup,setNewFeeForGroup}) => {
  const [value, setValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value<200) {
      toast.warn("Please enter Fee atleast 200", {
        theme: "colored",
      });
    } else {
      setNewFeeForGroup({
        ...selectedGroup,fee:value
      });
    }
  };
  useEffect(() => {
    return () => {
      setValue("");
    };
  }, []);
  return (
    <div>
      <input
        type="checkbox"
        id="feegroupmodal"
        className="modal-toggle"
        checked={feeGroupShow | false}
        onChange={setFeeGroupShow}
      />
      <label
        className="modal modal-bottom sm:modal-middle"
        htmlFor="feegroupmodal"
      >
        <label htmlFor="" className="modal-box ">
          <h3 className="font-bold text-lg text-center mb-6">
            Enter New Fee for {selectedGroup.groupName}
          </h3>
          <form
            className=" flex gap-1 flex-col w-full justify-between"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Fee"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="input mb-2 w-full max-w-xs mx-auto input-accent text-gray-600"
            />
            <button className="btn max-w-xs w-full mx-auto mb-4  md:btn-md  btn-accent hover:btn-primary">
              Submit
            </button>
          </form>
        </label>
      </label>
    </div>
  )
}

export default FeeGroupModal