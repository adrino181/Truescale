export const INTERESTS = [
  "entertainment",
  "lifestyle",
  "sports",
  "business",
  "education",
  "real state",
];

export const INDUSTRIES = [
  "Electronics",
  "Worldwide Web",
  "Minning",
  "Music",
  "Manufacturing",
  "Energy",
  "News & Media",
  "Entertainment",
  "Hospitality",
  "Health Care",
  "Food",
  "Pharmaceutical",
  "Education",
  "Construction",
  "Agriculture",
  "Telecomunnication",
  "Computers",
  "Transport",
  "Aerospace",
];

export const TEAM_SIZE = [
  "0-2",
  "2-5",
  "5-10",
  "10-50",
  "50-100",
  "100-200",
  "200-500",
  "500-1000",
  ">1000",
  ">2000",
  ">5k",
];

const IS_PAID = "IS_PAID";
const IS_NEW = "IS_NEW";
const IS_GENERAL = "IS_GENERAL";

const CITIZEN = "CITIZEN";
const HEALER = "HEALER";
const MAFIA = "MAFIA";
const BOMBER = "BOMBER";
const GOD = "GOD";
const DETECTIVE = "DETECTIVE";

const PUBLISHED = "PUBLISHED";
const DRAFT = "DRAFT";
const TRANSFERED = "TRANSFERED";
const REJECTED = "REJECTED";

const BLOCKED = "BLOCKED";

const PRODUCT = "PRODUCT";
const COMMUNITY = "COMMUNITY";
// citizen are the default type and new state after that game starts
const USER_TYPE = [
  CITIZEN,
  GOD,
  BOMBER,
  HEALER,
  DETECTIVE,
  MAFIA,
  PRODUCT,
  COMMUNITY,
];

const PROFILE_STATE = [IS_PAID, IS_NEW, IS_GENERAL];

// post state will determine interaction between publisher and a post
const POST_STATE = [PUBLISHED, DRAFT, TRANSFERED, REJECTED, BLOCKED];

// post place by default will be for a profile
const POST_PLACE = ["COMMUNITY", "WALL"];

// premium post will have price on them
const POST_PREMIUM = 1;
// private post will be available to listeners
const POST_PRIVATE = 2;
// public post will be available to everyone
const POST_PUBLIC = 0;

const POST_TYPE = [POST_PREMIUM, POST_PRIVATE, POST_PUBLIC];
const POST_TYPE_MAPPING = {
  POST_PREMIUM: POST_PREMIUM,
  POST_PRIVATE: POST_PRIVATE,
  POST_PUBLIC: POST_PUBLIC,
};

export {
  POST_STATE,
  POST_PLACE,
  PROFILE_STATE,
  USER_TYPE,
  CITIZEN,
  IS_PAID,
  IS_NEW,
  POST_TYPE,
  POST_TYPE_MAPPING,
};
