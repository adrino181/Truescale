import styled from "@emotion/styled";

export const BackgroundImage = styled.div<{
  width: number;
  height: number;
  x: number;
  y: number;
  editable?: boolean;
  src: string;
}>`
  width: ${({ theme, width }) => theme.toRem(width)};
  height: ${({ theme, height }) => theme.utils.rem(height)};
  background-position-x: ${({ theme, x }) => theme.utils.rem(x)};
  background-position-y: ${({ theme, y }) => theme.utils.rem(y)};
  ${({ src }) => `background: url(${src})`};
`;
