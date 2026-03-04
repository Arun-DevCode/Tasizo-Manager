import { Navigate } from "react-router";

function RouteProtected({ children }) {
  const accessToken = localStorage.getItem("accessToken"); // token

  // Redirect User
  return accessToken ? children : <Navigate to={"/"} />;
}

export default RouteProtected;
