import styled from '@emotion/styled';

export const ToggleSwitchContainer = styled.label`
	position: relative;
	font-size: 14px;
	line-height: 20px;
	color: ${({ theme }) => theme.palette.neutral.charcoal};
`;

export const ToggleSwitchCheckbox = styled.input`
	position: absolute;
	top: 0;
	opacity: 0;

	&:checked + label:after {
		content: attr(data-right);
		left: 85px;
		width: 100px;
	}

	&:checked + label:before {
		content: attr(data-left);
		left: 20px;
	}
`;

export const ToggleSwitchLabels = styled.label`
	display: block;
	position: relative;
	width: 189px;
	height: 40px;
	background: ${({ theme }) => theme.palette.neutral.charcoal_10};
	border-radius: 100px;
	transition: all 0.3s ease;
	cursor: pointer;

	&:before {
		content: attr(data-right);
		position: absolute;
		top: 10px;
		right: 16px;
	}

	&:after {
		content: attr(data-left);
		position: absolute;
		left: 4px;
		top: 4px;
		width: 80px;
		height: 20px;
		background: ${({ theme }) => theme.palette.primary.parakeet};
		border-radius: 100px;
		text-align: center;
		transition: all 0.3s ease;
		padding: 6px 0px;
	}
`;
