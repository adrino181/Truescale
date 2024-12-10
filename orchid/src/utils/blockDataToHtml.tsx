const getHeader = (data) => {
  return `<h1>${data.text}</h1>`;
};

const getParagraph = (data) => {
  return `<p>${data.text}</p>`;
};

const getImage = (data) => {
  const fileUrl = data?.file?.url;
  return `<img src=${fileUrl} />`;
};

const generateMeta = (params) => {
  return params?.url;
};

export const parseHtml = (params) => {
  const data = params?.blockData || [];
  const metaData = params?.postData;
  let html = "";
  let header = "";
  let title = "";
  for (let i in data) {
    const dataType = data[i]?.type || "link";
    const dataContent = data[i].data;
    if (i === "0") {
      //skip header of html
      header = getHeader(dataContent);
      title = dataContent.text;
      continue;
    }
    if (dataType === "header") {
      let generated = getHeader(dataContent);
      html = html + generated;
      continue;
    }
    if (dataType === "paragraph") {
      html = html + getParagraph(dataContent);
      continue;
    }
    if (dataType === "image") {
      html = html + getImage(dataContent);
      continue;
    }
  }
  return { title, header, html };
};
