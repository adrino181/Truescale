import * as errors from "@/components/Blocks/FormBuilder/data/constants/errors";
export const profilePanel = {
  id: "create-group",
  label: "Add",
  hideSaveAndExit: true,
  hideStepLabel: true,
  grid: {
    templateAreas: '"a instructional b" "a username b"',
    columns: "1fr 1fr 1fr",
  },
  fields: [
    {
      id: "field-instructional",
      type: "instructional",
      name: "instructional",
      component: {
        name: "Text",
        props: {
          label: {
            type: "text",
            content: "Welcome, lets start with setting guild name",
          },
        },
      },
    },
    {
      id: "field-username",
      type: "input-text",
      name: "username",
      component: {
        name: "username",
        props: {
          label: {
            type: "text",
            content: "Guild Name",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      validation: [
        {
          rule: "required",
          error: errors.ERR_01("Guild Name"),
        },
        {
          rule: "maxWordLimit",
          error: errors.ERR_20("Guild Name", 12),
          params: {
            length: 12,
          },
        },
      ],
    },
  ],
  navigation: [
    {
      component: {
        name: "button",
        props: {
          position: "right",
          label: {
            type: "text",
            content: "Next",
          },
          handler: "handleNext",
          withIcon: {
            icon: "arrow-forward",
            where: "right",
          },
        },
      },
    },
  ],
};

export const profilePanel1 = {
  id: "profile-panel2",
  label: "Welcome",
  hideSaveAndExit: true,
  hideStepLabel: true,
  grid: {
    templateAreas: '"a instructional b" "a profileType b"',
    columns: "1fr 1fr 1fr",
  },
  fields: [
    {
      id: "field-instructional",
      type: "instructional",
      name: "instructional",
      component: {
        name: "Text",
        props: {
          label: {
            type: "text",
            content: "Choose Topics",
          },
        },
      },
    },
    {
      id: "field-type",
      type: "selectorGroup",
      name: "profileType",
      component: {
        name: "selectorGroup",
        type: "selectorGroup",
        props: {
          label: {
            type: "text",
            content: "Select your profile type",
          },
          selectors: [
            { label: "Web3", value: "web3" },
            { label: "SAAS", value: "saas" },
            { label: "B2B", value: "b2b" },
            { label: "D2C", value: "d2c" },
            { label: "Art & Entertainment", value: "art-&-entertainment" },
            { label: "Sales & Marketing", value: "sales-&-marketing" },
            { label: "AI & ML", value: "ai-&-ml" },
            { label: "Web & Tech", value: "web-&-tech" },
            { label: "Founder Story", value: "founder-story" },
            { label: "Others", value: "others" },
            { label: "Stock Market", value: "stock-market" },
            { label: "Jobs & Hiring", value: "jobs-&-hiring" },
            { label: "Co Founder", value: "co-founder" },
            { label: "Founder", value: "founder" },
            { label: "Internship", value: "internship" },
          ],
        },
      },
      validation: [
        {
          rule: "required",
          error: "errors.ERR_06",
        },
      ],
    },
  ],
  navigation: [
    {
      component: {
        name: "button",
        props: {
          position: "right",
          label: {
            type: "text",
            content: "Next",
          },
          handler: "handleNext",
        },
      },
    },
  ],
};

//form label
// form image selector
// form headline selector
// form bio selector
export const profilePanel3 = {
  id: "profile-panel4",
  label: "About You",
  hideSaveAndExit: true,
  hideStepLabel: true,
  grid: {
    templateAreas: '"a profileImage b" "a headline b" "a aboutU b"',
    columns: "1fr 1fr 1fr",
  },
  fields: [
    // {
    //   id: "page-heading",
    //   type: "Text",
    //   name: "profileAbout",
    //   component: {
    //     name: "selectorGroup",
    //     type: "selectorGroup",
    //     props: {
    //       label: {
    //         type: "text",
    //         content: "Select your profile type",
    //       },
    //       selectors: [
    //         { label: "Web3" },
    //         { label: "SAAS" },
    //         { label: "B2B" },
    //         { label: "D2C" },
    //         { label: "Art & Entertainment" },
    //         { label: "Sales & Marketing" },
    //         { label: "AI & ML" },
    //         { label: "Web & Tech" },
    //         { label: "Founder Story" },
    //         { label: "Others" },
    //         { label: "Stock Market" },
    //         { label: "Jobs/Hiring" },
    //         { label: "Co Founder" },
    //         { label: "Founder" },
    //         { label: "Internship" },
    //       ],
    //     },
    //   },
    //   validation: [
    //     {
    //       rule: "required",
    //       error: "errors.ERR_06",
    //     },
    //   ],
    // },
    // {
    //   id: "profile-image",
    //   type: "Text",
    //   name: "profileImage",
    // },
    // {
    //   id: "profile-headline",
    //   type: "Text",
    //   name: "profileHeadline",
    // },
    // {
    //   id: "profile-bio",
    //   type: "Text",
    //   name: "profileBio",
    // },
    {
      id: "field-profileImage",
      type: "avatar-upload",
      name: "profileImage",
      component: {
        name: "profileImage",
        props: {
          label: {
            type: "text",
            content: "Select up to two. You can change this later at any time.",
          },
        },
      },
    },
    {
      id: "field-headline",
      type: "input-text",
      name: "headline",
      component: {
        name: "text",
        props: {
          label: {
            type: "text",
            content: "Headline",
          },
          inputType: "text",
        },
      },
    },
    {
      id: "field-bio",
      type: "input-text",
      name: "aboutU",
      component: {
        name: "aboutU",
        props: {
          label: {
            type: "text",
            content: "About You",
          },
          isMulti: true,
          rows: 3,
          inputType: "text",
        },
      },
    },
    // {
    //   id: "field-addPhotos",
    //   type: "text",
    //   name: "addPhotos",
    //   component: {
    //     name: "Text",
    //     props: {
    //       label: {
    //         type: "text",
    //         content: "REPLACE: Integrate React DND here.",
    //       },
    //     },
    //   },
    // },
  ],
  navigation: [
    {
      component: {
        name: "button",
        props: {
          position: "left",
          label: {
            type: "text",
            content: "Back",
          },
          handler: "handleBack",
          withIcon: {
            icon: "arrow-back",
            where: "left",
          },
        },
      },
    },
    {
      component: {
        name: "button",
        props: {
          label: {
            type: "text",
            content: "Finish",
          },
          handler: "handleSubmit",
        },
        type: "submit",
      },
    },
  ],
};
