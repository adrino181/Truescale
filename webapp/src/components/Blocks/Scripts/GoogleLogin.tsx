import { useCallback, useEffect, useState, useRef } from "react";
import { Button } from "@mui/material";
import Script from "next/script";
import GoogleIcons from "@/components/svg/GoogleIcons.svg";

const GoogleLogin = ({ handleGoogleLogin }) => {
  const [googleScripLoaded, setGoogleScripLoaded] = useState(false);
  const btnRef = useRef(null);
  const gRef = useRef(null);
  useEffect(() => {
    if (googleScripLoaded) {
      try {
        gRef.current.accounts.id.prompt();
        gRef.current.accounts.id.renderButton(btnRef.current, {
          type: "standard",
          theme: "filled_black",
          size: "large",
          text: "continue_with",
          shape: "rectangular",
          width: "280",
        });
      } catch (e) {
        console.log("error in renderin google button", e);
      }
    }
  }, [googleScripLoaded]);

  function initializeGoogle() {
    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
      ux_mode: "popup",
    });
    gRef.current = window.google;

    setGoogleScripLoaded(true);
  }

  return (
    <>
      <div ref={btnRef}></div>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="lazyOnload"
        onReady={initializeGoogle}
      />
    </>
  );
};

export default GoogleLogin;
