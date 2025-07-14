import "./App.css";
import {Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar"
import OpenRoute from "./components/core/Auth/OpenRoute"
import PreConsultationForm from "./pages/HealthAI";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error"
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import HealthRecord from "./components/core/Dashboard/HealthRecord";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddDisease from "./components/core/Dashboard/AddDisease";
import MyAddedDiseases from "./components/core/Dashboard/MyAddedDiseases";
import EditDisease from "./components/core/Dashboard/EditDisease";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
//import ViewCourse from "./pages/ViewCourse";
//import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Doctor from "./components/core/Dashboard/DoctorDashboard/Doctor";
import Blog from "./pages/Blogs";
import SingleBlog from "./pages/SingleBlog";
import AddBlog from "./components/core/Dashboard/AddBlog";

function App() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)


  return (
   <div className="w-screen min-h-screen bg-healthgreen-600 flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="catalog/:catalogName" element={<Catalog/>} />
      <Route path="courses/:courseId" element={<CourseDetails/>} />
      
      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />  

      <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />  

    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />  

    <Route
          path="/about"
          element={
            
              <About />
            
          }
        />
      
    <Route
          path="/blogs"
          element={
            
              <Blog />
            
          }
        />
    <Route
          path="/blogs/:blogId"
          element={
            
              <SingleBlog />
            
          }
        />
          <Route
          path="/health"
          element={
            
              <PreConsultationForm />
            
          }
        />
    <Route path="/contact" element={<Contact />} />

    <Route 
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }
    >
      <Route path="dashboard/my-profile" element={<MyProfile />} />
      
      <Route path="dashboard/Settings" element={<Settings />} />
      

      {
        user?.accountType === ACCOUNT_TYPE.PATIENT && (
          <>
          <Route path="dashboard/messages" element={<Error/>} />
          <Route path="dashboard/health-progress" element={<HealthRecord />} />
          </>
        )
      }

      {
        user?.accountType === ACCOUNT_TYPE.DOCTOR && (
          <>
          <Route path="dashboard/doctor" element={<Doctor />} />
          <Route path="dashboard/add-disease" element={<AddDisease />} />
          <Route path="dashboard/my-addedDiseases" element={<MyAddedDiseases />} />
          <Route path="dashboard/edit-disease/:diseaseId" element={<EditDisease />} />
          <Route path="dashboard/add-blog" element={<AddBlog />} />
          </>
        )
      }


    </Route>

    <Route path="*" element={<Error />} />


    </Routes>

   </div>
  );
}

export default App;
