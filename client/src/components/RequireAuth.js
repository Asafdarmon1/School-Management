import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./Hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    return (
        //check if there is a user [boolean]

        (auth?.role?.find(roles => allowedRoles?.includes(roles)))
            ? <Outlet />
            : auth.userName
                ? <Navigate to="/unauthorized" state={{ from: location.pathname }} replace />
                : <Navigate to="/login" state={{ from: location.pathname }} replace />
        /*
            send tha user to the login and replace the history of where they came from (location)
        */
    );
}

export default RequireAuth;