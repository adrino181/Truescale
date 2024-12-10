import React, { Suspense } from "react";
import ProgressLoader from "@/components/atoms/ProgressLoader";
import ProfileForm from "@/components/Modules/Profile/Complete";
import dynamic from "next/dynamic";
import withAuth from "@/utils/withPrivateRoute";
import NoLayout from "@/components/Blocks/Layout/NoLayout";
//import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
// const ProfileForm = dynamic(
//   () => import("@/components/Modules/Profile/Complete"),
//   {
//     ssr: false,
//   }
// );
const CompleteProfileForm = () => {
  return <ProfileForm />;
};

const TempLayout = ({ children }: { children: JSX.Element }) => (
  <Suspense fallback={<ProgressLoader />}>{children}</Suspense>
);
CompleteProfileForm.Layout = NoLayout;

export default withAuth(CompleteProfileForm);
