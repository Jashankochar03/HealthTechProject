import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchDoctorAddedDiseases } from '../../../../services/operations/diseaseDetailsAPI';
import { getDoctorData } from '../../../../services/operations/profileAPI';
import DoctorChart from './DoctorChart';
import { Link } from 'react-router-dom';

export default function Doctor() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const [loading, setLoading] = useState(false)
    const [doctorData, setDoctorData] = useState(null)
    const [diseases, setDiseases] = useState([])
  
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        const doctorApiData = await getDoctorData(token)
        const result = await fetchDoctorAddedDiseases(token)
        console.log(doctorApiData)
        if (doctorApiData.length) setDoctorData(doctorApiData)
        if (result) {
          setDiseases(result)
        }
        setLoading(false)
      })()
    }, [])
  
  
    const totalPatientsEnrolled = doctorData?.reduce(
      (acc, curr) => acc + curr.totalPatients,
      0
    )
  
    return (
      <div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-richblack-5">
            Hi {user?.firstName} 👋
          </h1>
          <p className="font-medium text-richblack-200">
            Let's start something new
          </p>
        </div>
        {loading ? (
          <div className="spinner"></div>
        ) : diseases.length > 0 ? (
          <div>
            <div className="my-4 flex h-[450px] space-x-4">
              {/* Render chart / graph */}
              {totalPatientsEnrolled > 0 ? (
                <DoctorChart diseases={doctorData} />
              ) : (
                <div className="flex-1 rounded-md bg-richblack-800 p-6">
                  <p className="text-lg font-bold text-richblack-5">Visualize</p>
                  <p className="mt-4 text-xl font-medium text-richblack-50">
                    Not Enough Data To Visualize
                  </p>
                </div>
              )}
              {/* Total Statistics */}
              <div className="flex min-w-[250px] flex-col rounded-md bg-richblack-800 p-6">
                <p className="text-lg font-bold text-richblack-5">Statistics</p>
                <div className="mt-4 space-y-4">
                  <div>
                    <p className="text-lg text-richblack-200">Total Diseases</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {diseases.length}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg text-richblack-200">Total Patients</p>
                    <p className="text-3xl font-semibold text-richblack-50">
                      {totalPatientsEnrolled}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-md bg-richblack-800 p-6">
              {/* Render 3 courses */}
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-richblack-5">Your Added Diseases</p>
                <Link to="/dashboard/my-addedDiseases">
                  <p className="text-xs font-semibold text-yellow-50">View All</p>
                </Link>
              </div>
              <div className="my-4 flex items-start space-x-6">
                {diseases.slice(0, 3).map((disease) => (
                  <div key={disease._id} className="w-1/3">
                    <img
                      src={disease.thumbnail}
                      alt={disease.name}
                      className="h-[201px] w-full rounded-md object-cover"
                    />
                    <div className="mt-3 w-full">
                      <p className="text-sm font-medium text-richblack-50">
                        {disease.name}
                      </p>
                      <div className="mt-1 flex items-center space-x-2">
                        <p className="text-xs font-medium text-richblack-300">
                          {disease.patients.length} students
                        </p>
                        <p className="text-xs font-medium text-richblack-300">
                          |
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 rounded-md bg-richblack-800 p-6 py-20">
            <p className="text-center text-2xl font-bold text-richblack-5">
              You have not added any disease yet
            </p>
            <Link to="/dashboard/add-disease">
              <p className="mt-1 text-center text-lg font-semibold text-yellow-50">
                Add Disease
              </p>
            </Link>
          </div>
        )}
      </div>
    )
  }