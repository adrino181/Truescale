// contexts/auth.js

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  useLayoutEffect,
  startTransition,
} from "react";
import { useRouter } from "next/router";
import api from "@/components/services/Api";
import { isTokenExpired } from "@/utils/converter";
import { loginUser, registerUser, confirmAuth } from "@/redux/authSlice";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
interface Props {
  children?: React.ReactNode;
  // any props that come into the component
}

interface AuthData {
  token: string;
}

const AuthContext = createContext({});

export const AuthProvider = ({ children }: Props) => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;
  const { status, user, profileStatus } = useAppSelector((state) => state.auth);
  const { slug } = router.query || {
    slug: [],
  };
  const asPath = router.asPath;
  //Todo
  //Move this to dyanmic component login and rendering
  //what if user comes from different src/urls

  useEffect(() => {
    if (profileStatus === "incomplete") {
      // Perform localStorage action
      startTransition(() => {
        router.push("/profile/complete");
      });
    }
    if (profileStatus === "fulfilled") {
      // console.log("redirect user is logged in");
      // console.log("document", document.referrer);
      // startTransition(() => {
      //   if (document.referrer) {
      //     router.push(`/${document.referrer}`);
      //   } else {
      //     router.push(`/${user.handle}`);
      //   }
      // });
    }

    if (profileStatus === "verify") {
      const token = router?.query?.q as string;
      if (token) {
        dispatch(confirmAuth({ token }));
      } else {
        router.push("/confirm/email");
      }
    }

    if (profileStatus === "token_expired") {
      router.push("/session-expired");
    }
  }, [profileStatus, status]);
  const redirectHome = useCallback(() => {
    if (user && status === "fulfilled") {
      const routePath = slug && typeof slug === "object" ? slug.join("/") : "/";
      router.push(`/home`);
    }
  }, [user]);

  const setGlobalApiHeader = async () => {
    let login = JSON.parse(localStorage.getItem("login") || "{}");
    if (login && login.token) {
      api.Authorization = login.token;
    }
  };

  const getToken = async () => {
    const tokenData = JSON.parse(localStorage.getItem("login") || "{}");
    return tokenData;
  };

  const logout = () => {
    api.Authorization = "";
    router.push("/login");
  };

  const handleGoogleLogin = async (response: any) => {
    dispatch(loginUser(response));
  };

  const handleGoogleSignup = async (response: any) => {
    dispatch(registerUser({ ...response }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setGlobalApiHeader,
        logout,
        redirectHome,
        handleGoogleLogin,
        handleGoogleSignup,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
