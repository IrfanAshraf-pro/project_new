import { useStepperContext } from "../contexts/StepperContext";

export default function ContactDetails() {
  const { formik, account } = useStepperContext();

  return (
    <div className="flex flex-col gap-3">
      <div className="form-control w-full max-w-xs mx-auto">
      <span className="label-text text-start mb-1">Enter your Contact No</span>
        <input
          type="number"
          name="contact"
          placeholder="Enter your Contact"
          className="input w-full max-w-xs input-accent text-gray-600"
          value={formik.values.contact}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <label className="label">
          <span className="label-text text-error">
            {formik.touched.contact && formik.errors.contact
              ? formik.errors.contact
              : ""}
          </span>
        </label>
      </div>
      {account === "student" && (
        <div className="form-control w-full max-w-xs mx-auto">
          <input
            type="number"
            name="fathercnic"
            placeholder="Enter your Fathercnic"
            className="input w-full max-w-xs input-accent text-gray-600"
            value={formik.values.fathercnic}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <label className="label">
            <span className="label-text text-error">
              {formik.touched.fathercnic && formik.errors.fathercnic
                ? formik.errors.fathercnic
                : ""}
            </span>
          </label>
        </div>
      )}
    </div>
  );
}
