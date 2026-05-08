import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "./contexts/contextprovider";
 

export default function ProtectedRoute({ allowedRoles }) {
  
  const { token, user } = useStateContext();
  //console.log("ProtectedRoute token:", token);
  if(!token) {
    return <Navigate to="/login" />
  }

  if(allowedRoles && !allowedRoles.includes(user?.user_type)){
    return <Navigate to="/login" />
  }
  return <Outlet /> 
  /*if (!token) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;*/
}