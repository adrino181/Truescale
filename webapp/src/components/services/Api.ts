// api.js
import { settlePromise } from "@/utils/settlePromise";
import {
  createAsyncThunk,
  createSlice,
  miniSerializeError,
  type SerializedError,
} from "@reduxjs/toolkit";
import * as Payload from "./type";
import { IComment, IProfileType, PostDataType, UProfileType, ICommentAdd } from "@/components/types";

export const urls = {
  test: `http://localhost:3001`,
  development: "http://192.168.29.66:3001",
  production: "https://truescale.in",
  src: "/api/",
};

const myFetch = {
  create: ({
    baseUrl,
    baseHeader,
    baseSrc,
  }: {
    baseUrl: string;
    baseHeader: object;
    baseSrc?: string;
  }) => {
    return {
      authHeader: false,
      bearerToken: "",
      baseSrc: baseSrc,
      getRelativeUrl: (a: string, b: string) => {
        return `${a.replace(/\/$/, "")}${b.replace(/\/$/, "")}`;
      },
      post: function (url: string, param: object | string, headers?: object) {
        return new Promise<any>((resolve, reject) => {
          const relativeUrl = this.baseSrc
            ? this.getRelativeUrl(this.baseSrc, url)
            : url;
          const requestUrl = new URL(relativeUrl, baseUrl);
          fetch(requestUrl, {
            method: "POST",
            body: JSON.stringify(param),
            headers: {
              ...baseHeader,
              ...headers,
              ...(this.authHeader
                ? { authorization: `Bearer ${this.bearerToken}` }
                : {}),
            },
          })
            .then((res) => resolve(res.json()))
            .catch((err) => reject(err));
        });
      },
      get: function (url: string, headers?: object) {
        return new Promise<any>((resolve, reject) => {
          const relativeUrl = this.baseSrc
            ? this.getRelativeUrl(this.baseSrc, url)
            : url;
          const requestUrl = new URL(relativeUrl, baseUrl);
          fetch(requestUrl, {
            headers: {
              ...baseHeader,
              ...headers,
              ...(this.authHeader
                ? { authorization: `Bearer ${this.bearerToken}` }
                : {}),
            },
          })
            .then((res) => resolve(res.json()))
            .catch((err) => reject(err));
        });
      },
      put: function (url: string, param: object | string, headers?: object) {
        return new Promise<any>((resolve, reject) => {
          const relativeUrl = this.baseSrc
            ? this.getRelativeUrl(this.baseSrc, url)
            : url;
          const requestUrl = new URL(relativeUrl, baseUrl);
          fetch(requestUrl, {
            method: "PUT",
            body:
              headers && headers["Content-Type"] === "multipart/form-data"
                ? param
                : JSON.stringify(param),
            headers: {
              ...(headers && headers["Content-Type"] === "multipart/form-data"
                ? {}
                : {
                  ...baseHeader,
                  ...headers,
                }),
              ...(this.authHeader
                ? { authorization: `Bearer ${this.bearerToken}` }
                : {}),
            },
          })
            .then((res) => resolve(res.json()))
            .catch((err) => reject(err));
        });
      },
      delete: function (url: string, headers?: object) {
        return new Promise<any>((resolve, reject) => {
          const relativeUrl = this.baseSrc
            ? this.getRelativeUrl(this.baseSrc, url)
            : url;
          const requestUrl = new URL(relativeUrl, baseUrl);
          fetch(requestUrl, {
            method: "DELETE",
            headers: {
              ...baseHeader,
              ...headers,
              ...(this.authHeader
                ? { authorization: `Bearer ${this.bearerToken}` }
                : {}),
            },
          })
            .then((res) => resolve(res.json()))
            .catch((err) => reject(err));
        });
      },
      set Authorization(token: string) {
        this.authHeader = true;
        this.bearerToken = token;
      },
    };
  },
};
export const baseUrl: string = urls[process.env.NODE_ENV];
export const api = myFetch.create({
  baseUrl: baseUrl,
  baseHeader: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  baseSrc: "/api",
});

