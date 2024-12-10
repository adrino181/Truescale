import styled from '@emotion/styled';

export const Icon = styled.span<{ where?: string }>`
	display: flex;
	${({ theme, where }) => {
		switch (where) {
			case 'right':
				return `margin-right: ${theme.utils.rem(8)};`;
			case 'left':
				return `margin-left: ${theme.utils.rem(8)};`;
			default:
				return ``;
		}
	}}
`;
