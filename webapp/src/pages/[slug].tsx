import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
import withAuth from "@/utils/withPrivateRoute";

const Profile = dynamic(() => import("@/components/Modules/Profile"), {
  ssr: false,
});

const ProfilePage = () => {
  return <Profile />;
};

ProfilePage.Layout = DrawerNav;

export default withAuth(ProfilePage);
