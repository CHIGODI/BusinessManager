import Cookies from "js-cookie";
import Unauthorised from "./components/Unauthorised";


function withRole(Component, allowedRoles) {
    return function RoleProtectedComponent(props) {
        const is_staff = Cookies.get("is_staff");
        const role =  is_staff ? "admin" : "user";

        // Redirect if the role is not allowed
        if (!allowedRoles.includes(role)) {
            return <Unauthorised />;
        }

        return <Component {...props} />;
    };
}

export default withRole;
