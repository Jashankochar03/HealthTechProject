import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editDiseaseDetails } from "../../../../../services/operations/diseaseDetailsAPI"
import { resetDiseaseState, setStep } from "../../../../../slices/diseaseSlice"
import { DISEASE_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"

export default function PublishCourse() {
  const { register, handleSubmit, setValue, getValues } = useForm()

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { disease } = useSelector((state) => state.disease)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (disease?.status === DISEASE_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToDiseases = () => {
    dispatch(resetDiseaseState())
    navigate("/dashboard/my-addedDisease")
  }

  const handleDiseasePublish = async () => {
    // check if form has been updated or not
    if (
      (disease?.status === DISEASE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (disease?.status === DISEASE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToDiseases()
      return
    }
    const formData = new FormData()
    formData.append("diseaseId", disease._id)
    const diseaseStatus = getValues("public")
      ? DISEASE_STATUS.PUBLISHED
      : DISEASE_STATUS.DRAFT
    formData.append("status", diseaseStatus)
    setLoading(true)
    const result = await editDiseaseDetails(formData, token)
    if (result) {
      goToDiseases()
    }
    setLoading(false)
  }

  const onSubmit = (data) => {
    // console.log(data)
    handleDiseasePublish()
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this added disease visible to public
            </span>
          </label>
        </div>

        {/* Next Prev Button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes" />
        </div>
      </form>
    </div>
  )
}