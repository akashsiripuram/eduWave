import { Route, Routes, useLocation } from "react-router";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Navbar from "./components/shared/Navbar";
import AuthPage from "./pages/AuthPage";
import Canvas from "./pages/DashboardPage/Teacher/CanvasPage";
import GenerateQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage";
import PreviewQuiz from "./pages/DashboardPage/Teacher/GenerateQuizPage/PreviewQuiz";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import Loader from "./components/Loaders/Loader";
import PublicRoute from "./components/Auth/PublicRoute";
import TeacherRegister from "./pages/AuthPage/Teacher/TeacherRegister";
import TeacherLogin from "./pages/AuthPage/Teacher/TeacherLogin";
import Spinner from "./components/Loaders/Spinner";
import ProtectedTeacherRoute from "./components/Auth/ProtectedTeacherRoute";
import TeacherDashboard from "./pages/DashboardPage/Teacher/TeacherDashboard";
import AddStudent from "./pages/DashboardPage/Teacher/AddStudent";
import QuizPageTeacher from "./pages/DashboardPage/Teacher/QuizPageTeacher";
import LeaderBoardPage from "./pages/LeaderBoardPage";
import ProtectedStudentRoute from "./components/Auth/ProtectedStudentRoute";
import StudentLogin from "./pages/AuthPage/Student/StudentLogin";
import StudentDashboard from "./pages/DashboardPage/Student/StudentDashboard";
import QuizPageStudent from "./pages/DashboardPage/Student/QuizPageStudent";
import QuizStudent from "./pages/DashboardPage/Student/QuizPageStudent/QuizStudent";
import LeaderBoardStudent from "./pages/DashboardPage/Student/LeaderBoard/LeaderBoardStudent";
import LeaderBoardTeacher from "./pages/DashboardPage/Teacher/LeaderBoard/LeaderBoardTeacher";
import CanvasStudent from "./pages/DashboardPage/Student/Canvas";
import EMeetTeacher from "./pages/DashboardPage/Teacher/EMeet";
import TeacherRoom from "./pages/DashboardPage/Teacher/EMeet/TeacherRoom";
import StudentRoom from "./pages/DashboardPage/Student/EMeet/StudentRoom";
import EMeetStudent from "./pages/DashboardPage/Student/EMeet";
import Stars from "./components/Stars/Stars";
import { useEffect, useState } from "react";

function App() {
  const { loading } = useSelector((state) => state.alert);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const location = useLocation();
  const isStudentRoute = location.pathname.includes("/dashboard/student");

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
  };

  const handleKeyDown = (event) => {
    if (event.key === "f") {
      toggleFullScreen();
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };
  return (
    <>
      {loading || (isStudentRoute && !isFullScreen) ? <Spinner /> : null}
      <Toaster />
      <Stars />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/auth"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/teacher/register"
          element={
            <PublicRoute>
              <TeacherRegister />
            </PublicRoute>
          }
        />
        <Route
          path="/auth/teacher/login"
          element={
            <PublicRoute>
              <TeacherLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/teacher"
          element={
            <ProtectedTeacherRoute>
              <TeacherDashboard />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/all-quiz"
          element={
            <ProtectedTeacherRoute>
              <QuizPageTeacher />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/create-quiz"
          element={
            <ProtectedTeacherRoute>
              <GenerateQuiz />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/students"
          element={
            <ProtectedTeacherRoute>
              <AddStudent />
            </ProtectedTeacherRoute>
          }
        />

        <Route
          path="/dashboard/teacher/preview/:quizTitle"
          element={
            <ProtectedTeacherRoute>
              <PreviewQuiz />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/canvas"
          element={
            <ProtectedTeacherRoute>
              <Canvas />
            </ProtectedTeacherRoute>
          }
        />

        <Route
          path="/auth/student/login"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route
          path="/dashboard/student"
          element={
            <ProtectedStudentRoute>
              <StudentDashboard />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/quiz"
          element={
            <ProtectedStudentRoute>
              <QuizPageStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/quiz/student/:id"
          element={
            <ProtectedStudentRoute>
              <QuizStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/leaderboard"
          element={
            <ProtectedStudentRoute>
              <LeaderBoardStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/teacher/leaderboard"
          element={
            <ProtectedTeacherRoute>
              <LeaderBoardTeacher />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/student/canvas"
          element={
            <ProtectedStudentRoute>
              <CanvasStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/teacher/emeet"
          element={
            <ProtectedTeacherRoute>
              <EMeetTeacher />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/teacher/meet/:roomID"
          element={
            <ProtectedTeacherRoute>
              <TeacherRoom />
            </ProtectedTeacherRoute>
          }
        />
        <Route
          path="/dashboard/student/emeet"
          element={
            <ProtectedStudentRoute>
              <EMeetStudent />
            </ProtectedStudentRoute>
          }
        />
        <Route
          path="/dashboard/student/meet/:roomID"
          element={
            <ProtectedStudentRoute>
              <StudentRoom />
            </ProtectedStudentRoute>
          }
        />
        {/* <Route path="/quiz/:id" element={<QuizPage />} /> */}
        {/* <Route path="/preview/:quizTitle" element={<PreviewQuiz />} /> */}
        {/* <Route path="/dashboard/teacher" element={<TeacherDashboard />} /> */}
        {/* <Route path="/quiz" element={<QuizPageTeacher />} /> */}
        <Route path="/leaderboard" element={<LeaderBoardPage />} />
      </Routes>
      {/* <Stars /> */}
    </>
  );
}

export default App;
