import PieChart from "@/components/Charts/PieChart";
import Box from "@mui/material/Box";

const RealTime = ({ sessions, total }) => {
  // console.log(sessions, total, "test");
  return (
    <Box
      sx={{
        position: "relative",
        padding: [0, 0, 0, 0],
      }}
    >
      <PieChart sessions={sessions} />
    </Box>
  );
};

export default RealTime;
