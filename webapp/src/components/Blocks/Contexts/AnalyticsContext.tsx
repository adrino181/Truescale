import React, { Context } from "react";
import { useAppSelector } from "@/redux/hooks";
type EventParams = {
  name?: string;
  website?: string;
};

type AnalyticsContextType = {
  sendEvent: (params: EventParams) => void;
  isTrackerLoaded: boolean;
};
const AnalyticsContext = React.createContext<AnalyticsContextType>({
  sendEvent: () => {},
  isTrackerLoaded: false,
});

interface Props {
  children?: React.ReactNode;
  trackerId?: string;
  // any props that come into the component
}

const AnalyticsProvider = ({ children }: Props) => {
  const trackerRef = React.useRef();
  const { status, user } = useAppSelector((state) => state.auth);
  const [isTrackerLoaded, setTrackerStatus] = React.useState(false);
  const trackPageView = (tracker, params) => {
    if (tracker) {
      const { track } = tracker;
      if (track) {
        track((config) => ({ ...config, name: "Page View", ...params }));
      }
    }
  };
  const addScript = () =>
    new Promise((resolve, reject) => {
      var el = document.createElement("script");
      el.setAttribute("src", "../data/hookrux");
      el.setAttribute("data-auto-track", "false");
      document.body.appendChild(el);
      el.onload = () => {
        resolve("RESOLVED");
      };
    });
  React.useEffect(() => {
    if (window && document) {
      addScript().then(() => {
        trackerRef.current = window?.truescale?.track;
        setTrackerStatus(true);
      });
    }
  }, []);

  const sendEvent = React.useCallback(
    (params) => {
      if (!trackerRef.current || process.env.NODE_ENV === "development") {
        return;
      }
      if (status === "fulfilled") {
        //track events for loggedin user events
        trackPageView(window.truescale, { ...params, website: user.trackerId });
      }

      if (status === "rejected") {
        // track events for default server and custom trackerIds
        const defaultWebsite = params.website || "654cf771f5cc69a0db1f9c16";
        trackPageView(window.truescale, { ...params, website: defaultWebsite });
      }
    },
    [status]
  );

  return (
    <AnalyticsContext.Provider
      ref={trackerRef}
      value={{ sendEvent, isTrackerLoaded }}
    >
      {children}
    </AnalyticsContext.Provider>
  );
};

export default AnalyticsProvider;

export const useAnalytics = () => React.useContext(AnalyticsContext);
