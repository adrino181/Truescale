import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
const ContactUs = () => {
  return (
    <Container sx={{ height: "100vh" }}>
      <Typography variant="subtitle2" color="textPrimary">
        Reach Out to Us here
      </Typography>
      <a style={{ color: "white" }} href="mailto: truescale@gmail.com">
        truescale.in@gmail.com
      </a>
      <Link
        style={{ color: "#5B4FE9" }}
        target="_blank"
        href="https://discord.gg/4WXhjs3Z9Q"
      >
        <span style={{ color: "white" }}>{`Join Our Discord here -> `}</span>
      </Link>
    </Container>
  );
};

export default ContactUs;
