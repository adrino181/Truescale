import React, { DOMElement, Ref, useCallback, useEffect } from "react";
import { styled } from "@mui/system";
import theme from "@/styles/theme";
import { debounce } from "@/utils/debounce";
import { CircularProgress } from "@mui/material";
import { throttle } from "@/utils/throttle";

type ScrollProps = {
  children: React.ReactNode;
  height: string | undefined;
};

const BottomTarget = styled("div")(
  () => ({
    position: 'relative',
    bottom: '500px',
  })
)
const TargetWrapper =
  styled("div")(({ theme }) => ({

  }));
const StyeledScrollView = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<ScrollProps>(({ theme, height }) => ({
  color: theme.palette.primary.contrastText,
  backgroundColor: "none",
  padding: theme.spacing(0, 0.5, 7, 0.5),
  borderRadius: theme.shape.borderRadius,
  height: height || "90vh",
  overflowY: "scroll",
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  /* Handle on hover */
  "::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },
  /* width */
  "::-webkit-scrollbar": {
    width: "5px",
  },
  /* Track */
  "::-webkit-scrollbar-track": {
    background: "transparent",
  },
  /* Handle */
  "::-webkit-scrollbar-thumb": {
    background: "linear-gradient(262.93deg, #6073D8 0.04%, #5B4FE9 100.04%)",
  },
  "scrollbar-width": "none",
  "scrollbar-color": `red ${theme.palette.secondary.main}`,
}));

const ScrollView = ({
  children,
  loader,
  onScrollEnd,
  scrollEndLoading,
  disableLoading,
}: {
  children: React.ReactNode;
  loader: JSX.Element,
  onScrollEnd?: (...args: [interactionCount: number]) => void,
  scrollEndLoading: boolean,
  disableLoading: boolean,
}) => {
  const [height, setHeight] = React.useState<string | undefined>();
  const [interactionCount, setInteractionCount] = React.useState(0);
  const [initStatus, setInit] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const targetRef = React.useRef<HTMLDivElement>(null);
  const interactionCountRef = React.useRef<number>(0);
  const debounceRef = React.useRef(debounce);
  const setHeightAndObserver = () => {
    if (window && containerRef.current) {
      const { top } = containerRef.current.getBoundingClientRect();
      const view = window.innerHeight - top;
      setHeight(`${theme.toRem(view)}`);
    }
  };

  const reinitObserver = () => {
    setInit(prev => !prev)
  }

  const handleScrollValues = () => {
    interactionCountRef.current = interactionCountRef.current + 1;
    onScrollEnd(interactionCountRef.current);
  }
  const handleScrollEnd = debounceRef.current(() => {
    handleScrollValues();
  }, 500);



  React.useEffect(() => {
    let observer: IntersectionObserver;
    if (onScrollEnd) {
      observer = new IntersectionObserver(
        (entries) => {
          const [{ isIntersecting }] = entries
          if (isIntersecting) {
            handleScrollEnd();
          }
        },
        {
          root: containerRef.current,
          rootMargin: "0px 0px 0% 0px",
          threshold: 1,
        }
      );
      if (window && targetRef.current) {
        observer.observe(targetRef.current);
      }
    }
    setHeightAndObserver();
    return () => {
      if (targetRef.current && onScrollEnd) observer.unobserve(targetRef.current);
    };
  }, [initStatus]);

  return (
    <StyeledScrollView height={height} ref={containerRef}>
      {children}
      {!disableLoading && typeof onScrollEnd === 'function'? (
        <>
          {
            scrollEndLoading ? (
              loader
            ) : <></>
          }
          <div style={{ display: 'flex', justifyContent: 'center', }}>
            <CircularProgress size={30} color="secondary" />
          </div>
          <BottomTarget ref={targetRef}>
          </BottomTarget>
        </>
      ) : <></>}
    </StyeledScrollView >
  );
};

export default ScrollView;
