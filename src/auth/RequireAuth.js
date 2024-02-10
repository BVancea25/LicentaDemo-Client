import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth"

const RequireAuth = () => {
  const { auth } = useAuth();
  
  console.log(auth.userId);
  if (auth.userId !== undefined || auth.userId !== null ) {
    console.log("aici");
    return <Outlet />;
  } else {
    console.log("aici nu");
    return <Navigate to="/register" />;
  }
};

export default RequireAuth;