import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
const Profile = dynamic(() => import("@/components/Modules/Profile/View"), {
  ssr: false,
});
const ProfileView = () => {
  return (
    <>
      <Profile />
    </>
  );
};
ProfileView.Layout = DrawerNav;
export default ProfileView;
