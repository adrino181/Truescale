import { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { styled } from "@mui/material";

const StyledPaper = styled(Paper)({
  width: 40,
  height: 40,
  background: "black",
  padding: "12px",
  textAlign: "center",
});

const Timer = () => {
  // stop it when needed
  const Ref = useRef(null);

  // The state for our timer
  const launchData = 1684287400;
  const [timer, setTimer] = useState({
    hour: 0,
    min: 0,
    sec: 0,
    day: 0,
  });

  const getTimeRemaining = (e) => {
    const total = new Date(launchData).getTime() * 1000 - new Date().getTime();

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    const days = Math.floor((total / 1000 / 60 / 60 / 24) % 30);
    return {
      total,
      hours,
      minutes,
      seconds,
      days,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds, days } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the beginning of the variable
      const newHour = hours > 9 ? hours : "0" + hours;
      const newMin = minutes > 9 ? minutes : "0" + minutes;
      const newSec = seconds > 9 ? seconds : "0" + seconds;
      const newDays = days > 9 ? days : "0" + days;
      setTimer({
        hour: newHour,
        min: newMin,
        sec: newSec,
        day: newDays,
      });
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 2592000);
    return deadline;
  };

  // We can use useEffect so that when the component
  // mount the timer will start as soon as possible

  // We put empty array to act as componentDid
  // mount only
  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          width: 65,
          height: 65,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          mr: 1,
        },
      }}
    >
      <div>
        <StyledPaper elevation={0}>
          <Typography variant="h4" style={{ margin: "auto" }}>
            {timer.day}
          </Typography>
        </StyledPaper>
        <Typography
          variant="caption"
          color="textPrimary"
          sx={{ display: "block" }}
        >
          Days
        </Typography>
      </div>
      <div>
        <StyledPaper elevation={0}>
          <Typography variant="h4" style={{ margin: "auto" }}>
            {timer.hour}
          </Typography>
        </StyledPaper>
        <Typography
          color="textPrimary"
          sx={{ display: "block" }}
          variant="caption"
        >
          Hours
        </Typography>
      </div>
      <div>
        <StyledPaper elevation={0}>
          <Typography variant="h4" style={{ margin: "auto" }}>
            {timer.min}
          </Typography>
        </StyledPaper>
        <Typography
          variant="caption"
          color="textPrimary"
          sx={{ display: "block" }}
        >
          Minutes
        </Typography>
      </div>

      <div>
        <StyledPaper elevation={0}>
          <Typography variant="h4" style={{ margin: "auto" }}>
            {timer.sec}
          </Typography>
        </StyledPaper>
        <Typography
          variant="caption"
          color="textPrimary"
          sx={{ display: "block" }}
        >
          Seconds
        </Typography>
      </div>
    </Box>
  );
};

export default Timer;
