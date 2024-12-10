import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button, Grid } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import {
  getPostDetails,
  addPost,
  editResetData,
  editPost,
  asyncToolData,
} from "@/redux/posts";

import api, { baseUrl } from "@/components/services/Api";
import { RootState, AppDispatch } from "@/redux/store";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useRouter } from "next/router";
import { getIdFromUrl } from "@/utils/converter";
//import Twitter from "twitter-embed-editorjs-plugin";
// import TwitterScriptHandler from "./Pulgin/Twitter";
import { useAuth } from "@/components/Blocks/Contexts/AuthContext";
import BackButton from "@/components/atoms/BackButton";
const EDITTOR_HOLDER_ID = "editorjs";

const DEFAULT_INITIAL_ARTICLE_DATA = () => {
  return {
    blocks: [
      {
        type: "header",
        data: {
          level: 2,
        },
      },
      {
        type: "paragraph",
        data: {
          text: "",
        },
      },
    ],
  };
};

const DEFAULT_INITIAL_POST_DATA = () => {
  return {
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "",
        },
      },
    ],
  };
};
class MyBlockTune {
  static get isTune() {
    return true;
  }

  wrap(blockContent) {
    const myWrapper = document.createElement("div");
    myWrapper.append(blockContent);

    myWrapper.style.color = "white";

    return myWrapper;
  }
}

interface ArticleProps {
  isEditable: boolean;
  // need to add typing for editor blocks
  callback: (args: any) => void;
  mode: 'ARTICLE' | 'POST';
}

type EditorPropType = {
  props: ArticleProps
}

const Editor = ({ props }: EditorPropType) => {
  const ejInstance = useRef();
  const dispatch = useAppDispatch();
  const { user, getToken } = useAuth();
  const { isEditable, callback, mode } = props || {};
  const {
    addPostStatus,
    addPostRedirectUrl,
    asyncToolStateStatus,
    asyncToolState,
  } = useAppSelector((state: RootState) => state.post);
  const router = useRouter();
  const [editorData, setEditorData] = useState(mode === 'ARTICLE' ? DEFAULT_INITIAL_ARTICLE_DATA : DEFAULT_INITIAL_POST_DATA);
  const [modalData, setModalData] = useState([]);
  // const [isPrivate, setPrivate] = useState(false);
  const [postType, setPostType] = useState(0);
  const [openModal, setModalState] = useState(false);
  const [showAskAiTool, setModalAskAiTool] = useState(false);
  const [tagsData, setTagsData] = useState([]);
  const [showModalBuyModal, setBuyModal] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { slug } = router.query;
  const postId = getIdFromUrl(slug || "");
  const [popupData, setPopupModalData] = useState(null);
  // This will run only once

  const modalClose = () => {
    setModalState(false), setModalAskAiTool(false), setBuyModal(false);
  };

  const filterTags = (arr) => arr.map((tag) => tag.label);

  const createTags = (arr) =>
    arr.map((tag, index) => ({ code: `tag-${index}`, label: tag }));

  const handleEditorSubmit = () => {
    if (isEditable) {
      dispatch(
        editPost({
          blockData: editorData.blocks,
          type: postType ? postType.value : 0,
          tags: filterTags(tagsData),
          id: postId,
        })
      );
    } else {
      dispatch(
        addPost({
          blockData: editorData.blocks,
          type: postType ? postType.value : 0,
          tags: filterTags(tagsData),
        })
      );
    }
  };

  useEffect(() => {
    if (addPostStatus === "success") {
      modalClose();
      if (props?.postData?.rurl) {
        router.push(props.postData.rurl);
      }
    }
    return () => {
      dispatch(editResetData({ param: "addPostRedirectUrl" }));
      dispatch(editResetData("addPostStatus"));
    };
  }, [addPostStatus]);

  useEffect(() => {
    if (!isEditable && window && !ejInstance.current) {
      //const twitter = TwitterScriptHandler();
      //twitter.initialize().then(() => {
      initEditor();
      // });
    }
    return () => {
      if (ejInstance?.current?.destroy) {
        ejInstance.current.destroy();
        ejInstance.current = null;
        // twitter.cleanup();
      }
    };
  }, []);

  useEffect(() => {
    if (
      asyncToolState &&
      typeof asyncToolState === "object" &&
      Object.keys(asyncToolState).length > 0
    ) {
      setEditorData((prev) => ({
        ...prev,
        blocks: [
          ...prev.blocks.map((item) => {
            if (item.type === "askAiTool") {
              return {
                ...item,
                data: { query: asyncToolState.completion },
              };
            }
            return item;
          }),
        ],
      }));
      ejInstance.current.render(editorData);
    }
  }, [asyncToolState]);

  useEffect(() => {
    if (isEditable) {
      setEditorData({ blocks: props.blockData });
      setTagsData(createTags(props.tags));
      initEditor({ blocks: props.blockData });
      const isEmptyPost = Object.keys(props).length === 0;
      if (!isEmptyPost) {
      }
    }
  }, []);

  const publishArticle = () => {
    ejInstance.current
      .save()
      .then((savedData) => {
        setModalState(true);
        setModalData(savedData);
      })
      .catch((error) => {
        console.log("failed", error);
      });
  };
  const getUserData = () => {
    return user;
  };
  const showModalForBuyNow = () => {
    setBuyModal(true);
  };

  const openAskAiTool = () => {
    setModalAskAiTool(true);
  };


  const initEditor = useCallback((data) => {
    const typographyPlugins = {
      header: {
        class: Header,
        config: {
          placeholder: "Heading",
          levels: [1, 2, 3, 4],
          defaultLevel: 1,
        },
      },
    };
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: data || editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async (api, e) => {
        let content = await ejInstance.current.saver.save();
        setEditorData(content);
        if (callback) {
          callback(content);
        }
      },
      autofocus: false,
      tools: {
        header: {
          class: Header,
          config: {
            placeholder: "Heading",
            levels: [1, 2, 3, 4],
            defaultLevel: 1,
          },
        },
        image: {
          class: ImageTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                const formData = new FormData();
                formData.append("file", file);
                return api
                  .put("/posts/image/post", formData, {
                    "Content-Type": "multipart/form-data",
                  })
                  .then((res) => {
                    return {
                      success: 1,
                      file: {
                        url: res.fileUrl,
                      },
                    };
                  });
              },
            },
            // endpoints: {
            //   byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
            //   byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
            // }
          },
        },
        paragraph: {
          class: Paragraph,
          config: {
            ...(mode === 'ARTICLE' ? (
              {
                placeholder: "Article Heading",
              }
            ) : {})
          },
        },
        //class: Twitter,
        MyBlockTune: MyBlockTune,
      },
      tune: "MyBlockTune",
    });
  }, [mode]);

  const saveArticle = () => {
    console.log("save article");
  };

  const setTags = (e) => {
    setTagsData(e);
  };

  const handleAiToolSubmit = () => {
    dispatch(asyncToolData({ query: popupData }));
  };

  const handleModalStateChange = (data) => {
    setPopupModalData(data);
  };

  return (
    <>
      <div id={EDITTOR_HOLDER_ID}> </div>
    </>
  );
};

export default Editor;

