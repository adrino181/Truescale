export const removeHtml = (textData) => {
  return textData
    .replaceAll(/<([\w\-/]+)( +[\w\-]+(=(('[^']*')|("[^"]*")))?)* *>/g, "")
    .replaceAll("&nbsp;", "");
};

export const editorDataToJson = (params) => {
  const postData = {};
  const blockData = params;
  for (const item of blockData) {
    let itemType = item.type;
    if (!postData[itemType]?.length) {
      if (itemType === "image") {
        postData[itemType] = item?.data?.file?.url || null;
      } else {
        postData[itemType] = item?.data?.text || null;
      }
    }
  }
  postData.paragraph = removeHtml(postData.paragraph);

  return {
    image: postData.image,
    subheading: postData.paragraph,
    title: postData.header,
  };
};
