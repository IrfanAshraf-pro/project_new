import { useStepperContext } from "../contexts/StepperContext";

export default function AcademicDetails() {
  const { formik } = useStepperContext();
  return (
    <div className="flex flex-col gap-3">
      <div className="form-control w-full max-w-xs mx-auto">
      <span className="label-text text-start mb-1">Enter your Semester</span>
        <input
          type="number"
          name="semester"
          placeholder="Enter your Semester"
          className="input w-full max-w-xs input-accent text-gray-600"
          value={formik.values.semester}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="label">
          <span className="label-text text-error">
            {formik.touched.semester && formik.errors.semester
              ? formik.errors.semester
              : ""}
          </span>
        </label>
      </div>
      <div className="form-control w-full max-w-xs mx-auto">
      <span className="label-text text-start mb-1">Enter your CGPA</span>

        <input
          type="number"
          name="cgpa"
          placeholder="Enter your cgpa"
          className="input w-full max-w-xs input-accent text-gray-600"
          value={formik.values.cgpa}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="label">
          <span className="label-text text-error">
            {formik.touched.cgpa && formik.errors.cgpa
              ? formik.errors.cgpa
              : ""}
          </span>
        </label>
      </div>
      <button
        className="btn btn-wide mx-auto btn-accent text-primary text-lg"
        type="submit"
        onClick={formik.handleSubmit}
      >
        SignUp
      </button>
    </div>
  );
}
