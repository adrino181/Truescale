import withAuth from "@/utils/withPrivateRoute";
import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import TotalPosts from "@/components/Modules/Posts/totalPosts";
const PersonalPost = () => {
  return <TotalPosts />;
};

PersonalPost.Layout = DrawerNav;

export default withAuth(PersonalPost);