export const checkLoginStatus = async (): Promise<IProfileType> => {
  const login = await JSON.parse(localStorage.getItem("login") || "{}");
  if (login && typeof login === "object" && Object.keys(login).length > 0) {
    api.Authorization = login.token;
  } else {
    throw new Error("User Not logged In");
  }
  const data = await api.get(`/profile`);
  if (data.profile) {
    return {
      ...data.profile,
    };
  }
  return {
    ...data,
  };
};

export const login = async (
  params: Payload.login
): Promise<{ token: string }> => {
  //login user
  const { message, response } = await api.post("/auth/login", params);
  const token = response?.token;
  if (!token) {
    if (message) {
      throw new Error(message);
    } else {
      throw new Error("No Token Recieved");
    }
  }
  return {
    token,
  };
};

export const register = async (
  params: Payload.login
): Promise<{ token: string }> => {
  // register user to the platform
  const { error, message, response } = await api.post("/auth/register", params);
  const token = response?.token;
  if (!token) {
    throw new Error(error);
  }

  return {
    token,
  };
};

export const resetPassword = async () => {
  // sends reset password
};

export const generateResetPasswordLink = async () => {
  //sends reset password link to user email
};

export const confirmUser = async () => {
  //confirm user with the link from email
};

// async (userData) => {
//   try {
//     const { data } = await api.post("/auth/login", userData);
//     return data;
//   } catch (e) {
//     throw new Error(`Failed with ${e.message}`);
//   }
// }
// export const addPost = async (postData) => {
//   try {
//     const { data } = await api.post("/posts", postData);
//     return data;
//   } catch (error) {
//     alert("Something went wrong.");
//   }
// };

export const checkSignInToken = async ({ token }: { token: string }) => {
  const confirmData = await api.post(`/auth/confirm`, {
    token: token,
  });
  return confirmData;
};

export const addComment = async (commentData: ICommentAdd) => {
  try {
    const { data } = await api.post("/comments/" + commentData.id, {
      text: commentData.message
    });
    return data;
  } catch (error) {
    throw new Error("ADD_COMMENT_FAILED")
  }
};

export const likeOrDislikePost = async (id: string) => {
  try {
    const { response, message } = await api.post("/posts/likes", { id });
    if (message !== "SUCCESS") {
      throw new Error("UPDATE_LIKE_FAILED");
    }
    return response;
  } catch (error) {
    throw new Error("UPDATE_LIKE_FAILED");
  }
};

export const deletePost = async (id: string): Promise<string> => {
  try {
    const { response, message } = await api.delete(`/posts/${id}`);
    if (message !== "SUCCESS") {
      throw new Error("DELETE_POST_FAILED");
    }
    return response.post._id;
  } catch (error) {
    throw new Error("DELETE_POST_FAILED");
  }
};

export const addOrRemoveFollower = async (params: { id: string, follow: boolean }): Promise<string> => {
  try {
    const { response, message } = await api.post("/followers", params);
    if (message !== "SUCCESS") {
      throw new Error("ADD_FOLLOWER_FAILED");
    }
    return response;
  } catch (error) {
    throw new Error("ADD_FOLLOWER_FAILED");
  }
};

export const createProfile = async (params: IProfileType): Promise<string> => {
  try {
    const data = await api.post("/auth/createProfile", params);
    if (!data || !data.token) {
      throw new Error("CREATE_PROFILE_LOGIN_FAILED");
    }
    return data.token;
  } catch (error) {
    throw new Error("CREATE_PROFILE_LOGIN_FAILED");
  }
};

export const getAnalytics = async () => {
  try {
    const data = await api.get("/userAnalytics");
    if (data.message !== "SUCCESS") {
      throw new Error("Request Failed");
    }
    return data;
  } catch (error) {
    throw new Error("Request Failed");
  }
};

