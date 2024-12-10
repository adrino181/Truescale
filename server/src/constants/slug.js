const COVERAGE_TYPE = [
  {
    label: "press release",
    key: 1,
  },
  {
    label: "industry story",
    key: 2,
  },
  {
    label: "profiling",
    key: 3,
  },
];

const PRODUCTION_URL = "https://truescale.in";
const LOCALHOST_URL = "https://localhost:3000";

const HOST_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://truescale.in";

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

// DEFAULT IS new, then after 2 days changes to general
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

const POST_MEDIA_TYPE = [
  'article',
  'text',
  'audio',
  'video',
]

const POST_TYPE = [POST_PREMIUM, POST_PRIVATE, POST_PUBLIC];
module.exports = {
  POST_STATE,
  POST_PLACE,
  PROFILE_STATE,
  USER_TYPE,
  PRODUCTION_URL,
  LOCALHOST_URL,
  COVERAGE_TYPE,
  CITIZEN,
  IS_PAID,
  IS_NEW,
  HOST_URL,
  POST_TYPE,
  POST_MEDIA_TYPE
};
