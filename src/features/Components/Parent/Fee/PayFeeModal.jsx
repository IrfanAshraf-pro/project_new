import React, { useState } from "react";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { FeePaid, NoCourseFound, noFeeTobePaid } from "../../../Utils/MatchTypes";

const PayFeeModal = ({
  showPayFeeModal,
  setPayFeeModal,
  selected,
  details,
  isFeePaid,
  setIsFeepaid,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  let feerepo = RepositoryFactory.get("fee");
  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setError("");
  };
  const payFee = async () => {
    if (/^[1-9]\d*00$/.test(inputValue) || inputValue === "") {
      if(inputValue<=selected.remainingamount){
        let { data } = await feerepo.payFee(
          selected.studentemail,
          selected.tutoremail,
          selected.courseid,
          inputValue
        );
        if (data.match(FeePaid)) {
          toast.success("Fee Paid");
          setPayFeeModal(false);
          setIsFeepaid(true)
          setInputValue(0)
        } else if (data.match(noFeeTobePaid)) {
          toast.info(data);
        } else if (data.match(NoCourseFound)) {
          toast.info(data);
        } else {
          console.log("Error while paying fee", data);
        }
      }else{
        toast.info('Please enter amount less than the remaing fee to be paid.')
      }
     
    } else {
      setError("Please enter multiple of 100");
    }
  };
  console.log(selected);
  return (
    <div>
      <input
        checked={showPayFeeModal | false}
        onChange={setPayFeeModal}
        type="checkbox"
        id="payFeeModal"
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between p-2">
            <h3 className="text-lg font-bold">Pay Fee to {selected.name}. Remaining fee is {selected.remainingamount}</h3>
            <p
              className="text-lg font-bold cursor-pointer hover:text-accent"
              onClick={() => setPayFeeModal(false)}
            >
              X
            </p>
          </div>
          {
            selected?.name ?(
              <>
              <div className="form-control w-full max-w-xs mx-auto my-2">
            <input
              type="number"
              name="fee"
              placeholder="Enter fee to pay"
              className="input w-full max-w-xs input-accent text-gray-600"
              value={inputValue}
              onChange={handleChange}
            />
            <label className="label">
              <span className="label-text text-error">{error}</span>
            </label>
          </div>
         <div className="flex items-center justify-center">
         <label
            className="px-8 py-1.5 text-white bg-accent duration-150 shadow-lg rounded-md  font-thin  mt-2 hover:bg-indigo-600 hover:text-primary text-center"
            onClick={payFee}
            htmlFor="childDetails"
          >
            Pay
          </label>
         </div>
              </>
            )
            :(
              <p className="px-3">Please select tutor to pay fee to</p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default PayFeeModal;
