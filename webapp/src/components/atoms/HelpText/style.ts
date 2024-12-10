import styled from '@emotion/styled';
import { Lightbulb } from '@emotion-icons/bootstrap';
import Text from '../Text';

export const HelpTextContainer = styled.div`
	box-sizing: border-box;
	grid-area: helpText;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: ${props => props.theme.utils.rem(8)};
	border: ${props => props.theme.utils.rem(2)} solid
		${props => props.theme.palette.neutral.charcoal_10};
	border-radius: ${props => props.theme.utils.rem(14)};
	width: ${props => props.theme.utils.rem(256)};
	height: auto;
	padding: ${props => props.theme.utils.rem(20)};
	background-color: ${props => props.theme.palette.other.light};

	@media screen and (max-width: 1048px) {
		margin-bottom: ${props => props.theme.utils.rem(32)};
	}

	a {
		color: ${props => props.theme.palette.neutral.charcoal};
		text-decoration: underline;
	}
`;

export const LightbulbIcon = styled(Lightbulb)`
	height: ${props => props.theme.utils.rem(32)};
	width: ${props => props.theme.utils.rem(32)};
	left: ${props => props.theme.utils.rem(20)};
	top: ${props => props.theme.utils.rem(15)};
	color: black;
`;

export const helpText = styled.ul`
	list-style: none;
`;

export const helpTextIcon = styled.span`
	position: absolute;
	display: inline-block;
`;

export const helpTextTitle = styled(Text)`
	display: relative;
`;
