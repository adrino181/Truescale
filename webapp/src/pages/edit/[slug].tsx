import React from "react";
import dynamic from "next/dynamic";
import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import withAuth from "@/utils/withPrivateRoute";
import { getIdFromUrl } from "@/utils/converter";
import { baseUrl } from "@/components/services/Api";

const ArticleModule = dynamic(() => import("@/components/Modules/Article"), {
  ssr: false,
});

const EditPost = (props) => {
  return <ArticleModule props={{ ...props, isEditable: true }} />;
};

export async function getServerSideProps(context) {
  const { slug } = context.query || {
    slug: "",
  };

  const blogId = getIdFromUrl(slug || false);
  if (!blogId) {
    return {
      notFound: true,
    };
  }

  const res = await fetch(`${baseUrl}/api/posts/${blogId}`);
  const postData = await res.json();
  if (!postData || !postData.response) {
    return {
      notFound: true,
    };
  }
  const props = postData.response.post;
  return { props };
}

EditPost.Layout = DrawerNav;

export default withAuth(EditPost);
