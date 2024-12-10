import { useCallback } from "react";
import Typography from "@mui/material/Typography";
import CommunityCard from "@/components/Blocks/Cards/communityCard";
import Tags from "@/components/Blocks/Cards/communityCard";
import ProductCard from "@/components/Blocks/Cards/communityCard";
const apiData = {
  community: [
    {
      label: "ChaiPreneurs India",
      imagesrc: "",
      follwers: "11",
    },
    {
      label: "ChaiPreneurs India",
      imagesrc: "",
      follwers: "11",
    },
    {
      label: "ChaiPreneurs India",
      imagesrc: "",
      follwers: "11",
    },
  ],
  product: [
    {
      label: "nob sql Editor",
      imagesrc: "",
      follwers: "11",
    },
    {
      label: "nob sql Editor",
      imagesrc: "",
      follwers: "11",
    },
    {
      label: "nob sql Editor",
      imagesrc: "",
      follwers: "11",
    },
  ],
  tags: [
    {
      label: "B2B",
      follwers: "11",
    },
    {
      label: "AI",
      follwers: "11",
    },
    {
      label: "D2C",
      follwers: "11",
    },
    {
      label: "SAAS",
      follwers: "11",
    },
  ],
};

const HotRightNav = (data) => {
  const RenderRightNav = useCallback(() => {
    return (
      <>
        <Typography variant="h6">Trending Ideas :</Typography>
        {apiData.tags.map((value, key) => (
          <CommunityCard
            key={`index-${key}`}
            post={{
              postData: {
                title:
                  "Build a To Do App in Rust, it should work in all devices",
                subHeading: "baasasdasdf",
              },
            }}
          />
        ))}
        <Typography variant="h6">Trending Guilds :</Typography>
        {apiData.community.map((value, key) => (
          <CommunityCard
            key={`index-${key}`}
            post={{
              postData: {
                title: "Chai Preneurs India",
                subHeading: "baasasdasdf",
              },
            }}
          />
        ))}
        <Typography variant="h6">Trending Products :</Typography>
        {apiData.product.map((value, key) => (
          <ProductCard
            key={`index-${key}`}
            post={{
              postData: {
                title: "Nob Sql Editor",
                subHeading: "baasasdasdf",
              },
            }}
          />
        ))}
      </>
    );
  }, []);
  return (
    <>
      <RenderRightNav />
    </>
  );
};

export default HotRightNav;
