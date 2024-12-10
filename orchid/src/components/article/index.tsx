import { parseHtml } from "@/utils/blockDataToHtml";
import { parseDate } from "@/utils/parseDateTime";
import "./style.css";
export default function ArticleView({ props }) {
  const { title, html: parsedHtml } = parseHtml(props);
  const author = props?.author?.firstName || props?.author?.handle;
  return (
    <article className="py-16 px-6 md:py-40 md:px-80">
      <h1 className="text-3xl my-4 text-center underline">{title}</h1>
      <div className="flex justify-between my-10">
        <time dateTime={props.createdAt} className="text-gray-500">
          Posted: {parseDate(props.createdAt)}
        </time>
        <p className="text-gray-500">
          Author:
          <span className="underline mx-2">{author}</span>
        </p>
      </div>
      {/* <shareIcons></shareIcons> */}
      {/* <ShareComponent /> */}
      <div
        className="article"
        dangerouslySetInnerHTML={{ __html: parsedHtml }}
      />
    </article>
  );
}
