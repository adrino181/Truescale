import * as React from "react";
import Box from "@mui/material/Box";
import * as S from "./style";
export default function ProgressLoader() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "static",
        left: 0,
        top: 0,
      }}
    >
      <S.StyledLoader variant="buffer" value={progress} valueBuffer={buffer} />
    </Box>
  );
}
