import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@/components/Modules/Profile"), {
  ssr: false,
});

const ProfilePage = () => {
  return <Profile />;
};

ProfilePage.Layout = DrawerNav;

export default ProfilePage;
