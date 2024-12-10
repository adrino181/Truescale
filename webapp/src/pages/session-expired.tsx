import NoLayout from "@/components/Blocks/Layout/NoLayout";
import withAuth from "@/utils/withPrivateRoute";

const SessionExpired = () => {
  return <></>;
};

SessionExpired.Layout = NoLayout;

export default withAuth(SessionExpired);
