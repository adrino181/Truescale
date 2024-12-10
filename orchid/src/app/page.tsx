import Image from "next/image";
import Header from "@/components/header";
import Blog from "@/components/blog";
import Subscribe from "@/components/subscribe";
import { headers } from "next/headers";
import ProfileSection from "@/components/profile";
import Head from "next/head";
//fetch user profile
//render header with tags
//render his blogs

const fetchUserProfile = async (hostName: string) => {
  const fetchHostUrl = `http://localhost:3001/api/orchid?username=${hostName}`;
  const data = await fetch(fetchHostUrl);
  return data.json();
};

export default async function Home() {
  const headersList = headers();
  const hostName = headersList.get("X-Forwarded-Host");
  let hostProfile =
    process.env.NODE_ENV === "production"
      ? hostName?.split(".")[0]
      : "adrino99";

  const config = await fetchUserProfile(hostProfile as string);
  const profileId = config?.data?._id;
  console.log('this is conginf', config)
  return (
    <>
      <ProfileSection props={config} />
      {profileId ? <Blog profileId={profileId} /> : <></>}
    </>
  );
}
