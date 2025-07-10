import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { HiOutlineCurrencyRupee } from "react-icons/hi"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addDiseaseDetails,
  fetchDiseaseCategories,
  editDiseaseDetails
} from "../../../../../services/operations/diseaseDetailsAPI"
import { setDisease, setStep } from "../../../../../slices/diseaseSlice"
import { DISEASE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import Upload from "../Upload"
import ChipInput from "./ChipInput"
import RequirementsField from "./RequirementField"

export default function DiseaseInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { disease, editDisease } = useSelector((state) => state.disease)
  const [loading, setLoading] = useState(false)
  const [diseaseCategories, setDiseaseCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await fetchDiseaseCategories()
      if (categories.length > 0) {
        // console.log("categories", categories)
        setDiseaseCategories(categories)
      }
      setLoading(false)
    }
    // if form is in edit mode
    if (editDisease) {
      // console.log("data populated", editCourse)
      setValue("diseaseName", disease.name)
      setValue("description", disease.description)
      setValue("totalSeverityGrades", disease.totalSeverityGrades)
      setValue("subVariants", disease.subVariants)
      setValue("category", disease.category)
      setValue("commonSymptoms", disease.commonSymptoms)
      setValue("Image", disease.thumbnail)
    }
    getCategories()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const currentValues = getValues()
    // console.log("changes after editing form values:", currentValues)
    if (
      currentValues.diseaseName !== disease.name ||
      currentValues.description !== disease.description ||
      currentValues.totalSeverityGrades !== disease.totalSeverityGrades ||
      currentValues.subVariants.toString() !== disease.subVariants.toString() ||
      currentValues.category._id !== disease.category._id ||
      currentValues.commonSymptoms.toString() !==
        disease.commonSymptoms.toString() ||
      currentValues.Image !== disease.thumbnail
    ) {
      return true
    }
    return false
  }

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log(data)

    if (editDisease) {
      // const currentValues = getValues()
      // console.log("changes after editing form values:", currentValues)
      // console.log("now course:", course)
      // console.log("Has Form Changed:", isFormUpdated())
      if (isFormUpdated()) {
        const currentValues = getValues()
        const formData = new FormData()
        // console.log(data)
        formData.append("diseaseId", disease._id)
        if (currentValues.diseaseName !== disease.name) {
          formData.append("diseaseName", data.diseaseName)
        }
        if (currentValues.description !== disease.description) {
          formData.append("description", data.description)
        }
        if (currentValues.totalSeverityGrades !== disease.totalSeverityGrades) {
          formData.append("totalSeverityGrades", data.totalSeverityGrades)
        }
        if (currentValues.subVariants.toString() !== disease.subVariants.toString()) {
          formData.append("subVariants", JSON.stringify(data.subVariants))
        }
        if (currentValues.category._id !== disease.category._id) {
          formData.append("category", data.category)
        }
        //if (currentValues.genderSpecific !== disease.genderSpecific) {
        //  formData.append("genderSpecific", data.genderSpecific)
        //}
        if (
          currentValues.commonSymptoms.toString() !==
          disease.commonSymptoms.toString()
        ) {
          formData.append(
            "commonSymptoms",
            JSON.stringify(data.commonSymptoms)
          )
        }
        if (currentValues.Image !== disease.thumbnail) {
          formData.append("thumbnailImage", data.Image)
        }
        // console.log("Edit Form data: ", formData)
        setLoading(true)
        const result = await editDiseaseDetails(formData, token)
        setLoading(false)
        if (result) {
          dispatch(setStep(2))
          dispatch(setDisease(result))
        }
      } else {
        toast.error("No changes made to the form")
      }
      return
    }

    const formData = new FormData()
    formData.append("name", data.diseaseName)
    formData.append("description", data.description)
    formData.append("totalSeverityGrades", data.totalSeverityGrades)
    formData.append("subVariants", JSON.stringify(data.subVariants))
    formData.append("category", data.category)
    formData.append("status", DISEASE_STATUS.DRAFT)
    formData.append("commonSymptoms", JSON.stringify(data.commonSymptoms))
    formData.append("thumbnailImage", data.Image)
    setLoading(true)
    const result = await addDiseaseDetails(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setDisease(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Disease Name*/}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="diseaseName">
          Disease Name <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="diseaseName"
          placeholder="Enter Disease Name"
          {...register("diseaseName", { required: true })}
          className="form-style w-full"
        />
        {errors.diseaseName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Disease Name is required
          </span>
        )}
      </div>
      {/* Disease Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="description">
          Disease Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="description"
          placeholder="Enter Description"
          {...register("description", { required: true })}
          className="form-style resize-x-none min-h-[130px] w-full"
        />
        {errors.description && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Disease Description is required
          </span>
        )}
      </div>
      {/* Course Price */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="totalSeverityGrades">
          Disease Total Severity Grades <sup className="text-pink-200">*</sup>
        </label>
        <div className="relative">
          <input
            id="totalSeverityGrades"
            placeholder="Enter Total severity Grades"
            {...register("totalSeverityGrades", {
              required: true,
              valueAsNumber: true,
              pattern: {
                value: /^(0|[1-9]\d*)(\.\d+)?$/,
              },
            })}
            className="form-style w-full !pl-12"
          />
          <HiOutlineCurrencyRupee className="absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400" />
        </div>
        {errors.totalSeverityGrades && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Disease Total Severity Grades is required
          </span>
        )}
      </div>
      {/*Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="category">
          Disease Category <sup className="text-pink-200">*</sup>
        </label>
        <select
          {...register("category", { required: true })}
          defaultValue=""
          id="category"
          className="form-style w-full"
        >
          <option value="" disabled>
            Choose a Category
          </option>
          {!loading &&
            diseaseCategories?.map((category, indx) => (
              <option key={indx} value={category?._id}>
                {category?.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Disease Category is required
          </span>
        )}
      </div>
      {/* Subvariants */}
      <ChipInput
        label="Subvariants"
        name="subVariants"
        placeholder="Enter subVariant and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="Image"
        label="Disease Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editDisease ? disease?.thumbnail : null}
      />
      {/* Common Symptoms */}
      <RequirementsField
        name="commonSymptoms"
        label="Common Symptoms of Disease"
        register={register}
        setValue={setValue}
        errors={errors}
        getValues={getValues}
      />
      {/* Next Button */}
      <div className="flex justify-end gap-x-2">
        {editDisease && (
          <button
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
          >
            Continue Wihout Saving
          </button>
        )}
        <IconBtn
          disabled={loading}
          text={!editDisease ? "Next" : "Save Changes"}
        >
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}