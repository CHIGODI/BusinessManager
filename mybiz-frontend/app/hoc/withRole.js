import Cookies from "js-cookie";
import { useRouter } from "next/router";

function withRole(Component, allowedRoles) {
    return function RoleProtectedComponent(props) {
        const router = useRouter();
        const is_staff = Cookies.get("is_staff");
        const role =  is_staff ? "admin" : "user";

        // Redirect if the role is not allowed
        if (!allowedRoles.includes(role)) {
            if (typeof window !== "undefined") {
                router.push("/");
            }
            return null;
        }

        return <Component {...props} />;
    };
}

export default withRole;
