import { getIdFromUrl } from "@/utils/stringHelper";
import { notFound } from "next/navigation";
import ArticleView from "@/components/article";
import { headers } from "next/headers";

//fetch article and then display it
import type { Metadata, ResolvingMetadata } from "next";

const fetchPostData = async (postId: string) => {
  const fetchHostUrl = `http://localhost:3001/api/orchid/post?postId=${postId}`;
  const data = await fetch(fetchHostUrl);
  return data.json();
};

type Props = {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const blogUrl = params?.slug?.[1];
  const blogId = getIdFromUrl(blogUrl || "");
  if (!blogId || blogId === "" || blogId.length !== 24) {
    notFound();
  }

  const { data } = await fetchPostData(blogId);
  // fetch data
  if (!data) {
    notFound();
  }
  const post = data.post;
  const tagsData: string[] = post?.tags || [];
  const keywordsMeta = tagsData.join(",");
  const imageUrl =
    post?.postData?.image ||
    "https://truescale-bucket.s3.ap-south-1.amazonaws.com/web-asset/Vector.png";
  const author = post?.author?.firstName || post?.author?.handle || "Truescale";
  const canonical = post.postData.url;
  const relativeUrl = post.postData.rurl;
  const title = post.postData.title;
  const description = post.postData.subheading;
  const createdAt = post.createdAt;
  const headersList = headers();
  const hostName = headersList.get("X-Forwarded-Host");
  const hostProfile =
    process.env.NODE_ENV === "production"
      ? hostName?.split(".")[0]
      : "adrino99";
  const postUrl = new URL(`https://${hostName}/${hostProfile}/${relativeUrl}`);
  const hostUrl = new URL(`https://${hostName}/@${hostProfile}`);

  return {
    title: title,
    generator: "Truescale",
    //metabase data
    metadataBase: new URL(`https://${hostName}`),
    description: description,
    keywords: tagsData,
    authors: [{ name: author, url: hostUrl }],
    creator: author,
    publisher: author,
    // formatDetection: {
    //   email: false,
    //   address: false,
    //   telephone: false,
    // },
    alternates: {
      canonical: canonical,
      // languages: {
      //   'en-US': '/en-US',
      //   'de-DE': '/de-DE',
      // },
    },
    //open graph
    openGraph: {
      title: title,
      description: description,
      url: `/${relativeUrl}`,
      siteName: hostProfile,
      images: [
        {
          url: imageUrl, // Must be an absolute URL
          width: 800,
          height: 600,
          alt: title,
        },
        {
          url: imageUrl, // Must be an absolute URL
          width: 1800,
          height: 1600,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "article", // website, article,
      publishedTime: createdAt,
      authors: hostUrl,
      // openGraph: {
      //   title: 'Next.js',
      //   description: 'The React Framework for the Web',
      //   type: 'article',
      //   publishedTime: '2023-01-01T00:00:00.000Z',
      //   authors: ['Seb', 'Josh'],
      // },
    },
    other: {
      category: tagsData,
    },
  };
}

export default async function Article({
  params,
}: {
  params: { slug: string };
}) {
  const blogUrl = params?.slug?.[1];
  const blogId = getIdFromUrl(blogUrl || "");
  if (!blogId || blogId === "" || blogId.length !== 24) {
    notFound();
  }

  const { data, message } = await fetchPostData(blogId);
  if (!message || message !== "SUCCESS") {
    notFound();
  }

  return (
    <>
      <ArticleView props={data.post} />
    </>
  );
}
