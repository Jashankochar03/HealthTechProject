# Health-Tech Platform with Acne Prediction System

A full-stack health-tech platform that leverages AI to provide smart diagnostic tools and digital health record management. This project features an integrated **Acne Prediction System** powered by deep learning, supporting early detection and grading of acne severity based on user-uploaded images and form-based analysis.

---

## Features

### Core Modules
- **User Authentication & Roles**
  - Supports Admin, Patient, and Doctor roles
  - JWT-based secure authentication
- **Electronic Health Records**
  - Patients can upload, view, and manage medical records
  - Doctors can access and update patient records

### AI-Powered Acne Detection
- Upload up to **6 images** for inference
- Model predicts:
  - **Presence of Acne**
  - **Top 2 Acne Grades (1–4)**
- Follow-up **dynamic questionnaire** based on predicted grades
- Final result is a **weighted average** of:
  - Deep learning model output
  - Questionnaire responses

### Image Storage
- Uploads handled via Express backend
- Images stored securely on **Cloudinary**

### Admin Dashboard
- Role-based access control
- Visual analytics on disease predictions and user activity

---

## AI / ML Model Details

| Component             | Details                                      |
|----------------------|----------------------------------------------|
| Model Type           | Deep Learning (CNN-based)                    |
| Training Data        | Combined from 4 open datasets                |
| Classification Task  | Acne Detection and Grading (1–4)             |
| Secondary Input      | Dynamic form responses (severity indicators) |
| Final Scoring        | Image Prediction × Form Score (weighted avg) |

### Datasets Used
- **Acne Dataset** (1,833 images)
- **DermNet Acne Subset** (1,152 images)
- **ACNE04 Dataset** (1,457 images)
- **DermiAcne Dataset** (4,000 images)

---

## Tech Stack

| Layer           | Technology                             |
|----------------|-----------------------------------------|
| Frontend        | React + Tailwind CSS                   |
| Backend         | Node.js + Express                      |
| AI Model        | Python (TensorFlow / PyTorch)          |
| Database        | MongoDB (Mongoose / PyMongo)           |
| Image Hosting   | Cloudinary                             |
| Authentication  | JWT Tokens                             |

---
## Demo Video Link
https://drive.google.com/file/d/1xn7J6d_W0gEuXoRsgbwva4zwzKnWSNJ2/view?usp=drive_link
