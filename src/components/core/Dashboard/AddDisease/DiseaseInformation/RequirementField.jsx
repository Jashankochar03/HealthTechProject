import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function RequirementsField({
  name,
  label,
  register,
  setValue,
  errors,
  getValues,
}) {
  const { editDisease, disease } = useSelector((state) => state.disease)
  const [commonSymptoms, setCommonSymptoms] = useState("")
  const [commonSymptomsList, setCommonSymptomsList] = useState([])

  useEffect(() => {
    if (editDisease) {
      setCommonSymptomsList(disease?.commonSymptoms)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, commonSymptomsList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commonSymptomsList])

  const handleAddCommonSymptoms = () => {
    if (commonSymptoms) {
      setCommonSymptomsList([...commonSymptomsList, commonSymptoms])
      setCommonSymptoms("")
    }
  }

  const handleRemoveCommonSymptoms = (index) => {
    const updatedCommonSymptoms = [...commonSymptomsList]
    updatedCommonSymptoms.splice(index, 1)
    setCommonSymptomsList(updatedCommonSymptoms)
  }

  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-richblack-5" htmlFor={name}>
        {label} <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input
          type="text"
          id={name}
          value={commonSymptoms}
          onChange={(e) => setCommonSymptoms(e.target.value)}
          className="form-style w-full"
        />
        <button
          type="button"
          onClick={handleAddCommonSymptoms}
          className="font-semibold text-yellow-50"
        >
          Add
        </button>
      </div>
      {commonSymptomsList.length > 0 && (
        <ul className="mt-2 list-inside list-disc">
          {commonSymptomsList.map((commonSymptoms, index) => (
            <li key={index} className="flex items-center text-richblack-5">
              <span>{commonSymptoms}</span>
              <button
                type="button"
                className="ml-2 text-xs text-pure-greys-300 "
                onClick={() => handleRemoveCommonSymptoms(index)}
              >
                clear
              </button>
            </li>
          ))}
        </ul>
      )}
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}