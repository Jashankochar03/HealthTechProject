// components/core/Blogs/BlogInformation/BlogInformationForm.jsx

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { MdNavigateNext } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import {
  addBlog,
  editBlog,
  getAllBlogCategories
} from "../../../../../services/operations/blogAPI"
import { setBlog, setStep } from "../../../../../slices/blogSlice"
import { BLOG_STATUS } from "../../../../../utils/constants"
import IconBtn from "../../../../common/IconBtn"
import BlogUpload from "../BlogUpload"

export default function BlogInformationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm()

  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const { blog, editBlog } = useSelector((state) => state.blog)
  const [loading, setLoading] = useState(false)
  const [blogCategories, setBlogCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      setLoading(true)
      const categories = await getAllBlogCategories()
      if (categories.length > 0) {
        setBlogCategories(categories)
      }
      setLoading(false)
    }

    if (editBlog) {
      setValue("blogName", blog.blogName)
      setValue("blogDescription", blog.blogDescription)
      setValue("blogData", blog.blogData)
      setValue("readingTime", blog.readingTime)
      setValue("category", blog.category._id)
      setValue("thumbnailImage", blog.thumbnail)
    }

    getCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isFormUpdated = () => {
    const current = getValues()
    return (
      current.blogName !== blog.blogName ||
      current.blogDescription !== blog.blogDescription ||
      current.blogData !== blog.blogData ||
      current.readingTime !== blog.readingTime ||
      current.category !== blog.category._id ||
      current.thumbnailImage !== blog.thumbnail
    )
  }

  const onSubmit = async (data) => {
    const formData = new FormData()

    // Gather image fields
    const imageFields = [...Array(6)].map((_, i) => data[`image${i + 1}`])
    const filteredImages = imageFields.filter((img) => img)

    if (filteredImages.length > 6) {
      toast.error("You can upload a maximum of 6 blog images.")
      return
    }

    if (editBlog) {
      if (!isFormUpdated()) {
        toast.error("No changes made to the form")
        return
      }

      formData.append("blogId", blog._id)
      if (data.blogName !== blog.blogName)
        formData.append("blogName", data.blogName)
      if (data.blogDescription !== blog.blogDescription)
        formData.append("blogDescription", data.blogDescription)
      if (data.blogData !== blog.blogData)
        formData.append("blogData", data.blogData)
      if (data.readingTime !== blog.readingTime)
        formData.append("readingTime", data.readingTime)
      if (data.category !== blog.category._id)
        formData.append("category", data.category)
      if (data.thumbnailImage !== blog.thumbnail)
        formData.append("thumbnailImage", data.thumbnailImage)

      filteredImages.forEach((img) => formData.append("images", img))

      setLoading(true)
      const result = await editBlog(formData, token)
      setLoading(false)
      if (result) {
        dispatch(setStep(2))
        dispatch(setBlog(result))
      }
      return
    }

    // Creating a new blog
    formData.append("blogName", data.blogName)
    formData.append("blogDescription", data.blogDescription)
    formData.append("blogData", data.blogData)
    formData.append("readingTime", data.readingTime)
    formData.append("category", data.category)
    formData.append("status", BLOG_STATUS.DRAFT)
    formData.append("thumbnailImage", data.thumbnailImage)

    filteredImages.forEach((img) => formData.append("images", img))

    setLoading(true)
    const result = await addBlog(formData, token)
    if (result) {
      dispatch(setStep(2))
      dispatch(setBlog(result))
    }
    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6"
    >
      {/* Blog Title */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="blogName">
          Blog Title <sup className="text-pink-200">*</sup>
        </label>
        <input
          id="blogName"
          placeholder="Enter Blog Title"
          {...register("blogName", { required: true })}
          className="form-style w-full"
        />
        {errors.blogName && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Blog Title is required
          </span>
        )}
      </div>

      {/* Blog Short Description */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="blogDescription">
          Blog Short Description <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="blogDescription"
          placeholder="Enter short description"
          {...register("blogDescription", { required: true })}
          className="form-style resize-none min-h-[130px] w-full"
        />
        {errors.blogDescription && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Blog description is required
          </span>
        )}
      </div>

      {/* Main Blog Data */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="blogData">
          Blog Content <sup className="text-pink-200">*</sup>
        </label>
        <textarea
          id="blogData"
          placeholder="Write your full blog here"
          {...register("blogData", { required: true })}
          className="form-style resize-none min-h-[250px] w-full"
        />
        {errors.blogData && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Blog content is required
          </span>
        )}
      </div>

      {/* Reading Time */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="readingTime">
          Estimated Reading Time (in minutes)
        </label>
        <input
          type="number"
          id="readingTime"
          placeholder="e.g. 5"
          {...register("readingTime")}
          className="form-style w-full"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col space-y-2">
        <label className="text-sm text-richblack-5" htmlFor="category">
          Blog Category <sup className="text-pink-200">*</sup>
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
            blogCategories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
        </select>
        {errors.category && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            Blog category is required
          </span>
        )}
      </div>

      {/* Thumbnail Upload */}
      <BlogUpload
        name="thumbnailImage"
        label="Thumbnail Image"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editBlog ? blog?.thumbnail : null}
      />

      {/* Dynamic Blog Images */}
      {[...Array(6)].map((_, i) => (
        <BlogUpload
          key={i}
          name={`image${i + 1}`}
          label={`Blog Image ${i + 1} (optional)`}
          register={register}
          setValue={setValue}
          errors={errors}
        />
      ))}

      {/* Submit */}
      <div className="flex justify-end gap-x-2">
        {editBlog && (
          <button
            type="button"
            onClick={() => dispatch(setStep(2))}
            disabled={loading}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Continue Without Saving
          </button>
        )}
        <IconBtn disabled={loading} text={editBlog ? "Save Changes" : "Next"}>
          <MdNavigateNext />
        </IconBtn>
      </div>
    </form>
  )
}
