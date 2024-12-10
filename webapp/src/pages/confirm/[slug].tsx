import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import api from "@/components/services/Api";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { resendEmail } from "@/redux/authSlice";
const ConfirmUser = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleResendEmail = () => {
    dispatch(resendEmail());
  };

  return (
    <>
      <Container
        sx={{
          flex: "1",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Check your email for a verification link</h1>
          <Button
            onClick={handleResendEmail}
            variant="outlined"
            sx={{ textTransform: "none", color: "white", borderColor: "white" }}
          >
            Resend
          </Button>
        </div>
      </Container>
    </>
  );
};

ConfirmUser.Layout = DrawerNav;

export default ConfirmUser;