export const getHomePageTrending = async () => {
  const res = await api.get("/posts/homepageTrending");
  if (!res) {
    console.log("Can't fetch Static HomePage");
  }
  return {
    data: {
      ...res,
    },
  };
};

export const getTrendingPosts = async ({ filters }: { filters?: string }): Promise<PostDataType[]> => {
  try {
    const queryParams =
      `${filters ? "?" + filters : ""}`
    const { message, response } = await api.get(`/posts/trending${queryParams}`);
    return response.posts;
  } catch (e) {
    throw new Error("FETCH_TRENDING_REJECTED");
  }
};

export const getPersonalPosts = async (): Promise<[PostDataType]> => {
  const { response } = await api.get("/posts");
  if (!response) {
    throw new Error("GET_POSTS_FAILED");
  }
  return response.posts;
};

export const editPostData = async (
  postData: PostDataType
): Promise<PostDataType> => {
  try {
    const { _id: id, ...editPostData } = postData;
    const data = await api.put(`/ posts / ${id}`, editPostData);
    return data;
  } catch (error) {
    throw new Error("EDIT_POST_FAILED");
  }
};

export const addPostData = async (
  postData: PostDataType
): Promise<PostDataType> => {
  try {
    const { response } = await api.post("/posts", postData);
    if (!response || !response.post) {
      throw new Error("ADD_POST_FAILED");
    }
    return response.post;
  } catch (error) {
    throw new Error("ADD_POST_FAILED");
  }
};

export const getAsyncToolData = async (
  query: string
): Promise<PostDataType> => {
  try {
    const data = await api.post("/generative", query);
    return data;
  } catch (error) {
    throw new Error("ASYNC_TOOL_REJECTED");
  }
};

export const getPost = async (id: string): Promise<PostDataType> => {
  try {
    const { response } = await api.get("/posts/" + id);
    if (!response || !response.post) {
      throw new Error("GET_POST_ERR");
    }
    return response.data;
  } catch (error) {
    throw new Error("GET_POST_FAILED");
  }
};

export const getPostComment = async (id: string): Promise<IComment> => {
  try {
    const data = await api.get("/comments/" + id);
    if (!data || !data.response) {
      throw new Error("GET_COMMENT_ERR");
    }
    const { comments } = data.response;
    return comments;
  } catch (error) {
    throw new Error("GET_COMMENT_ERR");
  }
};
//updates multimedia
export const updateProfileMedia = async (_id, formData): Promise<IProfileType> => {
  try {
    const data = await api.put("/profile/edit/image/" + _id, formData, {
      "Content-Type": "multipart/form-data",
    });
    if (!data) {
      throw new Error("UPATE_MEDIA_FAILED");
    }
    return data;

  } catch (error) {
    throw new Error("UPATE_MEDIA_FAILED");
  }
};

// updates multipart data
export const updateProfileDetailApi = async (_id, formData): Promise<IProfileType> => {
  try {
    const { data } = await api.put("/profile/edit/data/" + _id, formData);
    if (!data) {
      throw new Error("UPDATE_PROFILE_DETAIL_FAILED");
    }
    return data;
  } catch (error) {
    throw new Error("UPDATE_PROFILE_DETAIL_FAILED");
  }
};

//get user personal profile
export const getProfileDetail = async (): Promise<IProfileType> => {
  try {
    const data = await api.get("/profile/profileDetails");
    if (!data) {
      throw new Error("GET_PROFILE_FAILED");
    }
    return data;
  } catch (error) {
    throw new Error("GET_PROFILE_FAILED");
  }
};


//get user personal profile
export const getExternalProfile = async (): Promise<UProfileType> => {
  try {
    const data = await api.get("/profile/profileDetails");
    if (!data) {
      throw new Error("GET_PROFILE_FAILED");
    }
    return data;
  } catch (error) {
    throw new Error("GET_PROFILE_FAILED");
  }
};
export default api;
