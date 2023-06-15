import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import { toast } from "react-toastify";
import {
  settingDoesnotExist,
  settingStudentNotExist,
  settingUpdated,
} from "../../../Utils/MatchTypes";
const Settings = () => {
  const [setting, setSetting] = useState({});
  const { user, role } = useSelector((state) => state.auth);
  const loginrepo = RepositoryFactory.get("login");
  const getSettings = async () => {
    let { data } = await loginrepo.getStudentSettings(user.email);
    if (typeof data === "object") {
      console.log("settings are", data);
      setSetting(data);
    } else {
      console.log("settings error is", data);
    }
  };
  const onClick = async () => {
    let { data } = await loginrepo.saveSettings(setting);
    if (data.match(settingUpdated)) {
      toast.success(data, {
        theme: "colored",
      });
    } else if (data.match(settingDoesnotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else if (data.match(settingStudentNotExist)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log("saving setting error", data);
    }
  };
  useEffect(() => {
    getSettings();
  }, []);
  useEffect(() => {
    console.info(setting);
  }, [setting]);
  return (
    <div className="overflow-hidden flex flex-col h-full p-2 md:p-4 mt-4 md:mt-2  w-full sm:w-[90%] md:w-[80%] mx-auto ">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-accent">
          Please Select the Settings
        </h1>
        <div className="mt-4  flex flex-col gap-4 max-w-lg bg-primary py-4 px-4 rounded-md shadow-md">
          <div className="form-control bg-gray-400  rounded-md shadow-md  w-60">
            <label
              className="cursor-pointer label px-3  flexg items-center justify-between py-2"
              htmlFor="showAbsents"
            >
              <span className="label-text text-primary">Show Absents</span>
              <input
                id="showAbsents"
                value={+setting.showAbsents}
                onChange={(e) =>
                  setSetting({
                    ...setting,
                    showAbsents: +setting.showAbsents === 1 ? 0 : 1,
                  })
                }
                checked={setting.showAbsents === 1}
                type="checkbox"
                className={`w-4 h-4 cursor-pointer text-red-400  border-0 rounded focus:ring-0 `}
              />
              {console.info(setting.showAbsents === 1 && "checked")}
            </label>
          </div>
          <div className="form-control bg-gray-400  rounded-md shadow-md  w-60">
            <label
              className="cursor-pointer label px-3  flexg items-center justify-between py-2"
              htmlFor="showClassReport"
            >
              <span className="label-text text-primary">Show Class Report</span>
              <input
                id="showClassReport"
                value={+setting.showClassReport}
                onChange={(e) =>
                  setSetting({
                    ...setting,
                    showClassReport: +setting.showClassReport === 1 ? 0 : 1,
                  })
                }
                checked={setting.showClassReport === 1}
                type="checkbox"
                className={`w-4 h-4 cursor-pointer text-red-400  border-0 rounded focus:ring-0 `}
              />
            </label>
          </div>
          <div className="form-control bg-gray-400  rounded-md shadow-md  w-60">
            <label
              className="cursor-pointer label px-3  flexg items-center justify-between py-2"
              htmlFor="showRescheduleStudent"
            >
              <span className="label-text text-primary">
                Show Reschedule by Student
              </span>
              <input
                id="showRescheduleStudent"
                value={+setting.showRescheduleStudent}
                onChange={(e) =>
                  setSetting({
                    ...setting,
                    showRescheduleStudent:
                      +setting.showRescheduleStudent === 1 ? 0 : 1,
                  })
                }
                checked={setting.showRescheduleStudent === 1}
                type="checkbox"
                className={`w-4 h-4 cursor-pointer text-red-400  border-0 rounded focus:ring-0 `}
              />
            </label>
          </div>
          <div className="form-control bg-gray-400 rounded-md shadow-md  w-60">
            <label
              className="cursor-pointer label px-3  flexg items-center justify-between py-2"
              htmlFor="showRescheduleTutor"
            >
              <span className="label-text text-primary">
                Show Reschedule by Tutor
              </span>
              <input
                id="showRescheduleTutor"
                value={+setting.showRescheduleTutor}
                onChange={(e) =>
                  setSetting({
                    ...setting,
                    showRescheduleTutor:
                      +setting.showRescheduleTutor === 1 ? 0 : 1,
                  })
                }
                checked={setting.showRescheduleTutor === 1}
                type="checkbox"
                className={`w-4 h-4 cursor-pointer text-red-400  border-0 rounded focus:ring-0 `}
              />
            </label>
          </div>
          <button
            className="px-3 py-1.5 text-white bg-accent shadow-lg rounded-md flex-1 font-thin max-w-md hover:bg-indigo-600 hover:text-primary"
            onClick={onClick}
          >
            Change Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
