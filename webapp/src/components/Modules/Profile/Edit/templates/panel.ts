import * as errors from "@/components/Blocks/FormBuilder/data/constants/errors";
export const profilePanel4 = {
  id: "profile-complete",
  label: "Edit Profile",
  hideSaveAndExit: true,
  hideStepLabel: true,
  grid: {
    templateAreas:
      '".instructional." "youtube  instagram twitter" "pinterest tiktok tripAdvisor" "wechat weibo vimeo"  "flickr appleStore googlePlay" "a blog facebook"',
    columns: "auto auto auto",
    gap: "10px",
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
            content: "Add your social handles",
          },
        },
      },
    },
    {
      id: "field-facebook",
      type: "text",
      name: "facebook",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "facebook",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.facebook",
    },
    {
      id: "field-youtube",
      type: "text",
      name: "youtube",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "youtube",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.youtube",
    },
    {
      id: "field-instagram",
      type: "text",
      name: "instagram",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "instagram",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.instagram",
    },
    {
      id: "field-twitter",
      type: "text",
      name: "twitter",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "twitter",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.twitter",
    },
    {
      id: "field-pinterest",
      type: "text",
      name: "pinterest",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "pinterest",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.pinterest",
    },
    {
      id: "field-tiktok",
      type: "text",
      name: "tiktok",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "tiktok",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.tiktok",
    },
    {
      id: "field-tripAdvisor",
      type: "text",
      name: "tripAdvisor",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "tripAdvisor",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.tripAdvisor",
    },
    {
      id: "field-wechat",
      type: "text",
      name: "wechat",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "wechat",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.wechat",
    },
    {
      id: "field-weibo",
      type: "text",
      name: "weibo",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "weibo",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.weibo",
    },
    {
      id: "field-vimeo",
      type: "text",
      name: "vimeo",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "vimeo",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.vimeo",
    },
    {
      id: "field-flickr",
      type: "text",
      name: "flickr",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "flickr",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.flickr",
    },
    {
      id: "field-appleStore",
      type: "text",
      name: "appleStore",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "appleStore",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.appleStore",
    },
    {
      id: "field-googlePlay",
      type: "text",
      name: "googlePlay",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "googlePlay",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.googlePlay",
    },
    {
      id: "field-blog",
      type: "text",
      name: "blog",
      component: {
        name: "handle",
        props: {
          withIcon: {
            icon: "blog",
            where: "left",
          },
          label: {
            type: "text",
            content: "",
          },
          maxLength: 12,
          inputType: "text",
        },
      },
      formikName: "social.blog",
    },
  ],
  navigation: [
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
  ],
};

export const profilePanel3 = {
  id: "profile-panel2",
  hideSaveAndExit: true,
  hideStepLabel: true,
  label: "Welcome",
  grid: {
    templateAreas: '"a industry b"',
    columns: "1fr 1fr 1fr",
  },
  fields: [
    {
      id: "field-type",
      type: "selectorGroup",
      name: "industry",
      component: {
        name: "selectorGroup",
        type: "selectorGroup",
        props: {
          label: {
            type: "text",
            content: "Select your profile type",
          },
          selectors: [
            { label: "Founder", value: "founder" },
            { label: "Co Founder", value: "co-founder" },
            { label: "Organisation", value: "organisation" },
            { label: "Student", value: "student" },
            { label: "Individual", value: "individual" },
            { label: "Teacher", value: "teacher" },
            { label: "Creator", value: "creator" },
            { label: "Others", value: "others" },
          ],
        },
      },
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
  ],
};

export const profilePanel2 = {
  id: "profile-panel3",
  hideSaveAndExit: true,
  hideStepLabel: true,
  label: "Interest",
  grid: {
    templateAreas: '"a instructional instructional b" "a interest interest b"',
    columns: "1fr 1fr 1fr 1fr",
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
            content:
              "Select up to three. You can change this later at any time.",
          },
        },
      },
    },
    {
      id: "field-type",
      type: "selectorGroup",
      name: "interest",
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
          label: {
            type: "text",
            content: "Next",
          },
          handler: "handleNext",
        },
        type: "submit",
      },
    },
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
  ],
};

//form label
// form image selector
// form headline selector
// form bio selector
export const profilePanel1 = {
  id: "profile-panel4",
  label: "About",
  hideSaveAndExit: true,
  hideStepLabel: true,
  grid: {
    templateAreas: '"a headline b" "a bio b"',
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
    // {
    //   id: "field-profileImageUrl",
    //   type: "avatar-upload",
    //   name: "profileImageUrl",
    //   component: {
    //     name: "profileImage",
    //     props: {
    //       label: {
    //         type: "text",
    //         content: "Select up to two. You can change this later at any time.",
    //       },
    //     },
    //   },
    // },
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
      name: "bio",
      component: {
        name: "aboutU",
        props: {
          label: {
            type: "text",
            content: "Bio",
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
