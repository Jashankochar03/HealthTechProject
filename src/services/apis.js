const BASE_URL = "http://localhost:4000/api/v1"

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_HEALTH_RECORDS_API: BASE_URL + "/profile/getHealthRecords",
  GET_DOCTOR_DATA_API: BASE_URL + "/profile/doctorDashboard",
}

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
}

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
}


// DISEASE ENDPOINTS
export const diseaseEndpoints = {
  GET_ALL_DISEASE_API: BASE_URL + "/disease/getAllDiseases",
  DISEASE_DETAILS_API: BASE_URL + "/disease/getDiseaseDetails",
  EDIT_DISEASE_API: BASE_URL + "/disease/editDisease",
  DISEASE_CATEGORIES_API: BASE_URL + "/disease/showAllCategories",
  CREATE_DISEASE_CATEGORY_API : BASE_URL + "/disease/createCategory",
  CREATE_DISEASE_API: BASE_URL + "/disease/createDisease",
  GET_DOCTOR_ADDED_DISEASE_API: BASE_URL + "/disease/getDoctorAddedDisease",
  DELETE_DISEASE_API: BASE_URL + "/disease/deleteDisease",
  CREATE_HEALTH_RECORD_API:
    BASE_URL + "/disease/createHealthRecord"
}

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}

// DISEASE CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/disease/showAllCategories",
}

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
}
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}

//HEALTH AI API
export const healthEndpoints = {
  UPLOAD_SKIN_IMAGES: BASE_URL + "/health/upload",
}

export const blogEndpoints = {
  GET_ALL_BLOGS_API : BASE_URL + "/blogs/getAllBlogs",
  SHOW_ALL_CATEGORIES: BASE_URL + "/blogs/showAllCategories",
  GET_BLOG_DETAILS : BASE_URL + "/blogs/getBlogDetails"
}