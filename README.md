**📘 StudyMate – Client Side (Frontend)**

StudyMate is a React-based web application, where students and tutors collaborate through study sessions.
This is the client-side (frontend) of the project.

**Overview**

Students can book sessions, manage personal notes, and access study materials from their booked sessions.

Tutors can create sessions, upload study materials, and manage their own sessions.

Admins can manage all users, study sessions, and study materials.

Secure Firebase Authentication + JWT Security.

Stripe payment for paid sessions.


**🛠 Tech Stack (Client Side)**

React + Vite – Frontend Framework

React Router v7 – Routing System

TailwindCSS – Styling

TanStack Query (React Query) – Data Fetching

Firebase Authentication – Login/Register (Email & Google)

SweetAlert2 – Notifications


**✨ Core Features (Frontend)**


**🔐 Authentication & Roles**

New users register as Student by default.

Students can request to become a Tutor.

Admin decides approval or rejection of tutor requests.

Role-based dashboards ensure each user sees features relevant to them.


**🖥️ Dashboards by Role**

**🎓 Student Dashboard**

My Booked Sessions → View all sessions they have booked.

Study Materials Access → See all study materials uploaded by tutors in their booked sessions.

Notes Management:

Create personal notes.

View note details.

Edit notes.

Delete notes.


**📘 Tutor Dashboard**

Create Study Sessions with full details (title, description, dates, fee, etc.).

Manage My Sessions:

View all sessions created by the tutor.

If any session was rejected by admin, the tutor can reapply after making changes.

Upload Study Materials:

Select a single session and upload study materials.

Materials can be Google Drive links or images.

Update/Delete Sessions:

Tutors can update session details.

Tutors can delete their own sessions if needed.


**🛠 Admin Dashboard**

User Management:

Search users by email.

Change user roles (Student ↔ Tutor).

Study Session Management:

View all sessions created by tutors.

Approve or reject sessions.

Edit or delete sessions if necessary.

Study Materials Review:

Review all study materials uploaded by tutors.

Delete materials if irrelevant or low-quality.

📚 Study Sessions

All Sessions Page → Displays all study sessions as cards.

Session Details Page → Shows:

Title, Tutor Name, Description

Registration Dates, Class Dates, Duration

Registration Fee (0 = Free)

Status (Pending / Ongoing / Closed)

Reviews & Average Rating

"Book Now" / "Already Booked" button


**📂 Folder Structure (Client)**

client/

│

├── public/ 

│

├── src/

│   ├── components/   # Reusable UI Components

│   ├── hooks/        # Custom Hooks (useAuth, useAxios, etc.)

│   ├── layouts/      # Dashboard / Main Layouts

│   ├── pages/        # All Pages (Home, Login, Dashboard etc.)

│   ├── providers/    # AuthProvider.jsx (Firebase + Context)

│   ├── router/       # All Routes

│   ├── App.jsx

│   └── main.jsx

│

├── .env              # Firebase Config

├── package.json

└── tailwind.config.js



**Installation & Setup (Client Side)**

**1️⃣ Clone the Repository**

git clone https://github.com/md-arifur-rahman09/study-mate-client
cd study-mate-client

**2️⃣ Install Dependencies**

npm install

**3️⃣ Environment Variables**

Create a .env file in the client folder with your Firebase config:

VITE_apiKey=your_firebase_api_key

VITE_authDomain=your_firebase_authDomain

VITE_projectId=your_firebase_projectId

VITE_storageBucket=your_firebase_storageBucket

VITE_messagingSenderId=your_firebase_messagingSenderId

VITE_appId=your_firebase_appId

**4️⃣ Run the Project**

npm run dev

**📌 Future Enhancements (Client Side)**

Advanced filters & search for study sessions

Real-time student–tutor chat system

Progress tracking & analytics dashboard

Certificate generation for completed sessions

**👨‍💻 Developer**

Name: Md Arifur Rahman
Role: MERN Stack Developer
