import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
const CreateGroupForm = dynamic(
  () => import("@/components/Modules/Group/create-group"),
  {
    ssr: false,
  }
);
export default function CreateGroupPage() {
  return <CreateGroupForm />;
}

CreateGroupPage.Layout = DrawerNav;
