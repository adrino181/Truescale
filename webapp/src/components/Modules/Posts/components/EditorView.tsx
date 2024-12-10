import ShareComponent from "@/components/Blocks/Share";

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

const parseHtml = (params) => {
  const data = params?.blockData || [];
  const metaData = params?.postData;
  let html = "";
  let header = "";
  for (let i in data) {
    const dataType = data[i]?.type || "link";
    const dataContent = data[i].data;
    if (i === "0") {
      //skip header of html
      header = getHeader(dataContent);
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
  return { header, html };
};

const EditorView = ({ props }) => {
  const { header, html: parsedHtml } = parseHtml(props);
  return (
    <article>
      <div
        className="articleHeader"
        dangerouslySetInnerHTML={{ __html: header }}
      ></div>
      {/* <shareIcons></shareIcons> */}
      <ShareComponent />
      <div
        className="article"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    </article>
  );
};

export default EditorView;
