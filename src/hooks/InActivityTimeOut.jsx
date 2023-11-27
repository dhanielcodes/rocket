import { useEffect } from "react";
import { useLocation, Outlet, useNavigate } from "react-router-dom";
import { useSessionStorage } from "./useSessionStorage";

const whitelist = [
  "/",
  "/signup"
  // "/auth/sign-in",
  // "/auth/create-account",
  // "/auth/register",
  // "/auth/forgot-password",
];

const InActivityTimeOut = () => {
  const router = useLocation();
  const navigate = useNavigate();
  const { removeSessionStorage } = useSessionStorage("__appUser");

  let timeout = null;

  const goBackToHome = () => {
    // code to reset the application
    removeSessionStorage();
    navigate("/");
  };

  const restartAutoReset = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      goBackToHome();
    }, 1000 * 420);
  };

  const onMouseMove = () => {
    restartAutoReset();
  };

  useEffect(() => {
    // Whitelist certain pages
    let preventReset = false;
    for (const path of whitelist) {
      if (path === router.pathname) {
        preventReset = true;
      }
    }
    if (preventReset) {
      return;
    }

    // initiate timeout
    restartAutoReset();

    // listen for mouse events
    window.addEventListener("mousemove", onMouseMove);

    // cleanup
    return () => {
      if (timeout) {
        clearTimeout(timeout);
        window.removeEventListener("mousemove", onMouseMove);
      }
    };
    // eslint-disable-next-line
  }, [router.pathname]);
  return <Outlet />;
};

export default InActivityTimeOut;
