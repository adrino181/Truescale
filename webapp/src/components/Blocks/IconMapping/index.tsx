
import { Wechat, Sinaweibo } from "@emotion-icons/simple-icons/";

import {
  LogoAppleAppstore,
  LogoGooglePlaystore,
} from "emotion-icons/ionicons-solid";

import AddPost from "@/components/svg/AddPost.svg";
import CommentIcon from "@/components/svg/CommentIcon.svg";
import PersonalPost from "@/components/svg/PersonalPost.svg";
import PostIcon from "@/components/svg/PostIcon.svg";



import {
  Facebook,
  Youtube,
  Instagram,
  Twitter,
  Pinterest,
  Tiktok,
  TripAdvisor,
  Vimeo,
  Flickr,
  Blogger,
  Whatsapp,
  Discord,
  Linkedin,
  Mastodon,
  Bitcoin,
  Airbnb,
  Amazon,
  Etsy,
  Medium,
  Github,
  Quora,
  Shopify,
  Figma,
  Kickstarter,
  Twitch,
  Tumblr,
  Spotify,
  Soundcloud,
  Docker,
  Ebay,
  DevTo,
  Gitlab,
  Telegram,
  Slack,
  Behance,
  Patreon,
} from "@emotion-icons/boxicons-logos/";

export const SocialIconMapping: { [key: string]: JSX.Element } = {
  facebook: <Facebook />,
  youtube: <Youtube />,
  instagram: <Instagram />,
  twitter: <Twitter />,
  pinterest: <Pinterest />,
  tiktok: <Tiktok />,
  tripAdvisor: <TripAdvisor />,
  wechat: <Wechat />,
  weibo: <Sinaweibo />,
  vimeo: <Vimeo />,
  flickr: <Flickr />,
  appleStore: <LogoAppleAppstore />,
  googlePlay: <LogoGooglePlaystore />,
  blog: <Blogger />,
};


const IconMapping: { [key: string]: JSX.Element } = {
  post: <AddPost />,
  comment: <CommentIcon />,
  calender: <PersonalPost />,
  article: <PostIcon />
};


export default IconMapping;
