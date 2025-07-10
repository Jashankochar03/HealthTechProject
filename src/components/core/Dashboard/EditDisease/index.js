import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"

import {
  fetchDiseaseDetails
} from "../../../../services/operations/diseaseDetailsAPI"
import { setDisease, setEditDisease } from "../../../../slices/diseaseSlice"
import RenderSteps from "../AddDisease/RenderSteps"

export default function EditDisease() {
  const dispatch = useDispatch()
  const { diseaseId } = useParams()
  const { disease } = useSelector((state) => state.disease)
  const [loading, setLoading] = useState(false)
  const { token } = useSelector((state) => state.auth)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const result = await fetchDiseaseDetails(diseaseId, token)
      if (result?.diseaseDetails) {
        dispatch(setEditDisease(true))
        dispatch(setDisease(result?.courseDetails))
      }
      setLoading(false)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="grid flex-1 place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Disease
      </h1>
      <div className="mx-auto max-w-[600px]">
        {disease ? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Disease not found
          </p>
        )}
      </div>
    </div>
  )
}