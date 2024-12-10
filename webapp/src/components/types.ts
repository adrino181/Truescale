export type PostDataType = {
  author: {
    backgroundImageUrl: string;
    bio: string;
    firstName: string;
    handle: string;
    headLine: string;
    lastName: string;
    location: string;
    profileImageUrl: string;
    _id: string;
    isListening: boolean;
  };
  postData: {
    image: string;
    rurl: string;
    subheading: string;
    title: string;
    url: string;
  };
  blockData: [any];
  commentsCount: number;
  createdAt: string;
  isLiked: boolean;
  likesCount: number;
  tags: [string];
  view: number;
  _id: string;
};

export type IComment = {
  _id?: string;
  text: string;
  updatedAt: string;
  createdAt: string;
  author: IProfileType;
}

export type SocialIcon = {
  url: string;
};

export type IProfileType = {
  profileImageUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  handle: string;
  isPremium: boolean;
  profileState: string;
  profileType: string;
  headLine: string;
  status: string; //this checks user loggedin state idle | rejected | verify | incomplete | loading
  social: SocialIcon[];
  trackerId: string;
  ws: {
    url: string;
  };
};

export type UProfileType = {
  profileImageUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  handle: string;
  isPremium: boolean;
  profileState: string;
  profileType: string;
  headLine: string;
  status: string; //this checks user loggedin state idle | rejected | verify | incomplete | loading
  social: SocialIcon[];
  groups: [];
  vents: [];
  posts: [];
  followers: {
  };
  following: {
  };
  interest: {
  };
}

export type GroupType = {
  profileImageUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  handle: string;
  isPremium: boolean;
  profileState: string;
  profileType: string;
  headLine: string;
  status: string; //this checks user loggedin state idle | rejected | verify | incomplete | loading
  isLiked: boolean;
};

export type GroupStore = {
  groups: [GroupType];
  groupLoading: boolean;
  createGroupLoading: boolean;
  deleteGroupLoading: boolean;
};

export type eventType = {
  profileImageUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  handle: string;
  isPremium: boolean;
  profileState: string;
  profileType: string;
  headLine: string;
  status: string; //this checks user loggedin state idle | rejected | verify | incomplete | loading
};

export type jobType = {
  profileImageUrl: string;
  bio: string;
  firstName: string;
  lastName: string;
  handle: string;
  isPremium: boolean;
  profileState: string;
  profileType: string;
  headLine: string;
  status: string; //this checks user loggedin state idle | rejected | verify | incomplete | loading
};

export interface UserAnalytics {
  postData: [];
  sessions: [];
  total: [];
  userTag: [];
}

export type ICommentAdd = {
  id: string;
  message: string;
}

