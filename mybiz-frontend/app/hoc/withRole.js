import Cookies from "js-cookie";

function withRole(Component, allowedRoles) {
    return function RoleProtectedComponent(props) {
        const is_staff = Cookies.get("is_staff");
        const role =  is_staff ? "admin" : "user";

        if (!allowedRoles.includes(role)) {
            return null;
        }

        return <Component {...props} />;
    };
}

export default withRole;
