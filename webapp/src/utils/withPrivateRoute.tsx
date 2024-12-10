import { useEffect, useMemo } from "react";
import AuthScreen from "@/components/Modules/Auth";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/router";

const withAuth = (Component) => {
  const Auth = (props) => {
    // Login data added to props via redux-store (or use react context for example)
    const { status, profileStatus } = useAppSelector((state) => state.auth);
    const router = useRouter();
    useEffect(() => {
      if (router.pathname === "/session-expired" && status === "fulfilled") {
        router.push("/home");
      }
    }, [status]);
    const screen = useMemo(() => {
      if (status === "idle" || status === "pending") {
        return <></>;
      }
      if (status === "rejected" || profileStatus === "token_expired") {
        return (
          <div
            style={{
              height: "100vh",
            }}
          >
            <AuthScreen />
          </div>
        );
      }
      // If user is logged in, return original component
      return <Component {...props} />;
    }, [status, profileStatus]);
    return screen;
  };

  // Copy getInitial props so it will run as well
  if (Component.getInitialProps) {
    Auth.getInitialProps = Component.getInitialProps;
  }
  Auth.Layout = Component.Layout;
  return Auth;
};

export default withAuth;
