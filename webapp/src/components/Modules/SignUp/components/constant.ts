export const initialUserData = [];

//THESE ARE THE USER CATEGORIES SLUG
const USER_CATEGORY_ONE = "ENTREPRENEUR";
const CATEGORY_ENTREPRENEUR_ONE = "IS_ENTREPRENEUR";
const CATEGORY_ENTREPRENEUR_TWO = "NOT_ENTREPRENEUR";
const CATEGORY_ENTREPRENEUR_THREE = "WANT_TO_BE_ENTREPRENEUR";

export const initialSelectionData = [
  {
    label: "Yes",
    value: 1,
    subCategory: {
      type: "radio",
      title: "Domain describes you best ?",
      data: [
        {
          label: "Want to explore the community",
          value: 1,
        },
        {
          label: "Looking for motivation to start a business",
          value: 2,
        },
        {
          label: "Already have an idea but don’t know where to start",
          value: 3,
        },
        {
          label: "Share my idea with the community and get feedback ",
          value: 4,
        },
        {
          label: "Find people who can help build my product",
          value: 5,
        },
        {
          label: "Find people who can help build my business",
          value: 6,
        },
      ],
    },
  },
  {
    label: "Want to",
    value: 3,
    subCategory: {
      type: "select",
      title: "Domain describes you best ?",
      data: [
        { label: "Content Creator" },
        { label: "Student" },
        { label: "Organisation" },
        { label: "Founder/Co Founder" },
        { label: "Individual" },
      ],
    },
  },
  {
    label: "No",
    value: 2,
    subCategory: {
      type: "select",
      title: "Domain describes you best ?",
      data: [
        {
          label: "Entrepreneur",
          value: 1,
          code: 1,
        },
        {
          label: "Organisation",
          value: 2,
          code: 2,
        },
        {
          label: "Student",
          value: 3,
          code: 3,
        },
        {
          label: "Creator",
          value: 4,
          code: 4,
        },
        {
          label: "Visitor",
          value: 5,
          code: 5,
        },
        {
          label: "Others",
          value: 6,
          code: 6,
        },
      ],
    },
  },
];
