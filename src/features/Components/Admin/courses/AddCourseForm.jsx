import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RepositoryFactory } from "../../../Repository/RepositoryFactory";
import {
  CourseAlreadyExists,
  CourseInsertedSuccessfully,
} from "../../../Utils/MatchTypes";

const AddCourseForm = ({setIsAdded,setIsLoading}) => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      coursecode: "",
      coursefee: "",
      coursename: "",
    },
    validationSchema: Yup.object({
      coursecode: Yup.string()
        .max(6, "Course code must be atleast 6 characters")
        .required("coursecode is Required"),
      coursename: Yup.string()
        .min(3, "Course code must be atleast 3 characters")
        .required("coursename is Required"),
      coursefee: Yup.string()
        .min(3, "coursefee must be atleast 4 characters")
        .required("coursefee is Required"),
    }),
    onSubmit: (values) => {
      submitHandler(values);
    },
  });
const courserepo = RepositoryFactory.get("course");
  
  const submitHandler = async (values) => {
    const { coursecode, coursefee, coursename } = values;
    const course = {
      coursecode,
      coursefee,
      coursename,
    };
    let { data } = await courserepo.addNewCourse(course);
    if (data.match(CourseInsertedSuccessfully)) {
      toast.success(data, {
        theme: "colored",
      });
      formik.values = {
        coursecode: "",
        coursefee: "",
        coursename: "",
      };
    setIsAdded(false)
    setIsLoading(true)
    } else if (data.match(CourseAlreadyExists)) {
      toast.info(data, {
        theme: "colored",
      });
    } else {
      console.log(data);
    }
  };
  useEffect(() => {
    return () => {
      formik.values = {
        coursecode: "",
        coursefee: "",
        coursename: "",
      };
    };
  }, []);

  return (
    <div>
      <form className="my-6" onSubmit={formik.handleSubmit}>
        <div className="form-control w-full max-w-xs mx-auto">
          <input
            type="text"
            name="coursecode"
            placeholder="Enter your coursecode"
            className="input w-full max-w-xs input-accent text-gray-600"
            value={formik.values.coursecode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="label">
            <span className="label-text text-error">
              {formik.touched.coursecode && formik.errors.coursecode
                ? formik.errors.coursecode
                : ""}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs mx-auto my-2">
          <input
            type="number"
            name="coursefee"
            placeholder="Enter your coursefee"
            className="input w-full max-w-xs input-accent text-gray-600"
            value={formik.values.coursefee}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="label">
            <span className="label-text text-error">
              {formik.touched.coursefee && formik.errors.coursefee
                ? formik.errors.coursefee
                : ""}
            </span>
          </label>
        </div>
        <div className="form-control w-full max-w-xs mx-auto my-2">
          <input
            type="text"
            name="coursename"
            placeholder="Enter your coursename"
            className="input w-full max-w-xs input-accent text-gray-600"
            value={formik.values.coursename}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="label">
            <span className="label-text text-error">
              {formik.touched.coursename && formik.errors.coursename
                ? formik.errors.coursename
                : ""}
            </span>
          </label>
        </div>
        <button
          className="btn btn-wide btn-accent text-primary text-lg"
          type="submit"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCourseForm;
