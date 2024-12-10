import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";

const WelcomeScreen = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Typography variant="h2">Welcome, {user?.userId?.username}</Typography>
      <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
    </Box>
  );
};

export default WelcomeScreen;
