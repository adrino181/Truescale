import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const PersonCard = ({ props }) => {
  return (
    <Box>
      <Typography>Sushil</Typography>
      <Image height="100" width="100" src="/assets/diamond.png" />
    </Box>
  );
};

export default PersonCard;
