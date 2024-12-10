import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { getIdFromUrl } from "@/utils/converter";
import ViewPost from "@/components/Modules/Posts";
import DrawerNavBar from "@/components/Blocks/Layout/DrawerLayout";
import { baseUrl } from "@/components/services/Api";


const UserHomePage = (props) => {
  const router = useRouter();
  const { slug } = router.query || {
    slug: ["", ""],
  };
  const username = slug?.[0];
  const blogId = getIdFromUrl(slug?.[1] || "");

  if (username && blogId) {
    return <ViewPost props={props} />;
  }
};

UserHomePage.Layout = DrawerNavBar;

export async function getServerSideProps(context) {
  const { slug } = context.query || {
    slug: "",
  };

  const username = slug?.[0];
  const blogId = getIdFromUrl(slug?.[1] || false);
  if (!username || !blogId) {
    return {
      notFound: true,
    };
  }
  try {
    const res = await fetch(`${baseUrl}/api/posts/${blogId}`);
    const postData = await res.json();
    if (!postData || !postData.response) {
      return {
        notFound: true,
      };
    }
    const props = postData.response.post;
    return { props };
  } catch (error) {
    return {
      notFound: true,
    };
  }

  //   return {
  //     redirect: {
  //       destination: "/404",
  //       permanent: false,
  //     },
  //   };

  // return { props: {} };
}

export default UserHomePage;
