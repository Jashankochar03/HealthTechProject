import { ACCOUNT_TYPE } from "../utils/constants";
export const sidebarLinks = [
  {
    id: 1,
    name: "My Profile",
    path: "/dashboard/my-profile",
    icon: "VscAccount",
  },
  {
    id: 2,
    name: "Dashboard",
    path: "/dashboard/doctor",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "MdDashboardCustomize",
  },
  {
    id: 3,
    name: "Covered Diseases",
    path: "/dashboard/diseases",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "MdLocalHospital",
  },
  {
    id: 4,
    name: "Add Disease",
    path: "/dashboard/add-disease",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscAdd",
  },
    {
    id: 4,
    name: "Add Blog",
    path: "/dashboard/add-blog",
    type: ACCOUNT_TYPE.DOCTOR,
    icon: "VscAdd",
    },
  {
    id: 5,
    name: "Health Progress",
    path: "/dashboard/health-progress",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "GiHeartInside",
  },
  {
    id: 6,
    name: "Your Messages",
    path: "/dashboard/messages",
    type: ACCOUNT_TYPE.PATIENT,
    icon: "VscHistory",
  },
];
