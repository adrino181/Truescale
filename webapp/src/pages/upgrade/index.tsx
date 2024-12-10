import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import withAuth from "@/utils/withPrivateRoute";
import Payment from "@/components/Blocks/Pricing";
const Pricing = () => {
  return <Payment />;
};

Pricing.Layout = DrawerNav;

export default Pricing;
