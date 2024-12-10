import styled from '@emotion/styled';

export const Label = styled.label`
	display: flex;
	align-items: center;
	gap: ${({ theme }) => theme.utils.rem(10)};
	cursor: pointer;
`;

export const Switch = styled.div<{ checked: boolean }>`
	position: relative;
	width: ${({ theme }) => theme.utils.rem(52)};
	height: ${({ theme }) => theme.utils.rem(32)};
	background: ${({ checked, theme }) =>
		checked
			? theme.palette.primary.parakeet
			: theme.palette.neutral.charcoal_70};
	border-radius: ${({ theme }) => theme.utils.rem(32)};
	&:before {
		border: ${({ checked, theme }) =>
			checked
				? `${theme.utils.rem(2)} solid ${theme.palette.primary.parakeet}`
				: `${theme.utils.rem(2)} solid ${theme.palette.neutral.charcoal_70}`};
		transition: 300ms all;
		content: '';
		position: absolute;
		width: ${({ theme }) => theme.utils.rem(28)};
		height: ${({ theme }) => theme.utils.rem(28)};
		border-radius: ${({ theme }) => theme.utils.rem(35)};
		top: 50%;
		left: ${({ checked, theme }) =>
			checked ? theme.utils.rem(-12.8) : theme.utils.rem(0)};
		background: ${({ theme }) => theme.palette.neutral.white};
		transform: ${({ checked, theme }) =>
			checked
				? `translate(${theme.utils.rem(32)}, -50%)`
				: `translate(0, -50%)`};
	}
`;

export const Input = styled.input`
	display: none;
`;
