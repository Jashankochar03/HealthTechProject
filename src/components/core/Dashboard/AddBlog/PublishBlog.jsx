import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { editBlog } from "../../../../services/operations/blogAPI"
import { resetBlogState,setStep } from "../../../../slices/blogSlice"
import { BLOG_STATUS } from "../../../../utils/constants"
import IconBtn from "../../../common/IconBtn"

export default function PublishBlog() {
  const { register, handleSubmit, setValue, watch } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth)
  const { blog } = useSelector((state) => state.blog)
  const [loading, setLoading] = useState(false)

  // Pre-fill the checkbox if blog is already published
  useEffect(() => {
    if (blog?.status === BLOG_STATUS.PUBLISHED) {
      setValue("public", true)
    }
  }, [blog, setValue])

  const goBack = () => {
    dispatch(setStep(2))
  }

  const goToBlogs = () => {
    dispatch(resetBlogState())
    navigate("/dashboard/my-blogs")
  }

  const onSubmit = async (data) => {
    const isPublishing = data.public
    const alreadyPublished = blog?.status === BLOG_STATUS.PUBLISHED

    // Avoid unnecessary API call
    if (
      (alreadyPublished && isPublishing) ||
      (!alreadyPublished && !isPublishing)
    ) {
      goToBlogs()
      return
    }

    const formData = new FormData()
    formData.append("blogId", blog._id)
    formData.append("status", isPublishing ? BLOG_STATUS.PUBLISHED : BLOG_STATUS.DRAFT)

    setLoading(true)
    const result = await editBlog(formData, token)
    setLoading(false)

    if (result) {
      goToBlogs()
    }
  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Settings
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Public Checkbox */}
        <div className="my-6 mb-8">
          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input
              type="checkbox"
              id="public"
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            <span className="ml-2 text-richblack-400">
              Make this blog public
            </span>
          </label>
        </div>

        {/* Buttons */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            type="button"
            onClick={goBack}
            disabled={loading}
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
