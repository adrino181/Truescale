// import styled from '@emotion/styled';

// export const Input = styled.input<{ width?: number | string }>`
// 	padding: 14px 16px;
// 	border: 1px solid ${props => props.theme.palette.other.inputBorder};
// 	border-radius: ${({ theme }) => theme.utils.rem(4)};

// 	&:focus-visible {
//         outline: none ;
// 		border: 1px solid ${props => props.theme.palette.other.yellow};
// 		border-radius: 2px;
// 		box-shadow: 0 0 0 3px rgba(252, 183, 81, 0.5);
//     };
// `;

import { styled } from "@mui/material/styles";
export const Input = styled("input")(({ theme }) => ({
  //   flex: 1,
  //   textOverflow: "ellipsis",
  //   padding: theme.spacing(3),
  //   fontSize: theme.toRem(16),
  //   outline: 0,
  //   border: 0,

  padding: "14px 16px",
  border: `1px solid ${theme.palette.secondary.main}`,
  width: "100%",
  borderRadius: theme.toRem(10),
  color: theme.palette.text.primary,
  background: theme.palette.inputColor.main,
  "&:focus-visible": {
    outline: "none",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "2px",
    boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
  },
}));
