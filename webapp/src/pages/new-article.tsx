import DrawerNav from "@/components/Blocks/Layout/DrawerLayout";
import dynamic from "next/dynamic";
import Head from "next/head";
import withAuth from "@/utils/withPrivateRoute";
const ArticleHome = dynamic(() => import("@/components/Modules/Article"), {
  ssr: false,
});
const ArticlePage = () => {
  return (
    <>
      <Head>
        <title>Truescale</title>
        <meta name="description" content="everthing around you" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ArticleHome />
    </>
  );
};
ArticlePage.Layout = DrawerNav;

export default withAuth(ArticlePage);
