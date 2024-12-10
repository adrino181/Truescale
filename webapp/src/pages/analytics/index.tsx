import withAuth from "@/utils/withPrivateRoute";
import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
// const PieChart = dynamic(() => import("@/components/Charts/PieChart"), {
//   ssr: false,
// });

const AnalyticsModule = dynamic(
  () => import("@/components/Modules/Analytics"),
  {
    ssr: false,
  }
);
const Analytics = () => {
  return (
    <>
      {/* <h1>Analytics</h1>
      <PieChart />
      <PostsData />
      <TagsData /> */}
      <AnalyticsModule />
    </>
  );
};

Analytics.Layout = DrawerNav;

export default withAuth(Analytics);
