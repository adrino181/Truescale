import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getIdFromUrl } from "@/utils/converter";
import ViewPost from "@/components/Modules/Posts";
import DrawerNavBar from "@/components/Blocks/Layout/DrawerLayout";
import withAuth from "@/utils/withPrivateRoute";

const Trending = dynamic(() => import("@/components/Modules/Trending"), {
  ssr: false,
});

// const PostView = dynamic(() => import("@/components/Modules/Posts"), {
//   ssr: false,
// });

const UserHomePage = (props) => {
  return <Trending />;
};

UserHomePage.Layout = DrawerNavBar;

export default withAuth(UserHomePage);
