import styled from '@emotion/styled';
import { defaultConfig as theme } from '@/components/themes/';

// From: https://www.w3schools.com/howto/howto_css_switch.asp

export const Switch = styled.label`
	position: relative;
	display: inline-block;
	width: ${theme.utils.rem(70)};
	height: ${theme.utils.rem(38)};

	input:checked + span {
		background-color: ${theme.palette.primary.eucalyptus};
	}

	input:checked + span:before {
		-webkit-transform: translateX(${theme.utils.rem(31)});
		-ms-transform: translateX(${theme.utils.rem(31)});
		transform: translateX(${theme.utils.rem(31)});
	}
`;

export const HiddenCheckbox = styled.input`
	opacity: 0;
	width: 0;
	height: 0;
`;

export const SwitchSlider = styled.span`
	position: absolute;
	cursor: pointer;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #ccc;
	-webkit-transition: 0.4s;
	transition: 0.4s;
	border-radius: ${theme.utils.rem(25)};

	&:before {
		position: absolute;
		content: '';
		border-radius: ${theme.utils.rem(25)};
		height: ${theme.utils.rem(30)};
		width: ${theme.utils.rem(30)};
		left: ${theme.utils.rem(4)};
		bottom: ${theme.utils.rem(4)};
		background-color: white;
		-webkit-transition: 0.04s;
		transition: 0.4s;
	}
`;
