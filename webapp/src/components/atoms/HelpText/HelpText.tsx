import React from "react";
import * as S from "./style";
import Text from "../Text";
// const xss = require("xss");
// const parse = require('html-react-parser');

interface iHelpText {
  title: string;
  content: string[];
}

const HelpText: React.FC<iHelpText> = ({ title, content }) => {
  // const sanitisedHtml = xss(content?.join(''));
  // const parsedHtml = parse(sanitisedHtml);

  return (
    <S.HelpTextContainer>
      <S.LightbulbIcon />
      <Text as="h6">{title}</Text>
      <Text as="ul">{/* {parsedHtml} */}</Text>
    </S.HelpTextContainer>
  );
};
export default HelpText;
