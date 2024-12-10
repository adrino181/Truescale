import withAuth from "@/utils/withPrivateRoute";
import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import TotalPosts from "@/components/Modules/Posts/totalPosts";
import ColdRightNav from "@/components/Blocks/Layout/component/ColdRightNav";
const Trending = () => {
  return <ColdRightNav />;
};

Trending.Layout = DrawerNav;

export default withAuth(Trending);
