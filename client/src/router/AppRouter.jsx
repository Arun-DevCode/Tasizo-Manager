import { createBrowserRouter } from "react-router";

//Import
import NotfoundPage from "../pages/NotFoundPage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import RouteProtected from "./RouteProtected";
import CreateTaskForm from "../components/TaskForm";

//App Router
const AppRouter = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/register",
    Component: RegisterPage,
  },
  {
    path: "/dashboard",
    element: (
      <RouteProtected>
        <DashboardPage />
      </RouteProtected>
    ),
  },
  {
    path: "/create-task",
    Component: CreateTaskForm,
  },
  {
    path: "*",
    Component: NotfoundPage,
  },
]);

export default AppRouter;
