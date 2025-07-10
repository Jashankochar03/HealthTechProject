import { useEffect, useState } from "react"
import ProgressBar from "@ramonak/react-progress-bar"
import { BiDotsVerticalRounded } from "react-icons/bi"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { getUserHealthRecord } from "../../../services/operations/profileAPI"

export default function HealthRecord() {
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const [healthRecord, setHealthRecord] = useState(null)
  const getHealthRecord = async () => {
    try {
      const res = await getUserHealthRecord(token);

      setHealthRecord(res);
    } catch (error) {
      console.log("Could not fetch health records.")
    }
  };
  useEffect(() => {
    getHealthRecord();
  }, [])

  return (
    <>
      <div className="text-3xl text-richblack-50">Health Progress</div>
      {!healthRecord ? (
        <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>
      ) : !healthRecord.length ? (
        <p className="grid h-[10vh] w-full place-content-center text-richblack-5">
          You have not diagnoses with any disease yet.
          {/* TODO: Modify this Empty State */}
        </p>
      ) : (
        <div className="my-8 text-richblack-5">
          {/* Headings */}
          <div className="flex rounded-t-lg bg-richblack-500 ">
            <p className="w-[45%] px-5 py-3">Disease Name</p>
            <p className="w-1/4 px-2 py-3">Current Grade</p>
            <p className="flex-1 px-2 py-3">Progress</p>
          </div>
          {/* Course Names */}
          {healthRecord.map((disease, i, arr) => (
            <div
              className={`flex items-center border border-richblack-700 ${
                i === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}
              key={i}
            >
              <div
                className="flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3"
                onClick={() => {
                  navigate(
                    `/view-disease/${disease?.disease}/description/${disease.disease?.description}`
                  )
                }}
              >
                <img
                  src={disease.disease.thumbnail}
                  alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover"
                />
                <div className="flex max-w-xs flex-col gap-2">
                  <p className="font-semibold">{disease.disease.name}</p>
                  <p className="text-xs text-richblack-300">
                    {disease.disease.description.length > 50
                      ? `${disease.disease.description.slice(0, 50)}...`
                      : disease.disease.description}
                  </p>
                </div>
              </div>
              <div className="w-1/4 px-2 py-3">{disease?.currentGrade}</div>
              <div className="flex w-1/5 flex-col gap-2 px-2 py-3">
                <p>Progress: {disease.progressPercentage|| 0}%</p>
                <ProgressBar
                  completed={disease.progressPercentage || 0}
                  height="8px"
                  isLabelVisible={false}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}