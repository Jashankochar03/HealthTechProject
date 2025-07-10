import * as VscIcons from "react-icons/vsc"
import * as MdIcons from "react-icons/md"
import * as AiIcons from "react-icons/ai"
import * as GiIcons from "react-icons/gi"
import * as BiIcons from "react-icons/bi"

import { useDispatch } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetDiseaseState} from "../../../slices/diseaseSlice"

export default function SidebarLink({ link, iconName }) {
  const iconLibraries = {
  ...VscIcons,
  ...MdIcons,
  ...AiIcons,
  ...GiIcons,
  ...BiIcons,
  }
  const Icon = iconLibraries[iconName]
  const location = useLocation()
  const dispatch = useDispatch()

  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname)
  }

  return (
    <NavLink
      to={link.path}
      onClick={() => dispatch(resetDiseaseState())}
      className={`relative px-8 py-2 text-sm font-medium ${
        matchRoute(link.path)
          ? "bg-healthgreen-700 text-white shadow-[0_0_10px_2px_rgba(255,255,255,0.3)]"
          : "bg-opacity-0 text-richblack-300"
      } transition-all duration-200`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-healthgreen-50 ${
          matchRoute(link.path) ? "opacity-100" : "opacity-0"
        }`}
      ></span>
      <div className="flex items-center gap-x-2">
        {/* Icon Goes Here */}
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>
    </NavLink>
  )
}